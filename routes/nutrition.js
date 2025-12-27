// routes/nutrition.js
import express from "express";
import { getNutritionDashboard } from "../controller/nutritionController.js";
import { verifyToken } from "../middleware/authmiddleware.js"
const router = express.Router();

router.get("/dashboard", verifyToken, getNutritionDashboard);

export default router;
