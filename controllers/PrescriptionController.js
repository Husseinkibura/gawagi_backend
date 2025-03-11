import Prescription from '../models/PrescriptionModel.js';

// Fetch test types by patient ID
export const getTestTypesByPatientId = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const testTypes = await Prescription.getTestTypesByPatientId(patientId);
    res.status(200).json(testTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch test results by patient ID
export const getTestResultsByPatientId = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const testResults = await Prescription.getTestResultsByPatientId(patientId);
    res.status(200).json(testResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new prescription
export const createPrescription = async (req, res) => {
  try {
    const prescriptionData = req.body;
    const prescriptionId = await Prescription.createPrescription(prescriptionData);
    res.status(201).json({ prescriptionId, message: 'Prescription created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all prescriptions
export const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.getAllPrescriptions();
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get prescriptions by patient ID
export const getPrescriptionsByPatientId = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const prescriptions = await Prescription.getPrescriptionsByPatientId(patientId);
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { prescriptionId } = req.params;
    const { paymentStatus } = req.body;

    const isUpdated = await Prescription.updatePaymentStatus(prescriptionId, paymentStatus);
    if (isUpdated) {
      res.status(200).json({ message: 'Payment status updated successfully' });
    } else {
      res.status(404).json({ message: 'Prescription not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};