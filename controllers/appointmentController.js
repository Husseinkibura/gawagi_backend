// controllers/appointmentController.js

import Appointment from '../models/appointmentModel.js';
import User from '../models/userModel.js';


export const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorName, date, time } = req.body;

    // Validate input
    if (!patientId || !doctorName || !date || !time) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create the appointment
    const appointmentId = await Appointment.create({ patientId, doctorName, date, time });
    res.status(201).json({ id: appointmentId, message: 'Appointment created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get appointments by patient ID
export const getAppointmentsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Validate patientId
    if (!patientId) {
      return res.status(400).json({ error: 'Patient ID is required' });
    }

    const appointments = await Appointment.findByPatientId(patientId);
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get appointments by doctor ID
export const getAppointmentsByDoctorId = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.findByDoctorId(doctorId);
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark an appointment as done
export const markAppointmentDone = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate appointment ID
    if (!id) {
      return res.status(400).json({ error: 'Appointment ID is required' });
    }

    const updated = await Appointment.updateStatus(id, 'Done');
    if (updated) {
      res.status(200).json({ message: 'Appointment marked as done' });
    } else {
      res.status(404).json({ error: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};