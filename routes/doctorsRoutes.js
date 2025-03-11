// routes/doctorRoutes.js
import express from 'express';
import { addDoctor, getDoctors, getDoctor, updateDoctorDetails, removeDoctor } from '../controllers/doctorsController.js';

const router = express.Router();

router.post('/doctors', addDoctor);
router.get('/doctors', getDoctors);
router.get('/doctors/:id', getDoctor);
router.put('/doctors/:id', updateDoctorDetails);
router.delete('/doctors/:id', removeDoctor);

export default router;