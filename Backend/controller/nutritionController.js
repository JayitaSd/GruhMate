import Stock from "../models/Stock.js";
import User from "../models/user.js";
import { analyzeNutrition } from "../services/nutritionAnalyzer.js";

export const getNutritionDashboard = async (req, res) => {
  try {
    const userId = req.user._id; // from JWT

    const user = await User.findById(userId);
    if (!user || !user.team) {
      return res.status(400).json({ message: "User not part of any team" });
    }

    const teamId = user.team;

    const stockItems = await Stock.find({ teamId });

    if (!stockItems.length) {
      return res.json({
        vitalityScore: 0,
        confidence: "LOW",
        message: "No stock data available"
      });
    }

    const analysis = analyzeNutrition(stockItems);

    res.status(200).json({
      generatedAt: new Date(),
      ...analysis
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
