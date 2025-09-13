// backend/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

const FRONTEND_URL = process.env.VITE_FRONTEND || "http://localhost:5173";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // or 3000 if using CRA
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_ORIGIN = FRONTEND_URL || "http://localhost:5173";
const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";
const PORT = process.env.PORT || 5000;

const googleClient = new OAuth2Client(CLIENT_ID);

// Paths to data files
const usersFile = path.join(__dirname, "data", "users.json");
const postsFile = path.join(__dirname, "data", "posts.json");

// Helpers to read/write JSON files
function readJson(file) {
  try {
    const raw = fs.readFileSync(file, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
    return [];
  }
}

function writeJson(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error writing ${file}:`, err);
  }
}

// POST /auth/google/verify
app.post("/auth/google/verify", async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: "No token provided" });

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const googleId = payload.sub;

    // Load users from file
    let users = readJson(usersFile);

    // Find or create user
    let user = users.find((u) => u.id === googleId);
    if (!user) {
      const role = users.length === 0 ? "admin" : "user";
      user = {
        id: googleId,
        email: payload.email,
        name: payload.name,
        avatar: payload.picture,
        role,
      };
      users.push(user);
      writeJson(usersFile, users);
      console.log(`New user saved: ${user.email}`);
    }

    // Issue app JWT
    const appToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.json({ token: appToken, user });
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ error: "Invalid Google ID token" });
  }
});

// Middleware to check app JWT
function verifyAppToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth)
    return res.status(401).json({ error: "Authorization header missing" });

  const parts = auth.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Bad Authorization format" });
  }

  try {
    const decoded = jwt.verify(parts[1], JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid app token" });
  }
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
}

// Routes
app.get("/api/data", (req, res) => {
  const posts = readJson(postsFile);
  res.json({ data: posts, user: req.user });
});
// app.get("/api/data", verifyAppToken, (req, res) => {
//   const posts = readJson(postsFile);
//   res.json({ data: posts, user: req.user });
// });

app.post("/api/data", verifyAppToken, requireRole("admin"), (req, res) => {
  const { title, subtitle, content, plan, publicationDate } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "All fields required" });
  }

  let posts = readJson(postsFile);
  const newItem = {
    id: title.toLowerCase().replace(/\s+/g, "-"),
    title,
    subtitle,
    content,
    publicationDate: publicationDate || new Date().toISOString(),
    plan: plan || "free", // default to "free" if not provided
  };
  console.log(posts)

  posts.articles.push(newItem);
  writeJson(postsFile, posts);

  res.status(201).json({ item: newItem });
});


app.get("/api/data/:id", verifyAppToken, (req, res) => {
  const { id } = req.params;
  const posts = readJson(postsFile);
  // console.log("Fetched posts:", posts, id);

  const post = posts.articles.find((p) => p.id === id);
  // console.log(`Looking for post with id ${id}:`, post);
  if (!post) {
    return res.status(404).json({ error: "Item not found" });
  }

  res.json({ post });
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
