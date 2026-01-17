/**
 * Triage Service
 * ----------------
 * Responsible for determining the severity of a patient case
 * based on reported symptoms.
 */

const CRITICAL_KEYWORDS = [
  "chest pain",
  "difficulty breathing",
  "unconscious",
  "seizure",
  "stroke",
  "severe bleeding",
];

const HIGH_KEYWORDS = [
  "high fever",
  "vomiting",
  "fracture",
  "head injury",
  "persistent pain",
];

const MEDIUM_KEYWORDS = [
  "moderate pain",
  "infection",
  "dizziness",
  "nausea",
];

function containsKeyword(text, keywords) {
  const normalized = text.toLowerCase();
  return keywords.some((word) => normalized.includes(word));
}

function determineSeverity(symptoms) {
  if (!symptoms || symptoms.length < 10) {
    return "low";
  }

  if (containsKeyword(symptoms, CRITICAL_KEYWORDS)) {
    return "critical";
  }

  if (containsKeyword(symptoms, HIGH_KEYWORDS)) {
    return "high";
  }

  if (containsKeyword(symptoms, MEDIUM_KEYWORDS)) {
    return "medium";
  }

  return "low";
}

module.exports = {
  determineSeverity,
};
