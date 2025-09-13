const express = require("express");
const session = require("express-session");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library"); // Add this package
require("dotenv").config();

const app = express();

const crypto = require("crypto");
const secretKey = crypto.randomBytes(32).toString("hex");
console.log("Your JWT secret key:", secretKey);

// Initialize Google OAuth client for token verification
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Middleware
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:5173",
      "http://localhost:3000", // Create React App
      "http://localhost:5173", // Vite
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// In-memory user store (replace with database in production)
const users = new Map();

// Define user roles
const ROLES = {
  USER: "user",
  ADMIN: "admin",
};

// Sample data store
let dataStore = [
  { id: 1, title: "Sample Post 1", content: "This is a sample post" },
  { id: 2, title: "Sample Post 2", content: "Another sample post" },
];

// JWT Helper Functions
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET || "your-jwt-secret",
    { expiresIn: "24h" }
  );
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-jwt-secret"
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Role-based middleware
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }

    next();
  };
};

// UPDATED AUTH ROUTES FOR FRONTEND OAUTH

// Google token verification endpoint (replaces OAuth callback)
app.post("/auth/google/verify", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Google token is required" });
    }

    // Verify the Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
      console.log("Google token verified:", ticket.getPayload());

    const payload = ticket.getPayload();
    const googleId = payload["sub"];
    const email = payload["email"];
    const name = payload["name"];
    const avatar = payload["picture"];

    // Check if user exists or create new user
    let user = users.get(googleId);

    if (!user) {
      // Create new user - first user becomes admin
      const role = users.size === 0 ? ROLES.ADMIN : ROLES.USER;

      user = {
        id: googleId,
        email: email,
        name: name,
        role: role,
        avatar: avatar,
      };

      users.set(googleId, user);
      console.log(`New user created: ${user.email} with role: ${user.role}`);
    } else {
      // Update existing user info in case it changed
      user.email = email;
      user.name = name;
      user.avatar = avatar;
      users.set(googleId, user);
    }

    // Generate JWT token for our app
    const jwtToken = generateToken(user);

    res.json({
      message: "Authentication successful",
      token: jwtToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Google token verification failed:", error);
    res.status(401).json({
      error: "Invalid Google token",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Test login endpoint (for development)
app.post("/auth/test-login", (req, res) => {
  const { email, role = "user" } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // Create a test user
  const testUser = {
    id: `test_${Date.now()}`,
    email: email,
    name: email.split("@")[0],
    role: role,
    avatar: `https://ui-avatars.com/api/?name=${
      email.split("@")[0]
    }&background=3B82F6&color=fff`,
  };

  users.set(testUser.id, testUser);
  const token = generateToken(testUser);

  console.log(
    `Test user created: ${testUser.email} with role: ${testUser.role}`
  );

  res.json({
    message: "Test login successful",
    token: token,
    user: {
      id: testUser.id,
      email: testUser.email,
      name: testUser.name,
      role: testUser.role,
      avatar: testUser.avatar,
    },
  });
});

// Logout endpoint
app.post("/auth/logout", verifyToken, (req, res) => {
  // With JWT, logout is handled on frontend by removing the token
  // But you could maintain a blacklist here if needed
  res.json({ message: "Logged out successfully" });
});

// Profile route
app.get("/api/profile", verifyToken, (req, res) => {
  const user = users.get(req.user.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
  });
});

// Data Routes with Role-Based Access Control (unchanged)
app.get(
  "/api/data",
  verifyToken,
  requireRole([ROLES.USER, ROLES.ADMIN]),
  (req, res) => {
    res.json({
      data: dataStore,
      user: {
        email: req.user.email,
        role: req.user.role,
      },
    });
  }
);

app.get(
  "/api/data/:id",
  verifyToken,
  requireRole([ROLES.USER, ROLES.ADMIN]),
  (req, res) => {
    const id = parseInt(req.params.id);
    const item = dataStore.find((item) => item.id === id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  }
);

app.post("/api/data", verifyToken, requireRole([ROLES.ADMIN]), (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const newItem = {
    id: Math.max(...dataStore.map((item) => item.id), 0) + 1,
    title,
    content,
    createdBy: req.user.email,
    createdAt: new Date().toISOString(),
  };

  dataStore.push(newItem);

  res.status(201).json({
    message: "Item created successfully",
    item: newItem,
  });
});

app.put(
  "/api/data/:id",
  verifyToken,
  requireRole([ROLES.ADMIN]),
  (req, res) => {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;

    const itemIndex = dataStore.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (title) dataStore[itemIndex].title = title;
    if (content) dataStore[itemIndex].content = content;
    dataStore[itemIndex].updatedBy = req.user.email;
    dataStore[itemIndex].updatedAt = new Date().toISOString();

    res.json({
      message: "Item updated successfully",
      item: dataStore[itemIndex],
    });
  }
);

app.delete(
  "/api/data/:id",
  verifyToken,
  requireRole([ROLES.ADMIN]),
  (req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = dataStore.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found" });
    }

    const deletedItem = dataStore.splice(itemIndex, 1)[0];

    res.json({
      message: "Item deleted successfully",
      item: deletedItem,
    });
  }
);

// Admin-only routes
app.get(
  "/api/admin/users",
  verifyToken,
  requireRole([ROLES.ADMIN]),
  (req, res) => {
    const userList = Array.from(users.values()).map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }));

    res.json({ users: userList });
  }
);

// Update user role (admin only)
app.put(
  "/api/admin/users/:id/role",
  verifyToken,
  requireRole([ROLES.ADMIN]),
  (req, res) => {
    const userId = req.params.id;
    const { role } = req.body;

    if (!Object.values(ROLES).includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const user = users.get(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.role = role;
    users.set(userId, user);

    res.json({
      message: "User role updated successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  }
);

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    users: users.size,
    data: dataStore.length,
    googleOAuthConfigured: !!process.env.GOOGLE_CLIENT_ID,
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Frontend Google OAuth endpoints available:");
  console.log(`  POST ${PORT}/auth/google/verify - Verify Google ID token`);
  console.log(`  POST ${PORT}/auth/test-login - Test login (development only)`);
  console.log("Make sure to set up your environment variables in .env file");

  if (!process.env.GOOGLE_CLIENT_ID) {
    console.warn("⚠️  GOOGLE_CLIENT_ID not found in environment variables");
    console.warn(
      "   Google OAuth will not work. Use test login for development."
    );
  }
});

module.exports = app;
