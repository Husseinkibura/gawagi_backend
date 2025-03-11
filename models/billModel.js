import pool from '../config/db.js';

class Bill {
  // Create a new bill
  static async createBill(billData) {
    const {
      patientId,
      test_type_id,
      drug_id,
      quantity,
      total_amount,
      assigned_by,
      fullname,
      age,
      disease,
      testName,
      testPrice,
      drugName,
      drugPrice,
      totalDrugPrice,
      createdAt,
      dosage,
      frequency,
      duration,
      status = 'Pending',
      payment_status = 'Not Paid',
    } = billData;

    // Validate patientId exists in patients table
    const [patient] = await pool.execute('SELECT * FROM patients WHERE PatientId = ?', [patientId]);
    if (patient.length === 0) {
      throw new Error('Patient not found');
    }

    // Insert bill into the database
    const [result] = await pool.execute(
      `INSERT INTO bills 
       (patientId, test_type_id, drug_id, quantity, total_amount, assigned_by, fullname, age, disease, testName, testPrice, drugName, drugPrice, totalDrugPrice, createdAt, dosage, frequency, duration, status, payment_status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        patientId,
        test_type_id,
        drug_id,
        quantity,
        total_amount,
        assigned_by,
        fullname,
        age,
        disease,
        testName,
        testPrice,
        drugName,
        drugPrice,
        totalDrugPrice,
        createdAt,
        dosage,
        frequency,
        duration,
        status,
        payment_status,
      ]
    );

    return result;
  }

  // Update a bill
  static async updateBill(id, billData) {
    const {
      patientId,
      test_type_id,
      drug_id,
      quantity,
      total_amount,
      assigned_by,
      fullname,
      age,
      disease,
      testName,
      testPrice,
      drugName,
      drugPrice,
      totalDrugPrice,
      createdAt,
      dosage,
      frequency,
      duration,
      status,
      payment_status,
    } = billData;

    // Update bill in the database
    const [result] = await pool.execute(
      `UPDATE bills 
       SET patientId = ?, test_type_id = ?, drug_id = ?, quantity = ?, total_amount = ?, assigned_by = ?, fullname = ?, age = ?, disease = ?, testName = ?, testPrice = ?, drugName = ?, drugPrice = ?, totalDrugPrice = ?, createdAt = ?, dosage = ?, frequency = ?, duration = ?, status = ?, payment_status = ? 
       WHERE id = ?`,
      [
        patientId,
        test_type_id,
        drug_id,
        quantity,
        total_amount,
        assigned_by,
        fullname,
        age,
        disease,
        testName,
        testPrice,
        drugName,
        drugPrice,
        totalDrugPrice,
        createdAt,
        dosage,
        frequency,
        duration,
        status,
        payment_status,
        id,
      ]
    );

    return result;
  }

  // Approve payment for a bill
   static async approveBillPayment(id) {
    try {
      console.log("Approving payment for bill ID:", id);

      const [result] = await pool.execute(
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

  // Get all bills
  static async getBills() {
    const [rows] = await pool.execute(
      `SELECT id, patientId, test_type_id, drug_id, quantity, total_amount, assigned_by, fullname, age, disease, testName, testPrice, drugName, drugPrice, totalDrugPrice, createdAt, dosage, frequency, duration, status, payment_status 
       FROM bills`
    );
    return rows;
  }

  // Get a single bill by ID
  static async getBillById(id) {
    const [rows] = await pool.execute(
      `SELECT id, patientId, test_type_id, drug_id, quantity, total_amount, assigned_by, fullname, age, disease, testName, testPrice, drugName, drugPrice, totalDrugPrice, createdAt, dosage, frequency, duration, status, payment_status 
       FROM bills 
       WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  // Delete a bill
  static async deleteBill(id) {
    const [result] = await pool.execute('DELETE FROM bills WHERE id = ?', [id]);
    return result;
  }

  static async approveBillPayment(id) {
    const [result] = await pool.execute(
      `UPDATE bills 
       SET status = ?, payment_status = ? 
       WHERE id = ?`,
      ["Paid", "Paid", id]
    );
  
    return result;
  }

  // Fetch recent payments
  static async getRecentPayments() {
    const query = `
      SELECT id, total_amount, assigned_by, fullname, createdAt
      FROM bills
      WHERE payment_status = 'Paid'
      ORDER BY createdAt DESC
      LIMIT 10
    `;
    const [rows] = await pool.execute(query);
    return rows;
  }
}

export default Bill;