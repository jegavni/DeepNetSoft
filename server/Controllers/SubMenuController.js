// controllers/subMenuController.js
import SubMenu from "../Models/SubMenu.js";

// Get all submenus
export const getSubMenus = async (req, res) => {
  try {
    const subMenus = await SubMenu.find();
    res.json(subMenus);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch submenus", error: err.message });
  }
};

// Get submenus by menuId
export const getSubMenusByMenu = async (req, res) => {
  try {
    const { menuId } = req.params;
    const subMenus = await SubMenu.find({ menuId });
    res.json(subMenus);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch submenus", error: err.message });
  }
};

// Add submenu
export const createSubMenu = async (req, res) => {
  try {
    const subMenu = new SubMenu(req.body);
    await subMenu.save();
    res.status(201).json(subMenu);
  } catch (err) {
    res.status(400).json({ message: "Failed to create submenu", error: err.message });
  }
};