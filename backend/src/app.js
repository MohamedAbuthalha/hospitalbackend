const express = require("express");
const cors = require("cors");

const patientRoutes = require("./routes/patient.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Hospital Management Backend Running ✅");
});

// Routes
app.use("/api/patients", patientRoutes);

module.exports = app;

