require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

console.log("🚀 Starting server...");

// Connect to DB but don't let it block the server
connectDB()
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("⚠️ MongoDB connection failed (continuing anyway):", err.message));

// Start server
const server = app.listen(PORT, () => {
  console.log("\n" + "=".repeat(50));
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 Test URL: http://localhost:${PORT}/`);
  console.log("=".repeat(50) + "\n");
});

// Handle port already in use
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use!`);
    console.error(`Try: taskkill /F /IM node.exe`);
    process.exit(1);
  } else {
    console.error("❌ Server error:", err);
  }
});