// controllers/pharmacistController.js
import Prescription from "../models/PrescriptionModel.js";

const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.findAll();
    res.status(200).json(prescriptions);
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    res.status(500).json({ message: "Error fetching prescriptions", error });
  }
};

export default { getPrescriptions };