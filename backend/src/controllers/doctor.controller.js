const PatientCase = require("../models/PatientCase");
const Doctor = require("../models/Doctor");
const User = require("../models/User");

/**
 * GET /api/doctors/cases/my
 */
exports.getMyAssignedCases = async (req, res) => {
  try {
    // Role safety
    if (req.user.role !== "doctor") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    if (!req.user.doctorProfile) {
      return res.status(400).json({
        success: false,
        message: "Doctor profile not linked",
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

    // Prevent duplicate updates
    if (patientCase.status === status) {
      return res.status(400).json({
        success: false,
        message: "Status already updated",
      });
    }

    patientCase.status = status;
    await patientCase.save();

    // 🔥 Reduce doctor workload when completed
    if (status === "completed") {
      await Doctor.findByIdAndUpdate(
        req.user.doctorProfile,
        { $inc: { activeCases: -1 } }
      );
    }

    res.status(200).json({
      success: true,
      message: "Case status updated successfully",
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
 */
exports.getDoctorDashboard = async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    if (!req.user.doctorProfile) {
      return res.status(400).json({
        success: false,
        message: "Doctor profile not linked",
      });
    }

    const cases = await PatientCase.find({
      assignedDoctor: req.user.doctorProfile,
    }).sort({
      severity: -1,
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
   

