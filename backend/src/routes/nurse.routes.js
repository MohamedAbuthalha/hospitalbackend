const express = require("express");
const router = express.Router();

const nurseController = require("../controllers/nurse.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

// Auth
router.use(protect);

// Role
router.use(authorize("nurse"));

// Add vitals
router.post("/cases/:caseId/vitals", nurseController.addVitals);

module.exports = router;
