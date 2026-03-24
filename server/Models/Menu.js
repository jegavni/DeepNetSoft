import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },

  description: { 
    type: String 
  },

  parentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Menu", 
    default: null 
  },

  category: { 
    type: String 
  },

  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;
