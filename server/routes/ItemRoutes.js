import express from "express";
import { createItem, getItemsByMenu } from "../Controllers/ItemController.js";

const router = express.Router();

router.post("/", createItem);
router.get("/:menuId", getItemsByMenu);

export default router;