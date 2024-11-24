const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
  deleteUser,
  updateUser
} = require("../controllers/userController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", protect, authorizeRoles("admin", "superadmin"), getUsers);
router.delete("/:id", protect, authorizeRoles("superadmin"), deleteUser);
router.put("/:id", protect, authorizeRoles("admin", "superadmin"), updateUser);  // Add the update route

module.exports = router;
