const express = require("express");
const router = express.Router();

const {
  createPatientCase,
  getAllPatientCases,
} = require("../controllers/patient.controller");

const {
  protect,
  authorize,
} = require("../middlewares/auth.middleware");

// Public: patients can create case
router.post("/", createPatientCase);

// Admin + Doctor can view all cases
router.get("/", protect, authorize("admin", "doctor"), getAllPatientCases);

module.exports = router;
