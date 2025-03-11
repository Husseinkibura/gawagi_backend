// routes/pharmacist.js
import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Pharmacist retrieves prescriptions
router.get("/prescriptions", async (req, res) => {
  try {
    const [prescriptions] = await pool.query(`
      SELECT 
        Prescriptions.*, 
        drugs.name AS drugName, 
        users.fullname AS assignedByName 
      FROM Prescriptions
      INNER JOIN drugs ON Prescriptions.drugId = drugs.id
      INNER JOIN users ON Prescriptions.assignedBy = users.id
    `);
    res.status(200).json(prescriptions);
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    res.status(500).json({ message: "Error fetching prescriptions", error });
  }
});

export default router;