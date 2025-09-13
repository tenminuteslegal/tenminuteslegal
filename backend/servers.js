const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

const crypto = require("crypto");
const secretKey = crypto.randomBytes(32).toString("hex"); // Generates a 32-byte (256-bit) key
console.log("Your JWT secret key:", secretKey);

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// In-memory user store (replace with database in production)
const users = new Map();

// Define user roles
const ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

// Sample data store
let dataStore = [
  { id: 1, title: 'Sample Post 1', content: 'This is a sample post' },
  { id: 2, title: 'Sample Post 2', content: 'Another sample post' }
];


// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = users.get(profile.id);
    
    if (!user) {
      // Create new user - first user becomes admin, others are regular users
      const role = users.size === 0 ? ROLES.ADMIN : ROLES.USER;
      
      user = {
        id: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        role: role,
        avatar: profile.photos[0].value
      };
      
      users.set(profile.id, user);
      console.log(`New user created: ${user.email} with role: ${user.role}`);
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Passport serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.get(id);
  done(null, user);
});

// JWT Helper Functions
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    },
    process.env.JWT_SECRET || 'your-jwt-secret',
    { expiresIn: '24h' }
  );
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-jwt-secret');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Role-based middleware
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
};

//
app.post("/auth/test-login", (req, res) => {
  const { email, role = "user" } = req.body;

  // Create a test user
  const testUser = {
    id: `test_${Date.now()}`,
    email: email,
    name: email.split("@")[0],
    role: role,
    avatar: "https://via.placeholder.com/150",
  };

  users.set(testUser.id, testUser);
  const token = generateToken(testUser);

  res.json({
    message: "Test login successful",
    token: token,
    user: testUser,
  });
});

// Auth Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/status', (req, res) => {
  
  res.json({ status: 'unauthenticated' });
});

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    // Generate JWT token
    const token = generateToken(req.user);
    
    // Redirect to frontend with token (adjust URL as needed)
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/auth/success?token=${token}`);
  }
);

app.get('/auth/failure', (req, res) => {
  res.status(401).json({ error: 'Authentication failed' });
});

app.post('/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

// Profile route
app.get('/api/profile', verifyToken, (req, res) => {
  const user = users.get(req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar
  });
});

// Data Routes with Role-Based Access Control

// READ - Both users and admins can read
app.get('/api/data', verifyToken, requireRole([ROLES.USER, ROLES.ADMIN]), (req, res) => {
  res.json({
    data: dataStore,
    user: {
      email: req.user.email,
      role: req.user.role
    }
  });
});

// GET single item - Both users and admins can read
app.get('/api/data/:id', verifyToken, requireRole([ROLES.USER, ROLES.ADMIN]), (req, res) => {
  const id = parseInt(req.params.id);
  const item = dataStore.find(item => item.id === id);
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  res.json(item);
});

// CREATE - Only admins can create
app.post('/api/data', verifyToken, requireRole([ROLES.ADMIN]), (req, res) => {
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  
  const newItem = {
    id: Math.max(...dataStore.map(item => item.id), 0) + 1,
    title,
    content,
    createdBy: req.user.email,
    createdAt: new Date().toISOString()
  };
  
  dataStore.push(newItem);
  
  res.status(201).json({
    message: 'Item created successfully',
    item: newItem
  });
});

// UPDATE - Only admins can update
app.put('/api/data/:id', verifyToken, requireRole([ROLES.ADMIN]), (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  
  const itemIndex = dataStore.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  if (title) dataStore[itemIndex].title = title;
  if (content) dataStore[itemIndex].content = content;
  dataStore[itemIndex].updatedBy = req.user.email;
  dataStore[itemIndex].updatedAt = new Date().toISOString();
  
  res.json({
    message: 'Item updated successfully',
    item: dataStore[itemIndex]
  });
});

// DELETE - Only admins can delete
app.delete('/api/data/:id', verifyToken, requireRole([ROLES.ADMIN]), (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = dataStore.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  const deletedItem = dataStore.splice(itemIndex, 1)[0];
  
  res.json({
    message: 'Item deleted successfully',
    item: deletedItem
  });
});

// Admin-only routes
app.get('/api/admin/users', verifyToken, requireRole([ROLES.ADMIN]), (req, res) => {
  const userList = Array.from(users.values()).map(user => ({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  }));
  
  res.json({ users: userList });
});

// Update user role (admin only)
app.put('/api/admin/users/:id/role', verifyToken, requireRole([ROLES.ADMIN]), (req, res) => {
  const userId = req.params.id;
  const { role } = req.body;
  
  if (!Object.values(ROLES).includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }
  
  const user = users.get(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  user.role = role;
  users.set(userId, user);
  
  res.json({
    message: 'User role updated successfully',
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    users: users.size,
    data: dataStore.length
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Google OAuth callback URL: http://localhost:${PORT}/auth/google/callback`);
  console.log('Make sure to set up your environment variables in .env file');
});

module.exports = app;