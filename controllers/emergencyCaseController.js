import EmergencyCase from "../models/EmergencyCaseModel.js";

// Create a new emergency case
export const createEmergencyCase = async (req, res) => {
  const { patientId, caseDescription, urgencyLevel } = req.body;
  try {
    const caseId = await EmergencyCase.create(
      patientId,
      caseDescription,
      urgencyLevel
    );
    res.status(201).json({ caseId, message: "Emergency case created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create emergency case", error });
  }
};

// Fetch all emergency cases
export const getAllEmergencyCases = async (req, res) => {
  try {
    const cases = await EmergencyCase.findAll();
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch emergency cases", error });
  }
};

// Update the status of an emergency case
export const updateCaseStatus = async (req, res) => {
  const { caseId } = req.params;
  const { status } = req.body;
  try {
    const success = await EmergencyCase.updateStatus(caseId, status);
    if (success) {
      res.status(200).json({ message: "Case status updated successfully" });
    } else {
      res.status(404).json({ message: "Case not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update case status", error });
  }
};