import Equipment from '../models/equipmentModel.js';
import Notification from '../models/notificationModel.js';

export const getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.getAll();
    res.status(200).json(equipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.getById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }
    res.status(200).json(equipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createEquipment = async (req, res) => {
  try {
    const { name, status } = req.body;
    const id = await Equipment.create(name, status);
    res.status(201).json({ id, name, status });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    await Equipment.update(id, name, status);

    // Notify admin if status is "Broken" or "Maintenance"
    if (status === "Broken" || status === "Maintenance") {
      const message = `Equipment "${name}" is now in ${status} status.`;
      await Notification.create(id, message);
    }

    res.status(200).json({ message: "Equipment updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    await Equipment.delete(id);
    res.status(200).json({ message: "Equipment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};