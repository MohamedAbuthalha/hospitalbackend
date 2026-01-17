const PatientCase = require("../models/PatientCase");
const { analyzeSymptoms } = require("../services/triage.service");


/**
 * Create a new patient case
 * -------------------------
 * POST /api/patients
 */
exports.createPatientCase = async (req, res) => {
  try {

    console.log("REQ BODY:", req.body);

    const { name, age, gender, symptoms } = req.body;

    if (!name || !age || !gender || !symptoms) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Run triage analysis
   const triageResult = analyzeSymptoms(symptoms);


    // Create patient case
   const patientCase = await PatientCase.create({
  name,
  age,
  gender,
  symptoms,
  severity: triageResult.severity,
  specialization: triageResult.specialization,
  status: "waiting",
});


    return res.status(201).json({
      message: "Patient case created successfully",
      data: patientCase,
    });
  } catch (error) {
    console.error("Create patient case error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * Get all patient cases
 * ---------------------
 * GET /api/patients
 */
exports.getAllPatientCases = async (req, res) => {
  try {
    const cases = await PatientCase.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      count: cases.length,
      data: cases,
    });
  } catch (error) {
    console.error("Fetch patient cases error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
