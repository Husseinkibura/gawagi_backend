// controllers/doctorController.js
import Bill from "../models/billsModel.js";
import Prescription from "../models/PrescriptionModel.js";

const submitData = async (req, res) => {
  const {
    patientId,
    patientName,
    testTypeId,
    testPrice,
    totalAmount,
    drugId,
    quantity,
    dosage,
    instructions,
    drugPrice,
    totalDrugPrice,
    assignedBy,
  } = req.body;

  // Validate required fields
  if (
    !patientId ||
    !patientName ||
    !testTypeId ||
    !testPrice ||
    !totalAmount ||
    !drugId ||
    !quantity ||
    !dosage ||
    !instructions ||
    !drugPrice ||
    !totalDrugPrice ||
    !assignedBy
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Insert Bill
    await Bill.create(patientId, patientName, testTypeId, testPrice, totalAmount, assignedBy);

    // Insert Prescription
    await Prescription.create(
      patientId,
      patientName,
      drugId,
      quantity,
      dosage,
      instructions,
      drugPrice,
      totalDrugPrice,
      assignedBy
    );

    res.status(201).json({ message: "Data submitted successfully!" });
  } catch (error) {
    console.error("Error submitting data:", error);
    res.status(500).json({ message: "Error submitting data", error });
  }
};

export default { submitData };