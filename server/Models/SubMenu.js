// models/SubMenu.js
import mongoose from "mongoose";

const subMenuSchema = new mongoose.Schema({
  menuId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
  title: { type: String, required: true },
  link: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const SubMenu = mongoose.model("SubMenu", subMenuSchema);
export default SubMenu;