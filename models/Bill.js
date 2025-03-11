import pool from "../config/db.js";

class Bill {
  // Get all bills
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM bills");
    return rows;
  }

  // Create a new bill
  static async create(bill) {
    const { drugs, ...billData } = bill;

    // Ensure all decimal fields are properly formatted as Tanzanian Shillings (Tsh)
    const formattedBillData = {
      ...billData,
      drugPrice: parseFloat(billData.drugPrice || 0).toFixed(2),
      testPrice: parseFloat(billData.testPrice || 0).toFixed(2),
      totalTestPrice: parseFloat(billData.totalTestPrice || 0).toFixed(2),
      totalDrugPrice: parseFloat(billData.totalDrugPrice || 0).toFixed(2),
    };

    const [result] = await pool.query(
      `INSERT INTO bills (
        patientId, fullname, age, diseases, testType, testPrice, totalTestPrice,
        drugName, drugPrice, stockQuantity, quantity, totalDrugPrice, paymentType,
        assignedBy, status, dateCreated
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        formattedBillData.patientId,
        formattedBillData.fullname,
        formattedBillData.age,
        formattedBillData.diseases,
        formattedBillData.testType,
        formattedBillData.testPrice,
        formattedBillData.totalTestPrice,
        formattedBillData.drugName,
        formattedBillData.drugPrice,
        formattedBillData.stockQuantity,
        formattedBillData.quantity,
        formattedBillData.totalDrugPrice,
        formattedBillData.paymentType,
        formattedBillData.assignedBy,
        formattedBillData.status,
        formattedBillData.dateCreated,
      ]
    );
    return result.insertId;
  }

  // Get a bill by ID
  static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM bills WHERE id = ?", [id]);
    return rows[0];
  }

  // Update a bill
  static async update(id, bill) {
    await pool.query(
      `UPDATE bills SET
        patientId = ?, fullname = ?, age = ?, diseases = ?, testType = ?, testPrice = ?,
        totalTestPrice = ?, drugName = ?, drugPrice = ?, stockQuantity = ?, quantity = ?,
        totalDrugPrice = ?, paymentType = ?, assignedBy = ?, status = ?, dateCreated = ?
      WHERE id = ?`,
      [
        bill.patientId,
        bill.fullname,
        bill.age,
        bill.diseases,
        bill.testType,
        bill.testPrice,
        bill.totalTestPrice,
        bill.drugName,
        bill.drugPrice,
        bill.stockQuantity,
        bill.quantity,
        bill.totalDrugPrice,
        bill.paymentType,
        bill.assignedBy,
        bill.status,
        bill.dateCreated,
        id,
      ]
    );
  }

  // Delete a bill
  static async delete(id) {
    await pool.query("DELETE FROM bills WHERE id = ?", [id]);
  }

  // Approve payment for a bill
  static async approveBillPayment(id) {
    try {
      console.log("Approving payment for bill ID:", id);

      const [result] = await pool.query(
        `UPDATE bills 
         SET status = ?, payment_status = ? 
         WHERE id = ?`,
        ["Paid", "Paid", id]
      );

      console.log("Update result:", result);

      if (result.affectedRows === 0) {
        throw new Error("Bill not found or no changes made.");
      }

      return result;
    } catch (error) {
      console.error("Error in approveBillPayment:", error);
      throw error;
    }
  }

  // Get recent payments
  static async getRecentPayments() {
    try {
      const [rows] = await pool.query(
        `SELECT id, total_amount, assigned_by, fullname, createdAt 
         FROM bills 
         WHERE payment_status = 'Paid' 
         ORDER BY createdAt DESC 
         LIMIT 10`
      );
      return rows;
    } catch (error) {
      console.error("Error in getRecentPayments:", error);
      throw error;
    }
  }
}

export default Bill;