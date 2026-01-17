/**
 * Assignment Routes
 * -----------------
 * Routes for assigning doctors to patient cases
 */

const express = require("express");
const router = express.Router();

const { assignDoctor } = require("../controllers/assignment.controller");

// POST /api/assign/:caseId
router.post("/:caseId", assignDoctor);

module.exports = router;
