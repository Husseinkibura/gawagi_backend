// // routes/profileRoutes.js
// import express from "express";
// import multer from "multer";
// import pool from "../config/db.js";

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// router.post("/upload-profile-picture", upload.single("profileImage"), async (req, res) => {
//   const { userId } = req.body;
//   const profileImage = req.file.path;

//   try {
//     const [result] = await pool.query(
//       "UPDATE users SET profile_image = ? WHERE id = ?",
//       [profileImage, userId]
//     );

//     if (result.affectedRows > 0) {
//       res.status(200).json({ message: "Profile picture updated successfully", profileImage });
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error updating profile picture", error });
//   }
// });

// export default router;