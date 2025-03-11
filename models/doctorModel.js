// models/doctorModel.js
import pool from "../config/db.js";

class DoctorModel {
  // Create a bill
  static async createBill(billData) {
    const { patientId, patientName, testTypeId, testTypeName, testTypePrice, totalAmount } = billData;
    const sql = `
      INSERT INTO bills (patient_id, patient_name, test_type_id, test_type_name, test_type_price, total_amount)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [patientId, patientName, testTypeId, testTypeName, testTypePrice, totalAmount]);
    return result.insertId; // Return the ID of the created bill
  }

  // Create a prescription
  static async createPrescription(prescriptionData) {
    const { patientId, patientName, drugId, drugName, quantity, dosage, instructions, drugPrice } = prescriptionData;
    const sql = `
      INSERT INTO prescriptions (patient_id, patient_name, drug_id, drug_name, quantity, dosage, instructions, drug_price)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [patientId, patientName, drugId, drugName, quantity, dosage, instructions, drugPrice]);
    return result.insertId; // Return the ID of the created prescription
  }

  // Create a payment
  static async createPayment(paymentData) {
    const { billId, prescriptionId, patientId, amount } = paymentData;
    const sql = `
      INSERT INTO payments (bill_id, prescription_id, patient_id, amount)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [billId, prescriptionId, patientId, amount]);
    return result.insertId; // Return the ID of the created payment
  }

  // Get all bills
  static async getAllBills() {
    const sql = "SELECT * FROM bills";
    const [rows] = await pool.query(sql);
    return rows;
  }

  // Get all prescriptions
  static async getAllPrescriptions() {
    const sql = "SELECT * FROM prescriptions";
    const [rows] = await pool.query(sql);
    return rows;
  }

  // Get all payments
  static async getAllPayments() {
    const sql = "SELECT * FROM payments";
    const [rows] = await pool.query(sql);
    return rows;
  }

  // Get bill by ID
  static async getBillById(billId) {
    const sql = "SELECT * FROM bills WHERE id = ?";
    const [rows] = await pool.query(sql, [billId]);
    return rows[0];
  }

  // Get prescription by ID
  static async getPrescriptionById(prescriptionId) {
    const sql = "SELECT * FROM prescriptions WHERE id = ?";
    const [rows] = await pool.query(sql, [prescriptionId]);
    return rows[0];
  }

  // Get payment by ID
  static async getPaymentById(paymentId) {
    const sql = "SELECT * FROM payments WHERE id = ?";
    const [rows] = await pool.query(sql, [paymentId]);
    return rows[0];
  }

  // Update payment status
  static async updatePaymentStatus(paymentId, status) {
    const sql = "UPDATE payments SET payment_status = ? WHERE id = ?";
    const [result] = await pool.query(sql, [status, paymentId]);
    return result.affectedRows > 0;
  }
}

export default DoctorModel;