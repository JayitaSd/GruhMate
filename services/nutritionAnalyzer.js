import { nutritionMap } from "../utils/nutritionMap.js";

export function analyzeNutrition(stockItems) {
  const totals = {
    protein: 0,
    fiber: 0,
    vitaminC: 0,
    vitamins: 0,
    fat: 0,
    processed: 0
  };

  const confidenceCount = { high: 0, medium: 0, low: 0 };
  const proteinSources = { veg: 0, vegan: 0, nonveg: 0 };

  stockItems.forEach(item => {
    const name = item.name.toLowerCase();

    Object.values(nutritionMap).forEach(group => {
      if (group.keywords.some(k => name.includes(k))) {
        Object.entries(group.nutrients).forEach(([n, v]) => {
          totals[n] += v;
        });

        confidenceCount[group.confidence]++;
        if (group.nutrients.protein) {
          proteinSources[group.type]++;
        }
      }
    });
  });

  const vitalityScore = Math.max(
    0,
    Math.min(
      100,
      100 - totals.processed * 10 + (totals.fiber + totals.vitaminC) * 5
    )
  );

  return {
    vitalityScore,
    totals,
    confidence: confidenceCount,
    proteinSources,
    suggestions: generateSuggestions(totals)
  };
}

function generateSuggestions(totals) {
  const suggestions = [];

  if (totals.vitaminC === 0) {
    suggestions.push("Your house has been low on Vitamin C for 2 weeks. Consider adding Oranges or Lemon.");
  }

  if (totals.fiber < 2) {
    suggestions.push("Fiber intake appears low. Add leafy vegetables or fruits.");
  }

  if (totals.processed > 2) {
    suggestions.push("High processed food usage detected. Reduce snacks and packaged foods.");
  }

  return suggestions;
}
