// routes/pharmacistRoutes.js
import express from "express";
import pharmacistController from "../controllers/pharmacistController.js";

const router = express.Router();

router.get("/prescriptions", pharmacistController.getPrescriptions);

export default router;