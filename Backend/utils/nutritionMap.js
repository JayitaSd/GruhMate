export const nutritionMap = {
  lentils: {
    keywords: ["dal", "lentil", "chana", "rajma"],
    nutrients: { protein: 1, fiber: 1 },
    confidence: "high",
    type: "veg"
  },

  dairy: {
    keywords: ["milk", "curd", "paneer", "cheese"],
    nutrients: { protein: 1, fat: 1 },
    confidence: "medium",
    type: "veg"
  },

  fruits: {
    keywords: ["orange", "apple", "banana", "lemon"],
    nutrients: { vitaminC: 1, fiber: 1 },
    confidence: "high",
    type: "vegan"
  },

  vegetables: {
    keywords: ["spinach", "tomato", "carrot", "broccoli"],
    nutrients: { fiber: 1, vitamins: 1 },
    confidence: "high",
    type: "vegan"
  },

  processed: {
    keywords: ["chips", "biscuit", "namkeen", "snacks"],
    nutrients: { processed: 1 },
    confidence: "low",
    type: "processed"
  },

  nonVeg: {
    keywords: ["egg", "chicken", "fish", "meat"],
    nutrients: { protein: 1, fat: 1 },
    confidence: "high",
    type: "nonveg"
  }
};
