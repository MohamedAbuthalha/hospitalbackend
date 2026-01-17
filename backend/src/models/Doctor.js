const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    specialization: {
      type: String,
      enum: [
        "general",
        "cardiology",
        "neurology",
        "orthopedics",
        "pediatrics",
        "emergency",
      ],
      required: true,
    },

    experience: {
      type: Number, // years
      default: 0,
      min: 0,
    },

    available: {
      type: Boolean,
      default: true,
    },

    activeCases: {
      type: Number,
      default: 0,
      min: 0,
    },

    maxCases: {
      type: Number,
      default: 5, // configurable per doctor
      min: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
