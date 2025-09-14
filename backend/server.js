// backend/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

// Firebase Admin SDK
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");

// Initialize Firebase Admin
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
  "./firebaseServiceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
});
// admin.initializeApp();

const FRONTEND_URL = process.env.VITE_FRONTEND || "http://localhost:5173";

const app = express();

app.use(
  cors({
    origin: ["https://one0minuteslegal-1.onrender.com", FRONTEND_URL],
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

// const googleClient = new OAuth2Client(CLIENT_ID);

// Firebase Realtime Database helpers
const db = admin.database();

// POST /auth/google/verify (Firebase Auth)
app.post("/auth/google/verify", async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: "No token provided" });

  try {
    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    // Get user record from Firebase Auth
    const userRecord = await admin.auth().getUser(uid);
    const user = {
      id: userRecord.uid,
      email: userRecord.email,
      name: userRecord.displayName,
      avatar: userRecord.photoURL,
      role:
        userRecord.customClaims && userRecord.customClaims.role
          ? userRecord.customClaims.role
          : "user",
    };

    // Issue app JWT (optional, for your app's session)
    const appToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.json({ token: appToken, user });
  } catch (err) {
    console.error("Firebase Auth token verification failed:", err);
    return res.status(401).json({ error: "Invalid Firebase ID token" });
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

// GET all posts from Firebase Realtime Database
app.get("/api/data", async (req, res) => {
  try {
    const snapshot = await db.ref("articles").once("value");
    const articles = snapshot.val() || [];
    res.json({ data: { articles }, user: req.user });
  } catch (err) {
    console.error("Error fetching posts from Firebase:", err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// POST new post to Firebase Realtime Database
app.post(
  "/api/data",
  verifyAppToken,
  requireRole("admin"),
  async (req, res) => {
    const { title, subtitle, content, plan, publicationDate } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "All fields required" });
    }

    const newItem = {
      id: title.toLowerCase().replace(/\s+/g, "-"),
      title,
      subtitle,
      content,
      publicationDate: publicationDate || new Date().toISOString(),
      plan: plan || "free",
    };

    try {
      await db.ref("articles").push(newItem);
      res.status(201).json({ item: newItem });
    } catch (err) {
      console.error("Error saving post to Firebase:", err);
      res.status(500).json({ error: "Failed to save post" });
    }
  }
);

// GET single post by id from Firebase Realtime Database
app.get("/api/data/:id", verifyAppToken, async (req, res) => {
  const { id } = req.params;
  try {
    const snapshot = await db
      .ref("articles")
      .orderByChild("id")
      .equalTo(id)
      .once("value");
    const articles = snapshot.val();
    if (!articles) {
      return res.status(404).json({ error: "Item not found" });
    }
    // articles is an object with keys as Firebase push IDs
    const post = Object.values(articles)[0];
    res.json({ post });
  } catch (err) {
    console.error("Error fetching post from Firebase:", err);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
