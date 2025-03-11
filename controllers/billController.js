// controllers/billController.js
import Bill from "../models/Bill.js";


export const getBills = async (req, res) => {
  try {
    const bills = await Bill.getAll();
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBill = async (req, res) => {
  try {
    const { drugPrice, testPrice, totalTestPrice, totalDrugPrice } = req.body;

    // Validate decimal fields
    if (
      isNaN(parseFloat(drugPrice)) ||
      isNaN(parseFloat(testPrice)) ||
      isNaN(parseFloat(totalTestPrice)) ||
      isNaN(parseFloat(totalDrugPrice))
    ) {
      return res.status(400).json({ 
        message: "Invalid decimal values. Please check the drug price, test price, total test price, and total drug price." 
      });
    }

    // Format decimal fields as Tanzanian Shillings (Tsh)
    const formattedData = {
      ...req.body,
      drugPrice: parseFloat(drugPrice).toFixed(2),
      testPrice: parseFloat(testPrice).toFixed(2),
      totalTestPrice: parseFloat(totalTestPrice).toFixed(2),
      totalDrugPrice: parseFloat(totalDrugPrice).toFixed(2),
    };

    // Create the bill in the database
    const billId = await Bill.create(formattedData);
    res.status(201).json({ id: billId, ...formattedData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBillById = async (req, res) => {
  try {
    const bill = await Bill.getById(req.params.id);
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBill = async (req, res) => {
  try {
    await Bill.update(req.params.id, req.body);
    res.json({ message: "Bill updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBill = async (req, res) => {
  try {
    await Bill.delete(req.params.id);
    res.json({ message: "Bill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const approvePayment = async (req, res) => {
  try {
    const { id } = req.params;

    // Update the bill's payment status to "Paid"
    await Bill.approveBillPayment(id);

    res.json({ message: "Payment approved successfully" });
  } catch (error) {
    console.error("Error in approvePayment:", error);
    res.status(500).json({ message: error.message });
  }
};