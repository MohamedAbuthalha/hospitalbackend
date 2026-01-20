const PatientCase = require("../models/PatientCase");
const { analyzeSymptoms } = require("../services/triage.service");
const { autoAssignDoctor } = require("../services/autoAssign.service");
const { assignNextWaitingCase } = require("../services/waitingQueue.service");


/**
 * POST /api/patients
 */
exports.createPatientCase = async (req, res) => {
  try {
    const { name, age, gender, symptoms } = req.body;

    if (!name || !age || !gender || !symptoms) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 1️⃣ Triage
   const { analyzeSymptoms } = require("../services/triage.service");

const triage = analyzeSymptoms(symptoms);

const patientCase = await PatientCase.create({
  name,
  age,
  gender,
  symptoms,
  severity: triage.severity,
  specialization: triage.specialization,
  status: "waiting",
});


    // 3️⃣ Auto assign doctor
    const assignedDoctor = await autoAssignDoctor(patientCase);

    res.status(201).json({
      success: true,
      message: assignedDoctor
        ? "Patient case created and doctor assigned"
        : "Patient case created, waiting for doctor",
      data: patientCase,
    });
  } catch (error) {
    console.error("Create patient case error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


/**
 * GET /api/patients
 */
exports.getAllPatientCases = async (req, res) => {
  try {
    const cases = await PatientCase.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: cases.length,
      data: cases,
    });
  } catch (error) {
    console.error("Fetch patient cases error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const completeCase = require("../services/completeCase.service");

exports.completePatientCase = async (req, res) => {
  try {
    const patientCase = await completeCase({
      caseId: req.params.id,
      doctorUserId: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: "Case completed successfully",
      caseId: patientCase._id,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


    
  
