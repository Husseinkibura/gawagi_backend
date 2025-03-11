import express from "express";
import {
  register,
  login,
  addUser,
  getDoctors,
  getReceptionists,
  getTests,
  getPharmacists,
  addTest,
  getPatientById,
  getCashiers,
  getTechnicians,
  updateTestResults,
  deleteUser,
  updateUser,
  getTestResults,
  getPatients,
  getRchclinics,
  getTechnicianTests,
} from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { addDrug } from "../controllers/drugController.js";
import upload from "../middlewares/uploadMiddleware.js"; // Import the upload middleware

const router = express.Router();

// Public Routes (No authentication required)
router.post("/register", register); // Register a new user
router.post("/login", login); // Login a user

// Protected Routes (Authentication required)
// Admin can add any user
router.post(
  "/add-user",
  authenticate,
  upload.single("Contract"), // Handle file upload for the Contract field
  addUser
);

// Reception can only add Patients
router.post(
  "/add-patient",
  authenticate,
  (req, res, next) => {
    if (req.user.role !== "Reception") {
      return res
        .status(403)
        .json({ message: "Access denied. Only Reception can add Patients." });
    }
    req.body.role = "Patient"; // Force role to be Patient
    next();
  },
  addUser
);

// Add Drug (Only Admin or Pharmacist can add drugs)
router.post(
  "/add-drug",
  authenticate,
  (req, res, next) => {
    if (req.user.role !== "Admin" && req.user.role !== "Pharmacist") {
      return res.status(403).json({
        message: "Access denied. Only Admin or Pharmacist can add drugs.",
      });
    }
    next();
  },
  addDrug
);

// Update test results (Technician)
router.put(
  "/tests/:id/results",
  authenticate,
  (req, res, next) => {
    if (req.user.role !== "LabTech") {
      return res
        .status(403)
        .json({ message: "Access denied. Only Technicians can update test results." });
    }
    next();
  },
  updateTestResults
);

// Fetch test results (Doctor)
router.get(
  "/tests/results/:patientId",
  authenticate,
  (req, res, next) => {
    if (req.user.role !== "Doctor") {
      return res
        .status(403)
        .json({ message: "Access denied. Only Doctors can view test results." });
    }
    next();
  },
  getTestResults
);

// Fetch tests assigned to the technician
router.get(
  "/technician/tests",
  authenticate,
  (req, res, next) => {
    if (req.user.role !== "LabTech") {
      return res
        .status(403)
        .json({ message: "Access denied. Only Technicians can view assigned tests." });
    }
    next();
  },
  getTechnicianTests
);

// Fetch all users by role
router.get("/users/role/Patient", authenticate, getPatients); // Get all patients
router.delete("/delete-user/:id", authenticate, deleteUser);
router.put("/update-user/:id", authenticate, upload.single("Contract"), updateUser);
router.get("/doctors", authenticate, getDoctors); // Get all doctors
router.get("/receptionists", authenticate, getReceptionists); // Get all receptionists
router.get("/pharmacists", authenticate, getPharmacists); // Get all pharmacists
router.get("/cashiers", authenticate, getCashiers); // Get all cashiers
router.get("/technicians", authenticate, getTechnicians); // Get all lab technicians
router.get("/patients", authenticate, getPatients); // Get all patients 
router.get("/rchclinics", authenticate, getRchclinics); // Get all rchclinics

// Fetch a patient by ID
router.get("/patients/:id", authenticate, getPatientById);

// Add a new test
router.post("/tests", authenticate, addTest);

// Fetch all tests
router.get("/tests", authenticate, getTests);

export default router;