import pool from '../config/db.js';

class Prescription {
  // Fetch test types by patient ID
  static async getTestTypesByPatientId(patientId) {
    const [rows] = await pool.query(
      `SELECT name FROM testtype WHERE disease IN (
        SELECT expected_disease FROM tests WHERE patient_id = ?
      )`,
      [patientId]
    );
    return rows.map((row) => row.name).filter((name) => name); // Filter out null/undefined names
  }

  // Fetch test results by patient ID
  static async getTestResultsByPatientId(patientId) {
    const [rows] = await pool.query('SELECT results FROM tests WHERE patient_id = ?', [patientId]);
    return rows.map((row) => row.results).filter((result) => result); // Filter out null/undefined results
  }

  // Insert a new prescription
  static async createPrescription(prescriptionData) {
    const {
      patientId,
      patientName,
      patientAge,
      patientContact,
      diseases,
      results,
      testTypes,
      medicationName,
      dosage, // Include dosage
      quantity,
    } = prescriptionData;
  
    const [result] = await pool.query(
      `INSERT INTO prescriptions (
        patientId, patientName, patientAge, patientContact, diseases, results, testTypes, 
        medicationName, dosage, quantity, payment_status, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Not Paid', 'Pending')`,
      [
        patientId,
        patientName,
        patientAge,
        patientContact,
        JSON.stringify(diseases),
        JSON.stringify(results),
        JSON.stringify(testTypes),
        medicationName,
        dosage, // Include dosage
        quantity,
      ]
    );
    return result.insertId;
  }

  static async createPrescription(prescriptionData) {
    const {
      patientId,
      patientName,
      patientAge,
      patientContact,
      diseases,
      results,
      testTypes,
      medicationName,
      dosage,
      frequency,
      duration, // Include duration
      quantity,
    } = prescriptionData;
  
    const [result] = await pool.query(
      `INSERT INTO prescriptions (
        patientId, patientName, patientAge, patientContact, diseases, results, testTypes, 
        medicationName, dosage, frequency, duration, quantity, payment_status, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Not Paid', 'Pending')`,
      [
        patientId,
        patientName,
        patientAge,
        patientContact,
        JSON.stringify(diseases),
        JSON.stringify(results),
        JSON.stringify(testTypes),
        medicationName,
        dosage,
        frequency,
        duration, // Include duration
        quantity,
      ]
    );
    return result.insertId;
  }
  
  // Fetch all prescriptions
  static async getAllPrescriptions() {
    const [rows] = await pool.query('SELECT * FROM prescriptions');
    return rows.map((row) => ({
      ...row,
      diseases: JSON.parse(row.diseases || '[]'),
      results: JSON.parse(row.results || '[]'),
      testTypes: JSON.parse(row.testTypes || '[]'),
    }));
  }

  // Fetch prescriptions by patient ID
  static async getPrescriptionsByPatientId(patientId) {
    const [rows] = await pool.query('SELECT * FROM prescriptions WHERE patientId = ?', [patientId]);
    return rows.map((row) => ({
      ...row,
      diseases: JSON.parse(row.diseases || '[]'),
      results: JSON.parse(row.results || '[]'),
      testTypes: JSON.parse(row.testTypes || '[]'),
    }));
  }

  // Update payment status
  static async updatePaymentStatus(prescriptionId, paymentStatus) {
    const [result] = await pool.query(
      `UPDATE prescriptions 
       SET payment_status = ?, status = ?
       WHERE prescriptionId = ?`,
      [paymentStatus, paymentStatus === 'Paid' ? 'Completed' : 'Pending', prescriptionId]
    );
    return result.affectedRows > 0;
  }
}

export default Prescription;