const express = require("express");
const router = express.Router();

const { assignDoctor } = require("../controllers/assignment.controller");
const { protect, authorize } = require("../middlewares/auth.middleware");


router.post(
  "/:patientCaseId",
  protect,
  authorize("admin"),
  assignDoctor
);

module.exports = router;
