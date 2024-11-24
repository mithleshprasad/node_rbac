const express = require("express");
const {
  getTutorials,
  createTutorial,
  updateTutorial,
  deleteTutorial,
} = require("../controllers/tutorialController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, authorizeRoles("user", "admin", "superadmin"), getTutorials);
router.post("/", protect, authorizeRoles("admin", "superadmin"), createTutorial);
router.put("/:id", protect, authorizeRoles("admin", "superadmin"), updateTutorial);
router.delete("/:id", protect, authorizeRoles("superadmin"), deleteTutorial);

module.exports = router;
