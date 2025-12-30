const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const auth = require("../middlewares/auth.middleware");

/* ---------- Public Routes ---------- */
router.post("/signup", authController.signup);
router.post("/login", authController.login);

/* ---------- Protected Routes ---------- */
router.get("/me", auth, authController.getMe);
router.post("/logout", auth, authController.logout);
router.put("/update-profile", auth, authController.updateProfile);
router.put("/change-password", auth, authController.changePassword);

module.exports = router;
