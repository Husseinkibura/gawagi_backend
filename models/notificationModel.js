// models/notificationModel.js


import pool from '../config/db.js';

class Notification {
  static async create(equipment_id, message, status = "Unread") {
    const [result] = await pool.query(
      "INSERT INTO notifications (equipment_id, message, status) VALUES (?, ?, ?)",
      [equipment_id, message, status]
    );
    return result.insertId;
  }

  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM notifications");
    return rows;
  }

  static async markAsRead(id) {
    await pool.query("UPDATE notifications SET status = 'Read' WHERE id = ?", [id]);
  }
}

export default Notification;