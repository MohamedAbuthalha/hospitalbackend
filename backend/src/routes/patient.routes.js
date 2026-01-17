const express = require("express");
const router = express.Router();

const {
  createPatientCase,
  getAllPatientCases,
} = require("../controllers/patient.controller");

// Create new patient case
router.post("/", createPatientCase);

// Get all patient cases
router.get("/", getAllPatientCases);

module.exports = router;
