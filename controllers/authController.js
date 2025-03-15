import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import pool from "../config/db.js"; // Import the database pool

dotenv.config();

// Register a new user
export const register = async (req, res) => {
  try {
    const {
      fullname,
      username,
      password,
      email,
      profileImage,
      address,
      DateOfBirth,
      Contract, // Add Contract value
      Salary,   // Add Salary value
      role,
    } = req.body;

    // Check if the username already exists
    const userExists = await User.findByUsername(username);
    if (userExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create the user
    await User.createUser({
      fullname,
      username,
      password,
      email,
      profileImage,
      address,
      Contract, // Add Contract value
      Salary,   // Add Salary value
      DateOfBirth,
      role,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login a user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Login request received:", { username, password }); // Log the request payload

    // Find the user by username
    const user = await User.findByUsername(username);
    if (!user) {
      console.log("User not found:", username); // Log if user is not found
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("User found:", user); // Log the user object

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password comparison failed for user:", username); // Log if password comparison fails
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("Password comparison successful for user:", username); // Log if password comparison succeeds

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("Token generated for user:", user.username); // Log the generated token

    res.json({
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (error) {
    console.error("Login error:", error); // Log any errors
    res.status(500).json({ message: error.message });
  }
};

export const addUser = async (req, res) => {
  try {
    const {
      fullname,
      username,
      password,
      email,
      profileImage,
      address,
      DateOfBirth,
      role,
      patientId,
      age,
      Salary,
    } = req.body;

    // Store only the relative path (e.g., "contracts/filename.pdf")
    const Contract = req.file ? `contracts/${req.file.filename}` : null;

    // Validate Salary
    if (isNaN(parseFloat(Salary))) {
      return res.status(400).json({ message: "Salary must be a valid number." });
    }

    // Validate Age
    if (isNaN(parseInt(age))) {
      return res.status(400).json({ message: "Age must be a valid number." });
    }

    // Parse Salary and Age as numbers
    const parsedSalary = parseFloat(Salary);
    const parsedAge = parseInt(age);

    // Only set patientId for patients
    const finalPatientId = role === "Patient" ? patientId : null;

    // Create the user
    await User.createUser({
      fullname,
      username,
      password,
      email,
      profileImage,
      address,
      DateOfBirth,
      role,
      patientId: finalPatientId, // Use finalPatientId
      age: parsedAge, // Use parsedAge
      Contract, // Use the relative path
      Salary: parsedSalary, // Use parsedSalary
    });

    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error adding user:", error); // Log the error for debugging
    res.status(500).json({ message: "An error occurred while adding the doctor." });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "An error occurred while deleting the user." });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    fullname,
    username,
    password,
    email,
    profileImage,
    address,
    DateOfBirth,
    role,
    patientId,
    age,
    Salary,
  } = req.body;

  const Contract = req.file ? `contracts/${req.file.filename}` : null;

  try {
    const [result] = await pool.query(
      "UPDATE users SET fullname = ?, username = ?, password = ?, email = ?, profileImage = ?, address = ?, DateOfBirth = ?, role = ?, patientId = ?, age = ?, Contract = ?, Salary = ? WHERE id = ?",
      [
        fullname,
        username,
        password,
        email,
        profileImage,
        address,
        DateOfBirth,
        role,
        patientId,
        age,
        Contract,
        Salary,
        id,
      ]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "An error occurred while updating the user." });
  }
};

// Get all doctors  
export const getDoctors = async (req, res) => {
  try {
    const doctors = await User.getUsersByRole("Doctor");
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all RCH Clinic  
export const getRchclinics = async (req, res) => {
  try {
    const rchclinics = await User.getUsersByRole("RCHClinic");
    res.status(200).json(rchclinics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all receptionists
export const getReceptionists = async (req, res) => {
  try {
    const receptionists = await User.getUsersByRole("Reception");
    res.status(200).json(receptionists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all pharmacists
export const getPharmacists = async (req, res) => {
  try {
    const pharmacists = await User.getUsersByRole("Pharmacist");
    res.status(200).json(pharmacists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all cashiers
export const getCashiers = async (req, res) => {
  try {
    const cashiers = await User.getUsersByRole("Cashier");
    res.status(200).json(cashiers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all lab technicians
export const getTechnicians = async (req, res) => {
  try {
    const technicians = await User.getUsersByRole("LabTech");
    res.status(200).json(technicians);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all patients
export const getPatients = async (req, res) => {
  try {
    const patients = await User.getUsersByRole("Patient");
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a patient by ID
export const getPatientById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE patientId = ? AND role = ?",
      [id, "Patient"]
    );

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new test
// Add a new test
export const addTest = async (req, res) => {
  const {
    patient_id,
    patient_name,
    symptoms,
    expected_disease,
    check_for,
    assigned_by,
    other_symptoms, // Ensure this is included
    created_at,
  } = req.body;

  console.log("Received data:", req.body); // Log the received data

  // Validate the created_at value
  let mysqlDatetime;
  if (created_at) {
    const date = new Date(created_at);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: "Invalid date format for created_at" });
    }
    mysqlDatetime = date.toISOString().slice(0, 19).replace("T", " ");
  } else {
    // If created_at is not provided, use the current date and time
    mysqlDatetime = new Date().toISOString().slice(0, 19).replace("T", " ");
  }

  try {
    const query = `
      INSERT INTO tests (patient_id, patient_name, symptoms, expected_disease, check_for, assigned_by, other_symptoms, created_at, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      patient_id,
      patient_name,
      JSON.stringify(symptoms),
      expected_disease,
      check_for,
      assigned_by,
      other_symptoms, // This should be included
      mysqlDatetime,
      "Pending", // Default status
    ];

    const [result] = await pool.execute(query, values);
    res.status(201).json({ message: "Test added successfully", id: result.insertId });
  } catch (error) {
    console.error("Error adding test:", error);
    res.status(500).json({ message: "Failed to add test" });
  }
};

// Fetch all tests
export const getTests = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tests");

    // Map the results to include symptoms as an array
    const tests = rows.map((row) => ({
      ...row,
      symptoms: row.symptoms, // Use the symptoms array directly
    }));

    res.status(200).json(tests);
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({ message: "An error occurred while fetching tests." });
  }
};

export const updateTestResults = async (req, res) => {
  const { id } = req.params; // Test ID
  const { results } = req.body; // Test results

  try {
    // console.log("Updating test results for test ID:", id);
    // console.log("Results to be updated:", results); 

    const query = `
      UPDATE tests
      SET results = ?, status = 'Completed'
      WHERE id = ?
    `;
    const values = [results, id];

    await pool.execute(query, values);
    console.log("Test results updated successfully"); // Log success
    res.status(200).json({ message: "Test results updated successfully" });
  } catch (error) {
    console.error("Error updating test results:", error); // Log the error
    res.status(500).json({ message: "Failed to update test results" });
  }
};
export const getTestResults = async (req, res) => {
  const { patientId } = req.params;

  try {
    const query = `
      SELECT * FROM tests
      WHERE patient_id = ? AND status = 'Completed'
    `;
    const [rows] = await pool.execute(query, [patientId]);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({ message: "No test results found for this patient" });
    }
  } catch (error) {
    console.error("Error fetching test results:", error);
    res.status(500).json({ message: "Failed to fetch test results" });
  }
};

export const getTechnicianTests = async (req, res) => {
  const { id } = req.user; // Technician's user ID (from JWT token)

  try {
    const query = `
      SELECT * FROM tests
      WHERE assigned_by = ? OR status = 'Pending'
    `;
    const [rows] = await pool.execute(query, [id]);

    // Log the fetched data
    console.log("Fetched tests:", rows);

    // Map the results to include symptoms as an array
    const tests = rows.map((row) => ({
      ...row,
      symptoms: row.symptoms, // Use the symptoms array directly
    }));

    res.status(200).json(tests);
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({ message: "An error occurred while fetching tests." });
  }
};