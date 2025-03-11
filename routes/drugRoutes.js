// routes/drugRoutes.js

import express from "express";
import {
  addDrug,
  editDrug,
  deleteDrug,
  getAllDrugs,
  getTotalStockQuantity,
  updateDrugQuantities,
  getDrugByBarcode,
  getDrugByName,
} from "../controllers/drugController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Define DELETE route first to avoid conflicts
router.delete('/:id', authenticate, deleteDrug);

// Other routes
router.get('/barcode/:barcode', getDrugByBarcode);
router.get('/:name', getDrugByName);
router.post("/", authenticate, addDrug);
router.put("/:id", authenticate, editDrug);
router.get("/total-stock", authenticate, getTotalStockQuantity);
router.get("/", authenticate, getAllDrugs);
router.post("/update-stock", authenticate, updateDrugQuantities);

export default router;