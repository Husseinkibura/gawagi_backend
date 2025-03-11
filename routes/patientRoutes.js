// routes/patientRoutes.js
import express from 'express';
import {
  getPatientById,
  getPatients,
  createPatient,
  updatePatient,
  loginPatient,
  deletePatient,
  getPatientServices, // Add this import
} from '../controllers/patientController.js';

const router = express.Router();

router.post('/login', loginPatient);

// Get all patients
router.get('/', getPatients);

// Get a specific patient by ID
router.get('/:patientId', getPatientById);

// Create a new patient
router.post('/', createPatient);

// Update an existing patient by ID
router.put('/:patientId', updatePatient);

// Delete a patient by ID
router.delete('/:patientId', deletePatient);

// Get all services for a specific patient
router.get('/:patientId/services', getPatientServices);


export default router;



// import express from 'express';
// import { getPatientById } from '../controllers/patientController.js';

// const router = express.Router();

// router.get('/:id', getPatientById);

// export default router;