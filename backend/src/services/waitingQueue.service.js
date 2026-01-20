const PatientCase = require("../models/PatientCase");
const DoctorProfile = require("../models/DoctorProfile");


const { calculatePriority } = require("../utils/priority.util");

const assignNextWaitingCase = async (doctorProfile) => {
  if (!doctorProfile) return null;

  // Capacity check
  if (doctorProfile.activeCases >= doctorProfile.maxCases) {
    return null;
  }

  // Fetch waiting cases for specialization
  const waitingCases = await PatientCase.find({
    status: "waiting",
    specialization: doctorProfile.specialization,
  });

  if (!waitingCases.length) {
    return null;
  }

  // Sort using decision-based priority
  waitingCases.sort(
    (a, b) => calculatePriority(b) - calculatePriority(a)
  );

  const selectedCase = waitingCases[0];

  // Assign case
  selectedCase.assignedDoctor = doctorProfile._id;
  selectedCase.status = "assigned";
  await selectedCase.save();

  // Update doctor load
  doctorProfile.activeCases += 1;
  await doctorProfile.save();

  return selectedCase;
};

module.exports = { assignNextWaitingCase };
