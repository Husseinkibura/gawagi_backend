import pool from '../config/db.js';

class Equipment {
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM equipment");
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM equipment WHERE id = ?", [id]);
    return rows[0];
  }

  static async create(name, status) {
    const [result] = await pool.query(
      "INSERT INTO equipment (name, status) VALUES (?, ?)",
      [name, status]
    );
    return result.insertId;
  }

  static async update(id, name, status) {
    await pool.query("UPDATE equipment SET name = ?, status = ? WHERE id = ?", [
      name,
      status,
      id,
    ]);
  }

  static async delete(id) {
    await pool.query("DELETE FROM equipment WHERE id = ?", [id]);
  }
}

export default Equipment;