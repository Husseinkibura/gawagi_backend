import TestType from '../models/testTypeModel.js';


export const addTestType = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      disease,
      price,
    } = req.body;


    const newTestType = await TestType.createTestType({
      name,
      description,
      category,
      disease,
      price,
    });

    res.status(201).json({ message: "Test Type added successfully", testtype: newTestType });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const editTestType = async (req, res) => {
  try {
    const { testtypeId } = req.params;
    const { name, description, category, disease, price } = req.body;

    const updatedTestType = await TestType.updatedTestType(testtypeId, {
      name,
      description,
      category,
      disease,
      price,
    });

    if (updatedTestType) {
      res.status(200).json({ message: 'Test Type updated successfully', testtype: updatedTestType });
    } else {
      res.status(404).json({ message: 'Test Type not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteTestType = async (req, res) => {
  try {
    const { testtypeId } = req.params; 


    const result = await TestType.deleteTestType(testtypeId);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Test Type deleted successfully' });
    } else {
      res.status(404).json({ message: 'Test Type not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllTestTypes = async (req, res) => {
    try {
      const testtypes = await TestType.getAllTestTypes();
      res.status(200).json(testtypes); 
    } catch (error) {
      console.error("Error fetching test types:", error);
      res.status(500).json({ message: error.message }); 
    }
  };

// Get total stock quantity of drugs
// export const getTotalStockQuantity = async (req, res) => {
//     try {
//       const totalStock = await Drug.getTotalStockQuantity(); // Call the model method
//       res.status(200).json({ totalStock });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };