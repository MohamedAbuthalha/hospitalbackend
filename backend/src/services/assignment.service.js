/**
 * Assignment Service
 * -------------------
 * Responsible for assigning doctors to patient cases
 * using specialization + workload balancing.
 */

const Doctor = require("../models/Doctor");
const PatientCase = require("../models/PatientCase");

/**
 * Assign the best available doctor to a patient case
 * @param {string} caseId - PatientCase ID
 */
async function assignDoctorToCase(caseId) {
  // 1. Fetch patient case
  const patientCase = await PatientCase.findById(caseId);

  if (!patientCase) {
    throw new Error("Patient case not found");
  }

  if (patientCase.status !== "waiting") {
    throw new Error("Patient case is already assigned or completed");
  }

  // 2. Determine required specialization
  // Simple mapping (can evolve later)
  let requiredSpecialization = "general";

  if (patientCase.severity === "critical") {
    requiredSpecialization = "emergency";
  } else if (patientCase.severity === "high") {
    requiredSpecialization = "cardiology";
  }

  // 3. Find best available doctor
  const doctor = await Doctor.findOne({
    specialization: requiredSpecialization,
    available: true,
    $expr: { $lt: ["$activeCases", "$maxCases"] },
  }).sort({ activeCases: 1, experience: -1 });

  if (!doctor) {
    throw new Error("No available doctor found for this case");
  }

  // 4. Assign doctor to patient case
  patientCase.status = "assigned";
  patientCase.assignedDoctor = doctor._id;

  // 5. Update doctor workload
  doctor.activeCases += 1;

  // 6. Save both documents (transaction-safe style)
  await Promise.all([patientCase.save(), doctor.save()]);

  return {
    message: "Doctor assigned successfully",
    doctor: {
      id: doctor._id,
      name: doctor.name,
      specialization: doctor.specialization,
    },
  };
}

module.exports = {
  assignDoctorToCase,
};
