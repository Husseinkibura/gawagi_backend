// models/appointmentModel.js
import pool from '../config/db.js';

class Appointment {
  static async create(appointment) {
    const { patientId, doctorName, date, time } = appointment;
    const [result] = await pool.query(
      'INSERT INTO appointments (patientId, doctorName, date, time, status) VALUES (?, ?, ?, ?, ?)',
      [patientId, doctorName, date, time, 'Scheduled'] // Default status is 'Scheduled'
    );
    return result.insertId;
  }


  static async findAll() {
    const [rows] = await pool.query(`
      SELECT a.*, u1.fullname AS patientName
      FROM appointments a
      JOIN users u1 ON a.patientId = u1.id
    `);
    return rows.map((row) => ({
      ...row,
      patientId: Number(row.patientId), // Ensure patientId is a number
    }));
  }

  static async findByPatientId(patientId) {
    const [rows] = await pool.query(
      `SELECT a.* 
       FROM appointments a
       WHERE a.patientId = ?`,
      [patientId]
    );
    return rows.map((row) => ({
      ...row,
      patientId: Number(row.patientId), // Ensure patientId is a number
    }));
  }

  static async findByDoctorName(doctorName) {
    const [rows] = await pool.query(
      `SELECT a.* 
       FROM appointments a
       WHERE a.doctorName = ?`,
      [doctorName]
    );
    return rows.map((row) => ({
      ...row,
      patientId: Number(row.patientId), // Ensure patientId is a number
    }));
  }

  static async updateStatus(id, status) {
    const [result] = await pool.query(
      'UPDATE appointments SET status = ? WHERE id = ?',
      [status, id]
    );
    return result.affectedRows > 0; // Returns true if the update was successful
  }
}

export default Appointment;