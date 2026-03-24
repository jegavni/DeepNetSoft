import express from "express";
import { createItem, getItemsByMenu } from "../controllers/itemController.js";

const router = express.Router();

router.post("/", createItem);
router.get("/:menuId", getItemsByMenu);

export default router;