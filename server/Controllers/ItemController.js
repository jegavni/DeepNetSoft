import MenuItem from "../Models/MenuItem.js";


// ✅ Create Item
export const createItem = async (req, res) => {
  try {
    const { title, description, price, menuId } = req.body;

    const item = await MenuItem.create({
      title,
      description,
      price,
      menuId,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ Get Items by Menu
export const getItemsByMenu = async (req, res) => {
  try {
    const items = await MenuItem.find({
      menuId: req.params.menuId,
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};