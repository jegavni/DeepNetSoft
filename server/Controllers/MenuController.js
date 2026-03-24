// controllers/menuController.js
import Menu from "../Models/Menu.js";

// Get all menus
export const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch menus", error: err.message });
  }
};

// Get menu by ID
export const getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menu not found" });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: "Error fetching menu", error: err.message });
  }
};

// Add menu
export const createMenu = async (req, res) => {
  try {
    console.log("BODY:", req.body); // 👈 ADD THIS

    const menu = new Menu(req.body);
    await menu.save();

    res.status(201).json(menu);
  } catch (err) {
    console.error("ERROR:", err.message); // 👈 ADD THIS
    res.status(400).json({ message: "Failed to create menu", error: err.message });
  }
};