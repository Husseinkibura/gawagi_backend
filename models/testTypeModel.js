import pool from "../config/db.js"; // Assuming you have a DB connection pool

const TestType = {
  // Create new drug
  createTestType: async (data) => {
    // Validate fields to prevent undefined values
    const {
        name,
        description,
        category,
        disease,
        price,
    } = data;

    // Handle undefined values by replacing them with null
    const values = [
      name || null,
      description || null,
      category || null,
      disease || null,
      price || null,
    ];

    const query = `
      INSERT INTO testtype (name, description, category, disease, price)
      VALUES (?, ?, ?, ?, ?)
    `;

    try {
      // Use the pool to execute the query
      const [result] = await pool.execute(query, values);
      return result; // Return the result (confirmation or the created drug object)
    } catch (error) {
      throw new Error(error.message); // Handle error properly
    }
  },

  // Get all drugs
  getAllTestTypes: async () => {
    const query = "SELECT * FROM testtype"; // Query to fetch all drugs
    try {
      const [rows] = await pool.execute(query); // Execute the query
      return rows; // Return the fetched rows
    } catch (error) {
      throw new Error(`Error fetching test types: ${error.message}`);
    }
  },

    // Get total stock quantity of drugs
//   getTotalStockQuantity: async () => {
//       const query = "SELECT SUM(stock_quantity) AS totalStock FROM drugs"; // Query to sum stock_quantity
//       try {
//         const [rows] = await pool.execute(query);
//         return rows[0].totalStock || 0; // Return the total stock quantity (default to 0 if no drugs exist)
//       } catch (error) {
//         throw new Error(`Error fetching total stock quantity: ${error.message}`);
//       }
//     },
};

export default TestType;
