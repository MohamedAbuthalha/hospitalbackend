const express = require("express");
const router = express.Router();

const {
  createDoctor,
  createStaff,
  getAllStaff,
} = require("../controllers/admin.controller");

const { protect, authorize } = require("../middlewares/auth.middleware");

router.post("/doctors", protect, authorize("admin"), createDoctor);
router.post("/staff", protect, authorize("admin"), createStaff);
router.get("/staff", protect, authorize("admin"), getAllStaff);

module.exports = router;
