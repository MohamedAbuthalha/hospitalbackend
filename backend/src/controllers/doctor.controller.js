const PatientCase = require("../models/PatientCase");

/**
 * GET /api/doctors/cases/my
 */
exports.getMyAssignedCases = async (req, res) => {
  try {
    if (!req.user.doctorProfile) {
      return res.status(400).json({
        success: false,
        message: "Doctor profile not linked to this account",
      });
    }

    const cases = await PatientCase.find({
      assignedDoctor: req.user.doctorProfile,
    })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: cases.length,
      data: cases,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch assigned cases",
    });
  }
};

/**
 * PATCH /api/doctors/cases/:caseId/status
 */
exports.updateCaseStatus = async (req, res) => {
  try {
    const { caseId } = req.params;
    const { status } = req.body;

    if (!["in-treatment", "completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const patientCase = await PatientCase.findById(caseId);

    if (!patientCase) {
      return res.status(404).json({
        success: false,
        message: "Case not found",
      });
    }

    if (
      patientCase.assignedDoctor.toString() !==
      req.user.doctorProfile.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    patientCase.status = status;
    await patientCase.save();

    res.status(200).json({
      success: true,
      message: "Status updated",
      data: patientCase,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};


/**
 * GET /api/doctors/dashboard
 * Doctor dashboard summary + cases
 */
exports.getDoctorDashboard = async (req, res) => {
  try {
    if (!req.user.doctorProfile) {
      return res.status(400).json({
        success: false,
        message: "Doctor profile not linked",
      });
    }

    const doctorId = req.user.doctorProfile;

    const cases = await PatientCase.find({
      assignedDoctor: doctorId,
    }).sort({
      severity: -1,      // critical first
      createdAt: -1,
    });

    const stats = {
      total: cases.length,
      active: cases.filter(c => c.status !== "completed").length,
      completed: cases.filter(c => c.status === "completed").length,
      critical: cases.filter(c => c.severity === "critical").length,
    };

    res.status(200).json({
      success: true,
      stats,
      cases,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
    });
  }
};

// controllers/doctor.controller.js
const Doctor = require("../models/Doctor");
const User = require("../models/User");

exports.createDoctorProfile = async (req, res) => {
  try {
    const { name, specialization, experience, maxCases } = req.body;

    // 1️⃣ Ensure logged-in user
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2️⃣ Prevent duplicate doctor profile
    if (user.doctorProfile) {
      return res.status(400).json({
        success: false,
        message: "Doctor profile already exists",
      });
    }

    // 3️⃣ Create doctor profile
    const doctor = await Doctor.create({
      name,
      specialization,
      experience,
      maxCases,
      user: user._id,
    });

    // 4️⃣ Link doctor profile to user
    user.doctorProfile = doctor._id;
    await user.save();

    res.status(201).json({
      success: true,
      message: "Doctor profile created successfully",
      data: doctor,
    });
  } catch (error) {
    console.error("❌ Create doctor profile error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create doctor profile",
    });
  }
};


