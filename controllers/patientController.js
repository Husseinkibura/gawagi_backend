// controllers/patientController.js
import Patient from '../models/patientModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const loginPatient = async (req, res) => {
  try {
      const { username, password } = req.body;
      const patient = await Patient.getPatientByUsername(username);

      if (!patient) {
          return res.status(404).json({ message: 'Patient not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, patient.password);
      if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: patient.PatientId, role: patient.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token, role: patient.role });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const createPatient = async (req, res) => {
  try {
    const patientData = req.body;

    if (!patientData.fullname || !patientData.username || !patientData.password || !patientData.mobile) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const patientId = await Patient.createPatient(patientData);
    res.status(201).json({ patientId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const patientData = req.body;

    // Validate required fields
    if (!patientData.fullname || !patientData.username || !patientData.mobile) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Hash the password if it's being updated
    if (patientData.password) {
      patientData.password = await bcrypt.hash(patientData.password, 10);
    }

    await Patient.updatePatient(patientId, patientData);
    res.status(200).json({ message: 'Patient updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all patients
export const getPatients = async (req, res) => {
    try {
      const patients = await Patient.getAllPatients(); // Fetch all patients from the database
      res.status(200).json(patients); // Return the list of patients
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get all patients
  // export const getPatients = async (req, res) => {
  //   try {
  //     const patients = await Patient.getAllPatientsByRole("Patient");
  //     res.status(200).json(patients);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // };
  
  // Get a specific patient by ID
  export const getPatientById = async (req, res) => {
    try {
      const patientId = req.params.patientId;
      const patient = await Patient.getPatientById(patientId);
      if (patient) {
        res.status(200).json(patient);
      } else {
        res.status(404).json({ message: 'Patient not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

//     try {
//         const patientId = req.params.patientId;
//         const patientData = req.body;

//         // Validate required fields
//         if (!patientData.fullname || !patientData.username || !patientData.password || !patientData.mobile) {
//             return res.status(400).json({ message: 'Missing required fields' });
//         }

//         await Patient.updatePatient(patientId, patientData);
//         res.status(200).json({ message: 'Patient updated successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

export const deletePatient = async (req, res) => {
    try {
        const patientId = req.params.patientId;
        await Patient.deletePatient(patientId);
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get all services for a specific patient
export const getPatientServices = async (req, res) => {
  try {
    const patientId = req.params.patientId;

    const drugs = await Patient.getPatientDrugs(patientId);
    const diseases = await Patient.getPatientDiseases(patientId);
    const labTests = await Patient.getPatientLabTests(patientId);
    const bills = await Patient.getPatientBills(patientId);

    res.status(200).json({
      drugs,
      diseases,
      labTests,
      bills,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
