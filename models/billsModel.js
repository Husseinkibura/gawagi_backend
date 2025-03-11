// models/billsModel.js
import pool from "../config/db.js";

class Bill {
  static async create(patientId, patientName, testTypeId, testPrice, totalAmount, assignedBy) {
    const [result] = await pool.query(
      `INSERT INTO Bills (patientId, patientName, testTypeId, testPrice, totalAmount, assignedBy) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [patientId, patientName, testTypeId, testPrice, totalAmount, assignedBy]
    );
    return result;
  }
}

export default Bill;