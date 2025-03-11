// models/patientModel.js
import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

class Patient {
  // Fetch all patients
  static async getAllPatients() {
    const [rows] = await pool.query('SELECT * FROM patients');
    return rows;
  }

  static async getPatientByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM patients WHERE username = ?', [username]);
    return rows[0];
  }

  // Fetch a specific patient by ID
  static async getPatientById(patientId) {
    const [rows] = await pool.query('SELECT * FROM patients WHERE PatientId = ?', [patientId]);
    return rows[0]; // Return the first row (patient) or undefined if not found
  }

  static async createPatient(patientData) {
    const { PatientId, fullname, username, password, mobile, age, profileImage, address, DateOfBirth, role, ConsultationFee } = patientData;
    
    // Check if PatientId already exists
    const [existingPatient] = await pool.query('SELECT * FROM patients WHERE PatientId = ?', [PatientId]);
    if (existingPatient.length > 0) {
      throw new Error('PatientId already exists');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO patients (PatientId, fullname, username, password, mobile, age, profileImage, address, DateOfBirth, role, ConsultationFee) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [PatientId, fullname, username, hashedPassword, mobile, age, profileImage, address, DateOfBirth, role, ConsultationFee]
    );
    return result.insertId;
  }

  static async updatePatient(patientId, patientData) {
    const { fullname, username, password, mobile, age, profileImage, address, DateOfBirth, role, ConsultationFee } = patientData;
    await pool.query(
      'UPDATE patients SET fullname = ?, username = ?, password = ?, mobile = ?, age = ?, profileImage = ?, address = ?, DateOfBirth = ?, role = ?, ConsultationFee = ? WHERE PatientId = ?',
      [fullname, username, password, mobile, age, profileImage, address, DateOfBirth, role, ConsultationFee, patientId]
    );
  }

  static async deletePatient(patientId) {
    await pool.query('DELETE FROM patients WHERE PatientId = ?', [patientId]);
  }
}

export default Patient;