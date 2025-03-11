import express from 'express';
import {
  getTestTypesByPatientId,
  getTestResultsByPatientId,
  createPrescription,
  getAllPrescriptions,
  getPrescriptionsByPatientId,
  updatePaymentStatus,
} from '../controllers/PrescriptionController.js';

const router = express.Router();

// Get test types by patient ID
router.get('/test-types/:patientId', getTestTypesByPatientId);

// Get test results by patient ID
router.get('/test-results/:patientId', getTestResultsByPatientId);

// Create a new prescription
router.post('/', createPrescription);

// Get all prescriptions
router.get('/', getAllPrescriptions);

// Get prescriptions by patient ID
router.get('/:patientId', getPrescriptionsByPatientId);

// Update payment status
router.put('/:prescriptionId/payment-status', updatePaymentStatus);

export default router;