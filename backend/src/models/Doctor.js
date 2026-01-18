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
      required: true,
      trim: true,
      lowercase: true, // ✅ CRITICAL FIX (this unblocks auto-assignment)
    },

    experience: {
      type: Number,
      required: true,
      min: 0,
    },

    maxCases: {
      type: Number,
      default: 5,
      min: 1,
    },

    activeCases: {
      type: Number,
      default: 0,
      min: 0,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one user → one doctor profile
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
