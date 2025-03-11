// controllers/cashierController.js
import Bill from "../models/billsModel.js";

const getBills = async (req, res) => {
  try {
    const bills = await Bill.findAll();
    res.status(200).json(bills);
  } catch (error) {
    console.error("Error fetching bills:", error);
    res.status(500).json({ message: "Error fetching bills", error });
  }
};

export default { getBills };