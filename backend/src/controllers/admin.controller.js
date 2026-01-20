const User = require("../models/User");
const DoctorProfile = require("../models/DoctorProfile");

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
      maxCases,
    } = req.body;

    // 1️⃣ Validation
    if (
      !name ||
      !email ||
      !password ||
      !specialization ||
      experience === undefined ||
      !department
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // 2️⃣ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // 3️⃣ Create doctor user
    const user = await User.create({
      name,
      email,
      password,
      role: "doctor",
    });

    // 4️⃣ Create doctor profile
    const doctorProfile = await DoctorProfile.create({
      user: user._id,
      specialization,
      experience,
      department,
      maxCases: maxCases || 0,
    });

    // 5️⃣ Link profile
    user.doctorProfile = doctorProfile._id;
    await user.save();

    return res.status(201).json({
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
    return res.status(500).json({
      success: false,
      message: "Failed to create doctor",
    });
  }
};

/**
 * @desc    Create staff (NON-doctor)
 * @route   POST /api/admin/staff
 * @access  Admin only
 */
exports.createStaff = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1️⃣ Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2️⃣ Allowed roles
    const allowedRoles = [
      "nurse",
      "receptionist",
      "lab",
      "ward",
      "pharmacist",
    ];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid staff role",
      });
    }

    // 3️⃣ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // 4️⃣ Create staff
    const staff = await User.create({
      name,
      email,
      password,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "Staff created successfully",
      staff: {
        id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
      },
    });
  } catch (error) {
    console.error("Create staff error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create staff",
    });
  }
};

/**
 * @desc    Get all staff (except admin)
 * @route   GET /api/admin/staff
 * @access  Admin only
 */
exports.getAllStaff = async (req, res) => {
  try {
    const staff = await User.find({
      role: { $ne: "admin" },
    }).select("-password");

    return res.status(200).json({
      success: true,
      count: staff.length,
      staff,
    });
  } catch (error) {
    console.error("Get staff error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch staff",
    });
  }
};
