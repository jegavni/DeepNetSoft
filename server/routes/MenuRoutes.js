// routes/menuRoutes.js
import express from "express";
import { getMenus, getMenuById, createMenu } from "../Controllers/MenuController.js";

const router = express.Router();

router.get("/", getMenus);
router.get("/:id", getMenuById);
router.post("/", createMenu);

export default router;