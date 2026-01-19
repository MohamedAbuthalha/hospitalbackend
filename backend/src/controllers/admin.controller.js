const User = require("../models/User");
const DoctorProfile = require("../models/DoctorProfile");
const bcrypt = require("bcryptjs");

/**
 * @desc    Admin creates a doctor account
 * @route   POST /api/admin/doctors
 * @access  Admin only
 */
exports.createDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      specialization,
      experience,
      department,
      maxCases
    } = req.body;

    // 1️⃣ Validation
    if (
      !name ||
      !email ||
      !password ||
      !specialization ||
      !experience ||
      !department
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // 2️⃣ Check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // CONTINUE IN NEXT STEP 👇
    // 3️⃣ Create user (doctor)
    const user = await User.create({
      name,
      email,
      password,
      role: "doctor",
    });

    // 4️⃣ Create doctor profile
    const doctorProfile = await DoctorProfile.create({
      user: user._id,
      name,
      specialization,
      experience,
      department,
      maxCases,
    });

    // 5️⃣ Link profile to user
    user.doctorProfile = doctorProfile._id;
    await user.save();

    res.status(201).json({
      success: true,
      message: "Doctor account created successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        doctorProfile,
      },
    });

  } catch (error) {
    console.error("Create doctor error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create doctor",
    });
  }
};
