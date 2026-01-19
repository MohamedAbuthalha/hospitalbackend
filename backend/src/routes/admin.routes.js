const express = require("express");
const router = express.Router();

const { createDoctor } = require("../controllers/admin.controller");
const { protect, authorize } = require("../middlewares/auth.middleware");

// Admin → Create Doctor
router.post(
  "/doctors",
  protect,
  authorize("admin"),
  createDoctor
);

module.exports = router;
