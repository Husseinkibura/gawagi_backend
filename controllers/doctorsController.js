// controllers/doctorsController.js
import { createDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor } from '../models/doctorsModel.js';

export const addDoctor = async (req, res) => {
    try {
        const doctorId = await createDoctor(req.body);
        res.status(201).json({ id: doctorId, message: 'Doctor created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDoctors = async (req, res) => {
    try {
        const doctors = await getAllDoctors();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDoctor = async (req, res) => {
    try {
        const doctor = await getDoctorById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateDoctorDetails = async (req, res) => {
    try {
        const updated = await updateDoctor(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json({ message: 'Doctor updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeDoctor = async (req, res) => {
    try {
        const deleted = await deleteDoctor(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};