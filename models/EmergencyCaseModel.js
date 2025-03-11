import pool from "../config/db.js";

class EmergencyCase {
  // Create a new emergency case
  static async create(patientId, caseDescription, urgencyLevel) {
    const [result] = await pool.query(
      "INSERT INTO emergency_cases (PatientId, CaseDescription, UrgencyLevel) VALUES (?, ?, ?)",
      [patientId, caseDescription, urgencyLevel]
    );
    return result.insertId;
  }

  // Fetch all emergency cases
  static async findAll() {
    const [rows] = await pool.query(`
      SELECT ec.*, p.fullname AS patientName, p.age, p.mobile
      FROM emergency_cases ec
      JOIN patients p ON ec.PatientId = p.PatientId
    `);
    return rows;
  }

  // Update the status of an emergency case
  static async updateStatus(caseId, status) {
    const [result] = await pool.query(
      "UPDATE emergency_cases SET Status = ? WHERE CaseId = ?",
      [status, caseId]
    );
    return result.affectedRows > 0;
  }
}

export default EmergencyCase;