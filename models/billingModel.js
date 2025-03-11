import pool from '../config/db.js';

const billingModel = {
  async createBilling(billingData) {
    const query = `
      INSERT INTO billings 
      (patientId, patientName, patientAge, patientContact, diseases, testTypes, testPrices, medicationName, medicationPrice, quantity, totalTestPrice, totalDrugPrice, totalBillPrice, paymentType, status, approvedBy, date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      billingData.patientId,
      billingData.patientName,
      billingData.patientAge,
      billingData.patientContact,
      JSON.stringify(billingData.diseases),
      JSON.stringify(billingData.testTypes),
      JSON.stringify(billingData.testPrices),
      billingData.medicationName,
      billingData.medicationPrice,
      billingData.quantity,
      billingData.totalTestPrice,
      billingData.totalDrugPrice,
      billingData.totalBillPrice,
      billingData.paymentType,
      billingData.status,
      billingData.approvedBy,
      billingData.date
    ];

    const [result] = await pool.query(query, values);
    return result.insertId;
  },

  async getAllBillings() {
    const [rows] = await pool.query('SELECT * FROM billings');
    return rows;
  },

  async getBillingById(id) {
    const [rows] = await pool.query('SELECT * FROM billings WHERE id = ?', [id]);
    return rows[0];
  }
};

export default billingModel;