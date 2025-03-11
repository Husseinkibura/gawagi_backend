// routes/cashierRoutes.js
import express from "express";
import cashierController from "../controllers/cashierController.js";

const router = express.Router();

router.get("/bills", cashierController.getBills);

export default router;