const express = require("express");
const router = express.Router();

const {
  getMyAssignedCases,
  updateCaseStatus,
  getDoctorDashboard,
} = require("../controllers/doctor.controller");


const { protect, authorize } = require("../middlewares/auth.middleware");

// Create doctor profile



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

module.exports = router;
