import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

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
      role,
    } = req.body;
    const userExists = await User.findByUsername(username);
    if (userExists)
      return res.status(400).json({ message: "Username already exists" });

    await User.createUser({
      fullname,
      username,
      password,
      email,
      profileImage,
      address,
      DateOfBirth,
      role,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByUsername(username);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Add users
export const addUser = async (req, res) => {
    try {
        const { fullname, username, password, email, profileImage, address, DateOfBirth, role } = req.body;

        // Check if the user is an Admin
        if (req.user.role !== "Admin") {
            return res.status(403).json({ message: "Access denied. Only Admins can add users." });
        }

        // Check if username already exists
        const userExists = await User.findByUsername(username);
        if (userExists) return res.status(400).json({ message: "Username already exists" });

        // Create the user
        await User.createUser({ fullname, username, password, email, profileImage, address, DateOfBirth, role });
        res.status(201).json({ message: "User added successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};