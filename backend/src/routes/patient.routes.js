const express = require("express");
const router = express.Router();

const {
  createPatientCase,
  getAllPatientCases,
  completePatientCase,
} = require("../controllers/patient.controller");

const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

// ===============================
// Patient Case Creation
// Public: patients can create case
// ===============================
router.post("/", createPatientCase);

// ===============================
// View All Cases
// Admin + Doctor only
// ===============================
router.get(
  "/",
  protect,
  authorize("admin", "doctor"),
  getAllPatientCases
);

// ===============================
// Phase 6: Complete Patient Case
// Doctor only
// ===============================
router.patch(
  "/:id/complete",
  protect,
  authorize("doctor"),
  completePatientCase
);

module.exports = router;
