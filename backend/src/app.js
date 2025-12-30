const express = require("express");
const cors = require("cors");

const app = express();

/* =========================
   CORS CONFIG (IMPORTANT)
========================= */
const allowedOrigins = [
  "http://localhost:5173",
  "https://usermgmnt.vercel.app/login", // ⬅️ replace after Vercel deploy
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

/* =========================
   BODY PARSER
========================= */
app.use(express.json());

/* =========================
   DEBUG LOGGER
========================= */
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

/* =========================
   ROOT ROUTE
========================= */
app.get("/", (req, res) => {
  console.log("✅ Root route hit!");
  res.status(200).json({
    message: "API running",
    timestamp: new Date().toISOString(),
  });
});

/* =========================
   HEALTH CHECK (RENDER)
========================= */
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

/* =========================
   ROUTES (SAFE LOAD)
========================= */
let authRoutes, adminRoutes;

try {
  authRoutes = require("./routes/auth.routes");
  console.log("✅ Auth routes loaded");
} catch (err) {
  console.error("❌ Error loading auth routes:", err.message);
}

try {
  adminRoutes = require("./routes/admin.routes");
  console.log("✅ Admin routes loaded");
} catch (err) {
  console.error("❌ Error loading admin routes:", err.message);
}

if (authRoutes) {
  app.use("/api/auth", authRoutes);
}

if (adminRoutes) {
  app.use("/api/admin", adminRoutes);
}

/* =========================
   404 HANDLER
========================= */
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.url,
  });
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({
    message: "Server error",
    error: err.message,
  });
});

module.exports = app;
