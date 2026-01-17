const express = require("express");
const router = express.Router();

const doctorController = require("../controllers/doctor.controller");

// GET all doctors
router.get("/", doctorController.getAllDoctors);

// GET doctors by specialization
router.get("/specialization/:specialization", doctorController.getDoctorsBySpecialization);

// CREATE a new doctor (admin later)
router.post("/", doctorController.createDoctor);

module.exports = router;
