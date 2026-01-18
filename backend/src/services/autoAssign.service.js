// services/autoAssign.service.js
const Doctor = require("../models/Doctor");

exports.autoAssignDoctor = async (patientCase) => {
  // 1️⃣ Find doctors with matching specialization
  const doctors = await Doctor.find({
    specialization: patientCase.specialization,
  });

  // 2️⃣ Filter by capacity
  const eligibleDoctors = doctors.filter(
    (doc) => doc.activeCases < doc.maxCases
  );

  if (eligibleDoctors.length === 0) {
    return null;
  }

  // 3️⃣ Sort by least workload, then experience
  eligibleDoctors.sort((a, b) => {
    if (a.activeCases !== b.activeCases) {
      return a.activeCases - b.activeCases;
    }
    return b.experience - a.experience;
  });

  const selectedDoctor = eligibleDoctors[0];

  // 4️⃣ Assign case
  patientCase.assignedDoctor = selectedDoctor._id;
  patientCase.status = "assigned";
  await patientCase.save();

  // 5️⃣ Update doctor workload
  selectedDoctor.activeCases += 1;
  await selectedDoctor.save();

  return selectedDoctor;
};
