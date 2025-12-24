// import express from 'express';
// import { addStock, getStockByTeam } from "../controller/stockController.js"

// const router = express.Router();
// import Stock from "../models/Stock.js";

// // Add new stock
// router.post('/', addStock);

// // Get stock by team
// router.get('/team/:teamId', getStockByTeam);

// // Delete stock by ID
// // import express from 'express';
// // import { addStock, getStockByTeam } from "../controller/stockController.js";
// // import Stock from "../models/Stock.js";

// // const router = express.Router();

// // // Add new stock
// // router.post('/', addStock);

// // // Get stock by team
// // router.get('/team/:teamId', getStockByTeam);

// // Decrement stock quantity by 1
// router.patch("/:id/decrement", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const stock = await Stock.findById(id);

//     if (!stock) {
//       return res.status(404).json({ message: "Stock not found" });
//     }

//     if (stock.quantity > 0) {
//       stock.quantity -= 1;
//       await stock.save();
//     }

//     if (stock.quantity === 0) {
//       return res.json({ message: `⚠️ Stock for ${stock.name} has reached ZERO!`, stock });
//     }

//     res.json({ message: "Stock quantity decreased by 1", stock });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Update stock quantity directly
// router.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { quantity } = req.body;

//     const updatedStock = await Stock.findByIdAndUpdate(
//       id,
//       { quantity },
//       { new: true }
//     );

//     if (!updatedStock) {
//       return res.status(404).json({ message: "Stock not found" });
//     }

//     res.json(updatedStock);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // // True delete (remove item completely)
// // router.delete("/:id", async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const deleted = await Stock.findByIdAndDelete(id);

// //     if (!deleted) {
// //       return res.status(404).json({ message: "Stock not found" });
// //     }

// //     res.json({ message: "Stock deleted successfully" });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// export default router;
import express from "express";
import { addStock, getStockByTeam } from "../controller/stockController.js";
import Stock from "../models/Stock.js";
import BuyList from "../models/BuyList.js";

const router = express.Router();

// Add new stock
router.post("/", addStock);

// Get stock by team
router.get("/team/:teamId", getStockByTeam);

// Decrement stock quantity by 1
router.patch("/:id/decrement", async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await Stock.findById(id);

    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    if (stock.quantity > 0) {
      stock.quantity -= 1;
      await stock.save();
    }

    // If quantity hits zero → add to BuyList
    if (stock.quantity === 0) {
      const buyItem = await BuyList.create({
        teamId: stock.teamId,
        itemName: stock.name,
        unit: stock.unit,
        brand: stock.brand,
      });

      return res.json({
        message: `⚠️ Stock for ${stock.name} has reached ZERO! Added to BuyList.`,
        stock,
        buyItem,
      });
    }

    res.json({ message: "Stock quantity decreased by 1", stock });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Increment stock quantity by 1
router.patch("/:id/increment", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Stock.findByIdAndUpdate(
      id,
      { $inc: { quantity: 1 } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Stock not found" });
    res.json({ message: "Stock quantity increased by 1", stock: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get BuyList for a team
router.get("/buylist/:teamId", async (req, res) => {
  try {
    const { teamId } = req.params;
    const buyList = await BuyList.find({ teamId });
    res.json(buyList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
