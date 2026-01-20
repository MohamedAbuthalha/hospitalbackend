const express = require("express");
const router = express.Router();

const {
  getMyAssignedCases,
  updateCaseStatus,
  getDoctorDashboard,
  completeCase,
} = require("../controllers/doctor.controller");

const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

// Dashboard
router.get(
  "/dashboard",
  protect,
  authorize("doctor"),
  getDoctorDashboard
);

// My cases
router.get(
  "/cases/my",
  protect,
  authorize("doctor"),
  getMyAssignedCases
);

// Update case status
router.patch(
  "/cases/:caseId/status",
  protect,
  authorize("doctor"),
  updateCaseStatus
);

// Complete patient case
router.patch(
  "/cases/:caseId/complete",
  protect,
  authorize("doctor"),
  completeCase
);

module.exports = router;
