// routes/doctor.js
import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Doctor submits data
router.post("/submit", async (req, res) => {
  const {
    patientId,
    patientName,
    testTypeId,
    testPrice,
    totalAmount,
    drugId,
    quantity,
    dosage,
    instructions,
    drugPrice,
    totalDrugPrice,
    assignedBy, // This should be the doctor's user ID
  } = req.body;

  try {
    // Insert Bill
    const [billResult] = await pool.query(
      `INSERT INTO Bills (patientId, patientName, testTypeId, testPrice, totalAmount, assignedBy) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [patientId, patientName, testTypeId, testPrice, totalAmount, assignedBy]
    );

    // Insert Prescription
    const [prescriptionResult] = await pool.query(
      `INSERT INTO Prescriptions (patientId, patientName, drugId, quantity, dosage, instructions, drugPrice, totalDrugPrice, assignedBy) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        patientId,
        patientName,
        drugId,
        quantity,
        dosage,
        instructions,
        drugPrice,
        totalDrugPrice,
        assignedBy,
      ]
    );

    res.status(201).json({ message: "Data submitted successfully!" });
  } catch (error) {
    console.error("Error submitting data:", error);
    res.status(500).json({ message: "Error submitting data", error });
  }
});

export default router;