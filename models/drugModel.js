// models/drugModel.js

import pool from "../config/db.js"; // Assuming you have a DB connection pool

const Drug = {
  // Create new drug
  createDrug: async (data) => {
    const {
      name,
      brand_name,
      category,
      price,
      expiry_date,
      generic_name,
      description,
      dosage_form,
      stock_quantity,
      strength,
      manufacturer,
      side_effects,
    } = data;

    const query = `
      INSERT INTO drugs (name, brand_name, category, price, expiry_date, generic_name, description, dosage_form, stock_quantity, strength, manufacturer, side_effects)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      name || null,
      brand_name || null,
      category || null,
      price || null,
      expiry_date || null,
      generic_name || null,
      description || null,
      dosage_form || null,
      stock_quantity || null,
      strength || null,
      manufacturer || null,
      side_effects || null,
    ];

    try {
      const [result] = await pool.execute(query, values);
      return result;
    } catch (error) {
      throw new Error(`Error creating drug: ${error.message}`);
    }
  },

  // Update drug
  updateDrug: async (drugId, data) => {
    const {
      name,
      brand_name,
      category,
      price,
      expiry_date,
      generic_name,
      description,
      dosage_form,
      stock_quantity,
      strength,
      manufacturer,
      side_effects,
    } = data;

    const query = `
      UPDATE drugs
      SET
        name = ?,
        brand_name = ?,
        category = ?,
        price = ?,
        expiry_date = ?,
        generic_name = ?,
        description = ?,
        dosage_form = ?,
        stock_quantity = ?,
        strength = ?,
        manufacturer = ?,
        side_effects = ?
      WHERE id = ?
    `;

    const values = [
      name || null,
      brand_name || null,
      category || null,
      price || null,
      expiry_date || null,
      generic_name || null,
      description || null,
      dosage_form || null,
      stock_quantity || null,
      strength || null,
      manufacturer || null,
      side_effects || null,
      drugId,
    ];

    try {
      const [result] = await pool.execute(query, values);
      return result;
    } catch (error) {
      throw new Error(`Error updating drug: ${error.message}`);
    }
  },

  // Get all drugs
  getAllDrugs: async () => {
    const query = "SELECT * FROM drugs";
    try {
      const [rows] = await pool.execute(query);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching drugs: ${error.message}`);
    }
  },

  // Get total stock quantity
  getTotalStockQuantity: async () => {
    const query = "SELECT SUM(stock_quantity) AS totalStock FROM drugs";
    try {
      const [rows] = await pool.execute(query);
      return rows[0].totalStock || 0;
    } catch (error) {
      throw new Error(`Error fetching total stock quantity: ${error.message}`);
    }
  },

  // Delete drug
  deleteDrug: async (drugId) => {
    const query = 'DELETE FROM drugs WHERE id = ?';
    try {
      const [result] = await pool.execute(query, [drugId]);
      return result;
    } catch (error) {
      throw new Error(`Error deleting drug: ${error.message}`);
    }
  },
};

export default Drug;