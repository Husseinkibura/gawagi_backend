// controllers/patientRoutes.js

import express from 'express';
import { getTestByPatientId } from '../controllers/testController.js';

const router = express.Router();

// GET test details by patient ID
router.get('/:patientId', getTestByPatientId);

export default router;