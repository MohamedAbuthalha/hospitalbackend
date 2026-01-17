/**
 * TRIAGE ROUTES
 * -------------
 * Exposes endpoints for symptom-based triage analysis
 */

const express = require("express");
const router = express.Router();

const triageController = require("../controllers/triage.controller");

// POST /api/triage/analyze
router.post("/analyze", triageController.analyzeTriage);

module.exports = router;
