const express = require("express");
const router = express.Router();

const {
  assignDoctorToCase,
} = require("../controllers/assignment.controller");

const {
  protect,
  authorize,
} = require("../middlewares/auth.middleware");

// ADMIN assigns doctor to patient case
router.post(
  "/:caseId",
  protect,
  authorize("admin"),
  assignDoctorToCase
);

module.exports = router;
