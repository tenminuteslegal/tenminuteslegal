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
// const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
//   "./firebaseServiceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    type: process.env.FIREBASE_TYPE,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  }),
  databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
});
// admin.initializeApp();

// const FRONTEND_URL =  "http://localhost:5173";
const FRONTEND_URL = process.env.VITE_FRONTEND_PRO || "http://localhost:5173";

const app = express();

app.use(
  cors({
    // origin: FRONTEND_URL,
    origin: [
      "https://tenminuteslegal-f.onrender.com",
      "http://localhost:5173",
      "https://www.10minuteslegal.com",
      // "www.10minuteslegal.com",
    ],
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
    console.log("databse");
    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log(decodedToken);
    const uid = decodedToken.uid;
    const email = decodedToken.email; // ✅ get email from decoded token

    // Role assignment
    const adminEmails = [
      "ajioyelade@gmail.com",
      "keahnney01@gmail.com",
      "tenminuteslegal@gmail.com",
    ];
    const role = adminEmails.includes(email) ? "admin" : "user";

    // Get user record from Firebase Auth
    const userRecord = await admin.auth().getUser(uid);
    const user = {
      id: userRecord.uid,
      email: userRecord.email,
      name: userRecord.displayName,
      avatar: userRecord.photoURL,
      role: role,
      lastSignIn: new Date().toISOString(),
    };

    console.log("Authenticated user:", user);

    // Issue app JWT (optional, for your app's session)
    const appToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "5m" }
    );

    // Persist basic user profile in Realtime Database
    try {
      await db.ref(`users/${uid}`).update({
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
        lastSignIn: user.lastSignIn,
      });
    } catch (e) {
      console.error("Failed to persist user profile:", e);
    }

    // Ensure the Firebase Auth custom claims include role
    try {
      const currentClaims = userRecord.customClaims || {};
      if (!currentClaims.role) {
        await admin
          .auth()
          .setCustomUserClaims(uid, { ...currentClaims, role: user.role });
      }
    } catch (e) {
      console.error("Failed to set custom claims:", e);
    }

    return res.json({ token: appToken, user });
  } catch (err) {
    console.error("Firebase Auth token verification failed:", err);
    return res.status(401).json({ error: "Invalid Firebase ID token" });
  }
});

// Optional admin-only endpoint to update a user's role.
app.post(
  "/admin/users/:uid/role",
  verifyAppToken,
  requireRole("admin"),
  async (req, res) => {
    const { uid } = req.params;
    const { role } = req.body;
    if (!role) return res.status(400).json({ error: "Role is required" });

    try {
      // Update Realtime DB
      await db.ref(`users/${uid}`).update({ role });
      // Update Firebase Auth custom claims
      const userRecord = await admin.auth().getUser(uid);
      const claims = userRecord.customClaims || {};
      await admin.auth().setCustomUserClaims(uid, { ...claims, role });
      res.json({ success: true });
    } catch (err) {
      console.error("Failed to update user role:", err);
      res.status(500).json({ error: "Failed to update role" });
    }
  }
);

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
    // console.log(articles);
    res.json({ articles, user: req.user });
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
    const { title, subtitle, content, plan } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "All fields required" });
    }

    const newItem = {
      id: title.toLowerCase().replace(/\s+/g, "-"),
      title,
      subtitle,
      content,
      publicationDate: new Date().toISOString(),
      plan: plan,
    };

    console.log(newItem);

    try {
      await db.ref("articles").push(newItem);

      // Then fetch all articles
      // const snapshot = await db.ref("articles").once("value");
      // const articles = snapshot.val() || [];

      // return res.status(201).json({
      //   success: true,
      //   message: "Article created successfully",
      //   data: {
      //     article: {
      //       ...newItem,
      //     },
      //     articles: articles
      //   },
      // });

      // return res.status(201).json(newItem);
      return res.status(201).json({
        success: true,
        message: "Article created successfully",
        data: {
          ...newItem,
          // Important for future operations
        },
      });
    } catch (err) {
      console.error("Error saving post to Firebase:", err.message, err.stack);
      return res.status(500).json({
        success: false,
        error: "Failed to create article",
        code: err.code || "FIREBASE_ERROR",
        message: err.message,
      });
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
    console.log(post);
    res.json({ post });
  } catch (err) {
    console.error("Error fetching post from Firebase:", err);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

// Add this new route to your Express server
// Don't forget to initialize your Firebase Admin SDK
// const admin = require('firebase-admin');
// admin.initializeApp(); // Or pass your service account credentials

app.get('/auth/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify the token using Firebase Admin
    console.log('token', token);
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log('decodedToken', decodedToken);

    // --- REWRITTEN PART FOR REALTIME DATABASE ---
    const userRef = admin.database().ref(`users/${decodedToken.uid}`);
    const snapshot = await userRef.once('value');

    if (!snapshot.exists()) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = snapshot.val(); // Get the data from the snapshot
    // --- END REWRITTEN PART ---

    res.json({ user: userData }); // Return the user data
  } catch (error) {
    console.error('Error verifying token or fetching user:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});


app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
