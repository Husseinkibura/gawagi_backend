// controllers/drugController.js

import Drug from '../models/drugModel.js';
import pool from '../config/db.js'; // Import the pool object

// Add a new drug
export const addDrug = async (req, res) => {
  try {
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
    } = req.body;

    // Validate required fields
    if (!name || !price || !stock_quantity) {
      return res.status(400).json({ message: "Name, price, and stock quantity are required" });
    }

    // Create new drug in the database
    const newDrug = await Drug.createDrug({
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
    });

    res.status(201).json({ message: "Drug added successfully", drug: newDrug });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit an existing drug
export const editDrug = async (req, res) => {
  try {
    const { drugId } = req.params;
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
    } = req.body;

    // Validate drugId
    if (!drugId || isNaN(drugId)) {
      return res.status(400).json({ message: "Invalid drug ID" });
    }

    // Check if the drug exists
    const [existingDrug] = await pool.execute('SELECT * FROM drugs WHERE id = ?', [drugId]);
    if (!existingDrug.length) {
      return res.status(404).json({ message: 'Drug not found' });
    }

    // Update the drug
    const updatedDrug = await Drug.updateDrug(drugId, {
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
    });

    res.status(200).json({ message: 'Drug updated successfully', drug: updatedDrug });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a drug
export const deleteDrug = async (req, res) => {
  try {
    const { drugId } = req.params;
    console.log("Received drugId:", drugId); // Debugging line

    // Validate drugId
    if (!drugId || isNaN(Number(drugId))) {
      return res.status(400).json({ message: "Invalid drug ID" });
    }

    // Call the delete function from your model to remove the drug
    const result = await Drug.deleteDrug(drugId);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Drug deleted successfully' });
    } else {
      res.status(404).json({ message: 'Drug not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all drugs
export const getAllDrugs = async (req, res) => {
  try {
    const drugs = await Drug.getAllDrugs(); // Fetch all drugs from the model
    res.status(200).json(drugs); // Send the drugs as a JSON response
  } catch (error) {
    console.error("Error fetching drugs:", error);
    res.status(500).json({ message: error.message }); // Send error message
  }
};

// Get total stock quantity of drugs
export const getTotalStockQuantity = async (req, res) => {
  try {
    const totalStock = await Drug.getTotalStockQuantity(); // Call the model method
    res.status(200).json({ totalStock });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get drug by name
export const getDrugByName = async (req, res) => {
  try {
    // Include stock_quantity in the SELECT query
    const [rows] = await pool.execute('SELECT id, name, price, stock_quantity FROM drugs WHERE name = ?', [req.params.name]);
    if (rows.length > 0) {
      res.status(200).json(rows[0]); // Return the first matching drug
    } else {
      res.status(404).json({ message: 'Drug not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching drug details', error: error.message });
  }
};

// Update drug quantities
export const updateDrugQuantities = async (req, res) => {
  try {
    const { drugs } = req.body;

    if (!drugs || !Array.isArray(drugs)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    // Update each drug's stock quantity
    for (const drug of drugs) {
      const { id, stock_quantity } = drug;
      await pool.execute('UPDATE drugs SET stock_quantity = ? WHERE id = ?', [stock_quantity, id]);
    }

    res.status(200).json({ message: 'Drug quantities updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get drug by barcode
export const getDrugByBarcode = async (req, res) => {
  try {
    const { barcode } = req.params;

    // Fetch drug details by barcode
    const [rows] = await pool.execute('SELECT * FROM drugs WHERE barcode = ?', [barcode]);

    if (rows.length > 0) {
      res.status(200).json(rows[0]); // Return the first matching drug
    } else {
      res.status(404).json({ message: 'Drug not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching drug details', error: error.message });
  }
};