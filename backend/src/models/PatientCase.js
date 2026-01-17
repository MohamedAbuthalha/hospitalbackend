const mongoose = require("mongoose");

const patientCaseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    symptoms: { type: String, required: true },
    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["waiting", "assigned", "in-treatment", "completed"],
      default: "waiting",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PatientCase", patientCaseSchema);
