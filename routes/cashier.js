// routes/cashier.js
import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Cashier retrieves bills
router.get("/bills", async (req, res) => {
  try {
    const [bills] = await pool.query(`
      SELECT 
        Bills.*, 
        testtype.name AS testTypeName, 
        users.fullname AS assignedByName 
      FROM Bills
      INNER JOIN testtype ON Bills.testTypeId = testtype.id
      INNER JOIN users ON Bills.assignedBy = users.id
    `);
    res.status(200).json(bills);
  } catch (error) {
    console.error("Error fetching bills:", error);
    res.status(500).json({ message: "Error fetching bills", error });
  }
});

export default router;