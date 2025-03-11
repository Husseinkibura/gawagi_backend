// routes/doctorRoutes.js
import express from "express";
import doctorController from "../controllers/doctorController.js";

const router = express.Router();

// POST /api/doctor/submit
router.post("/submit", doctorController.submitData);

export default router;