import pool from "../config/db.js";
import bcrypt from "bcryptjs";

export default class User {
  static async createTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            fullname VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NULL,
            profileImage VARCHAR(255) NULL,
            address VARCHAR(255) NOT NULL,
            DateOfBirth DATE NOT NULL,
            role ENUM(
                'Admin', 
                'Reception', 
                'Doctor', 
                'Pharmacist', 
                'LabTech', 
                'Cashier') 
            NOT NULL DEFAULT 'Reception',
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;

    await pool.query(query);
  }

  static async createAdmin() {
    const [rows] = await pool.query("SELECT * FROM users WHERE role = 'Admin'");
    if (rows.length === 0) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await pool.query(
        "INSERT INTO users (fullname, username, password, address, DateOfBirth, role) VALUES (?, ?, ?, ?, ?, ?)",
        ["Admin User", "admin", hashedPassword, "HQ", "2025-02-16", "Admin"]
      );
      console.log("Admin user created: Username - admin, Password - admin123");
    }
  }

  static async findByUsername(username) {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    return rows.length ? rows[0] : null;
  }

  static async createUser({
    fullname,
    username,
    password,
    email,
    profileImage,
    address,
    DateOfBirth,
    role,
  }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (fullname, username, password, email, profileImage, address, DateOfBirth, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        fullname,
        username,
        hashedPassword,
        email,
        profileImage,
        address,
        DateOfBirth,
        role,
      ]
    );
  }
}
