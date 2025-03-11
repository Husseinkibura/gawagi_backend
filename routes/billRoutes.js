// routes/billRoutes.js

import express from "express";
import {
  getBills,
  createBill,
  getBillById,
  updateBill,
  deleteBill,
  approvePayment, // Import the new function
} from "../controllers/billController.js";

const router = express.Router();

router.get("/", getBills);
router.post("/", createBill);
router.get("/:id", getBillById);
router.put("/:id", updateBill);
router.delete("/:id", deleteBill);
router.put("/:id/approve-payment", approvePayment); // New route for payment approval

export default router;