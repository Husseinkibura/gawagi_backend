import pool from "../config/db.js";

class PrescriptionModel {
  static async getAllPrescriptions() {
    const [rows] = await pool.query("SELECT * FROM bill_payment");
    return rows;
  }

  static async getPrescriptionById(id) {
    const [rows] = await pool.query("SELECT * FROM bill_payment WHERE id = ?", [id]);
    return rows[0];
  }

  static async createPrescription(prescription) {
    const {
      patientId,
      patientName,
      patientAge,
      patientContact,
      diseases,
      testTypes,
      testPrices,
      medicationName,
      medicationPrice,
      quantity,
      totalTestPrice,
      totalDrugPrice,
      totalBillPrice,
      paymentType,
      status,
      approvedBy,
    } = prescription;

    const [result] = await pool.query(
      `INSERT INTO bill_payment (
        patientId, patientName, patientAge, patientContact, diseases, testTypes, testPrices,
        medicationName, medicationPrice, quantity, totalTestPrice, totalDrugPrice, totalBillPrice,
        paymentType, status, approvedBy
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        patientId,
        patientName,
        patientAge,
        patientContact,
        JSON.stringify(diseases),
        JSON.stringify(testTypes),
        JSON.stringify(testPrices),
        medicationName,
        medicationPrice,
        quantity,
        totalTestPrice,
        totalDrugPrice,
        totalBillPrice,
        paymentType,
        status,
        approvedBy,
      ]
    );
    return result.insertId;
  }

  static async updatePrescription(id, prescription) {
    const {
      patientId,
      patientName,
      patientAge,
      patientContact,
      diseases,
      testTypes,
      testPrices,
      medicationName,
      medicationPrice,
      quantity,
      totalTestPrice,
      totalDrugPrice,
      totalBillPrice,
      paymentType,
      status,
      approvedBy,
    } = prescription;

    const [result] = await pool.query(
      `UPDATE bill_payment SET
        patientId = ?, patientName = ?, patientAge = ?, patientContact = ?, diseases = ?, testTypes = ?, testPrices = ?,
        medicationName = ?, medicationPrice = ?, quantity = ?, totalTestPrice = ?, totalDrugPrice = ?, totalBillPrice = ?,
        paymentType = ?, status = ?, approvedBy = ?
      WHERE id = ?`,
      [
        patientId,
        patientName,
        patientAge,
        patientContact,
        JSON.stringify(diseases),
        JSON.stringify(testTypes),
        JSON.stringify(testPrices),
        medicationName,
        medicationPrice,
        quantity,
        totalTestPrice,
        totalDrugPrice,
        totalBillPrice,
        paymentType,
        status,
        approvedBy,
        id,
      ]
    );
    return result.affectedRows;
  }

  static async deletePrescription(id) {
    const [result] = await pool.query("DELETE FROM bill_payment WHERE id = ?", [id]);
    return result.affectedRows;
  }
}

export default PrescriptionModel;