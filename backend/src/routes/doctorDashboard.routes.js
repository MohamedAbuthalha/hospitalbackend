const express = require("express");
const router = express.Router();

const {
  getMyAssignedCases,
  updateCaseStatus,
} = require("../controllers/doctor.controller");

const {
  protect,
  authorize,
} = require("../middlewares/auth.middleware");

router.get(
  "/dashboard",
  protect,
  authorize("doctor"),
  getMyAssignedCases
);

router.patch(
  "/case/:caseId/status",
  protect,
  authorize("doctor"),
  updateCaseStatus
);

module.exports = router;
