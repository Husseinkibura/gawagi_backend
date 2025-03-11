// routes/drugRoutes.js
import express from "express";
import { addTestType, editTestType, deleteTestType, getAllTestTypes } from "../controllers/testTypeController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add drug - Only Admin or Pharmacist can add
router.post("/", authenticate, addTestType);

// Edit drug - Only Admin can edit
router.put("/:id", authenticate, editTestType);

// Delete drug - Only Admin can delete
router.delete("/:id", authenticate, deleteTestType);
// Get total stock quantity of drugs
// router.get("/total-stock", authenticate, getTotalStockQuantity);

// Get all drugs
router.get("/", authenticate, getAllTestTypes); // Route to fetch all drugs

export default router;