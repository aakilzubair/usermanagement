const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware - logs every request
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

// ROOT ROUTE - THIS MUST WORK FIRST
app.get("/", (req, res) => {
  console.log("✅ Root route hit!");
  res.status(200).json({
    message: "API running",
    timestamp: new Date().toISOString()
  });
});

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Import routes - but wrap in try-catch to see errors
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

// Apply routes only if they loaded successfully
if (authRoutes) {
  app.use("/api/auth", authRoutes);
}

if (adminRoutes) {
  app.use("/api/admin", adminRoutes);
}

// 404 handler - must be LAST
app.use((req, res) => {
  res.status(404).json({ 
    message: "Route not found",
    path: req.url 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ 
    message: "Server error", 
    error: err.message 
  });
});

module.exports = app;