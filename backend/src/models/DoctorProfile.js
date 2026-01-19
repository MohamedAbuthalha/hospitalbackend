const mongoose = require("mongoose");

const doctorProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    specialization: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    experience: {
      type: Number,
      min: 0,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    maxCases: {
      type: Number,
      default: 5,
      min: 1,
    },

    activeCases: {
      type: Number,
      default: 0,
    },

    isOnDuty: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("DoctorProfile", doctorProfileSchema);
