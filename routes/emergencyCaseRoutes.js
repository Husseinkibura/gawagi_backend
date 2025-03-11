import express from "express";
import {
  createEmergencyCase,
  getAllEmergencyCases,
  updateCaseStatus,
} from "../controllers/emergencyCaseController.js";

const router = express.Router();

// Create a new emergency case
router.post("/", createEmergencyCase);

// Fetch all emergency cases
router.get("/", getAllEmergencyCases);

// Update the status of an emergency case
router.put("/:caseId/accept", (req, res) => {
  req.body.status = "Accepted";
  updateCaseStatus(req, res);
});

router.put("/:caseId/reject", (req, res) => {
  req.body.status = "Rejected";
  updateCaseStatus(req, res);
});

export default router;