// services/nutritionService.js
/*import Stock from "../models/Stock.js";

const normalize = (name) => name.toLowerCase();
// services/nutritionService.js

export const FOOD_NUTRITION_MAP = {
  protein: {
    veg: ["paneer", "tofu", "dal", "lentil", "chickpea", "beans"],
    vegan: ["soy", "tofu", "lentil", "chickpea"],
    nonVeg: ["egg", "chicken", "fish", "meat"]
  },

  vitamins: {
    vitaminC: ["orange", "lemon", "amla", "guava"],
    vitaminA: ["carrot", "spinach"],
    vitaminK: ["broccoli", "spinach"]
  },

  fiber: ["oats", "brown rice", "vegetables", "fruits"],

  fat: ["butter", "cheese", "oil", "chips", "fried"],

  processed: ["chips", "snack", "biscuit", "cola", "noodles"]
};

export const analyzeNutrition = async (teamId) => {
  const stock = await Stock.find({ teamId });

  let counters = {
    protein: { veg: 0, vegan: 0, nonVeg: 0 },
    vitamins: { vitaminA: 0, vitaminC: 0, vitaminK: 0 },
    fiber: 0,
    fat: 0,
    processed: 0,
    totalItems: stock.length
  };

  stock.forEach(item => {
    const name = normalize(item.name);

    // Protein
    if (["paneer","tofu","dal","lentil","beans"].some(k => name.includes(k)))
      counters.protein.veg++;

    if (["soy","tofu","lentil"].some(k => name.includes(k)))
      counters.protein.vegan++;

    if (["egg","chicken","fish","meat"].some(k => name.includes(k)))
      counters.protein.nonVeg++;

    // Vitamins
    if (["orange","lemon","amla","guava"].some(k => name.includes(k)))
      counters.vitamins.vitaminC++;

    if (["carrot","spinach"].some(k => name.includes(k)))
      counters.vitamins.vitaminA++;

    if (["broccoli","spinach"].some(k => name.includes(k)))
      counters.vitamins.vitaminK++;

    // Fiber
    if (["oats","brown rice","vegetable","fruit"].some(k => name.includes(k)))
      counters.fiber++;

    // Fat & processed
    if (["butter","oil","cheese"].some(k => name.includes(k)))
      counters.fat++;

    if (["chips","biscuit","snack","noodles"].some(k => name.includes(k)))
      counters.processed++;
  });

  // Vitality Score (simple weighted model)
  const vitalityScore = Math.max(
    0,
    100
    - counters.processed * 10
    + (counters.fiber + counters.vitamins.vitaminC) * 5
  );

  // Recommendations
  const recommendations = {
    add: [],
    reduce: []
  };

  if (counters.vitamins.vitaminC === 0)
    recommendations.add.push("Oranges");

  if (counters.fiber < 2)
    recommendations.add.push("Green Vegetables");

  if (counters.processed > counters.totalItems * 0.5)
    recommendations.reduce.push("Processed Snacks");

  return {
    vitalityScore,
    breakdown: counters,
    recommendations
  };
};
*/