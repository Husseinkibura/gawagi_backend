import express from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointmentsByPatientId,
  getAppointmentsByDoctorId,
  markAppointmentDone,
} from '../controllers/appointmentController.js';

const routes = express.Router();

// Define routes
routes.post('/appointments', createAppointment);
routes.get('/appointments', getAppointments);
routes.get('/appointments/patient/:patientId', getAppointmentsByPatientId);
routes.get('/appointments/doctor/:doctorId', getAppointmentsByDoctorId);
routes.put('/appointments/:id/done', markAppointmentDone);

export default routes;