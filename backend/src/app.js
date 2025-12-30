const express = require("express");
const cors = require("cors");

const app = express();

/* =========================
   CORS CONFIG (FIXED)
========================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://usermgmnt-git-main-iamikrama-projects.vercel.app",
    ],
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
   HEALTH CHECK
========================= */
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

/* =========================
   ROUTES
========================= */
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

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
   ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({
    message: "Server error",
    error: err.message,
  });
});

module.exports = app;
