const { assignDoctorToCase } = require("../services/assignment.service");

/**
 * Assign a doctor to a patient case
 * POST /api/assign/:caseId
 */
async function assignDoctorToCaseController(req, res) {
  try {
    const { caseId } = req.params;

    if (!caseId) {
      return res.status(400).json({
        success: false,
        message: "Patient case ID is required",
      });
    }

    const result = await assignDoctorToCase(caseId);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.doctor,
    });
  } catch (error) {
    console.error("Doctor assignment error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to assign doctor",
    });
  }
}

module.exports = {
  assignDoctorToCase: assignDoctorToCaseController,
};
