const User = require("../models/User");

/**
 * GET ALL USERS (ADMIN)
 * Pagination: 10 users per page
 */
exports.getUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    // Fetch users (paginated)
    const users = await User.find()
      .select("-password")
      .skip(skip)
      .limit(limit)
      .lean();

    // Total users in DB
    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    // Add serial number (global)
    const usersWithSerial = users.map((user, index) => ({
      serialNo: skip + index + 1,
      ...user,
    }));

    res.status(200).json({
      users: usersWithSerial,
      pagination: {
        totalUsers,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

/**
 * ADMIN DASHBOARD STATS
 * Total / Active / Inactive users
 */
exports.getUserStats = async (req, res) => {
  try {
    const total = await User.countDocuments();
    const active = await User.countDocuments({ status: "active" });
    const inactive = await User.countDocuments({ status: "inactive" });

    res.status(200).json({
      total,
      active,
      inactive,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user stats",
      error: error.message,
    });
  }
};

/**
 * ACTIVATE USER
 */
exports.activateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { status: "active" });

    res.status(200).json({
      message: "User activated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to activate user",
      error: error.message,
    });
  }
};

/**
 * DEACTIVATE USER
 */
exports.deactivateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { status: "inactive" });

    res.status(200).json({
      message: "User deactivated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to deactivate user",
      error: error.message,
    });
  }
};
