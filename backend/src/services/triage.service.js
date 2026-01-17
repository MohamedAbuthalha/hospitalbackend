/**
 * TRIAGE SERVICE
 * ----------------
 * Determines severity, urgency, and doctor specialization
 * based on patient symptoms.
 *
 * Rule-based & explainable
 * AI-ready for future upgrade
 */

const KEYWORDS = {
  critical: [
    "chest pain",
    "difficulty breathing",
    "unconscious",
    "seizure",
    "stroke",
    "severe bleeding",
  ],
  high: [
    "high fever",
    "vomiting",
    "fracture",
    "head injury",
    "persistent pain",
  ],
  medium: [
    "moderate pain",
    "infection",
    "dizziness",
    "nausea",
  ],
};

const SPECIALIZATION_MAP = {
  "chest pain": "cardiology",
  "stroke": "neurology",
  "seizure": "neurology",
  "difficulty breathing": "pulmonology",
  "fracture": "orthopedics",
  "head injury": "neurology",
};

function analyzeSymptoms(symptoms = "") {
  const text = symptoms.toLowerCase();
  let severity = "low";
  let score = 0;
  let specialization = "general";

  for (const level of ["critical", "high", "medium"]) {
    for (const keyword of KEYWORDS[level]) {
      if (text.includes(keyword)) {
        severity = level;

        if (level === "critical") score = 40;
        if (level === "high") score = 25;
        if (level === "medium") score = 15;

        specialization = SPECIALIZATION_MAP[keyword] || specialization;
        break;
      }
    }
    if (severity !== "low") break;
  }

  return {
    severity,
    score,
    emergency: severity === "critical",
    specialization,
  };
}

module.exports = {
  analyzeSymptoms,
};
