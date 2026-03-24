// routes/subMenuRoutes.js
import express from "express";
import { getSubMenus, getSubMenusByMenu, createSubMenu } from "../Controllers/SubMenuController.js";

const router = express.Router();

router.get("/", getSubMenus);
router.get("/menu/:menuId", getSubMenusByMenu);
router.post("/", createSubMenu);

export default router;