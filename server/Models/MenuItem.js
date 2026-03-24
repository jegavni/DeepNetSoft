import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,

    // 👇 link item to menu
    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", menuItemSchema);