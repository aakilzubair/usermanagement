const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const adminController = require("../controllers/admin.controller");

/* ---------- Protect All Admin Routes ---------- */
router.use(auth);
router.use(authorize("admin"));

/* ---------- Admin Routes ---------- */

// Get all users (paginated)
router.get("/users", adminController.getUsers);

// Activate user
router.patch("/users/:id/activate", adminController.activateUser);

// Deactivate user
router.patch("/users/:id/deactivate", adminController.deactivateUser);

// Admin dashboard stats (total / active / inactive)
router.get("/stats", adminController.getUserStats);

module.exports = router;
