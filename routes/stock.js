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
// router.patch("/:id/decrement", async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(id);
//     const stock = await Stock.findById(id);
//     console.log(stock)

//     if (!stock) {
//       return res.status(404).json({ message: "Stock not found" });
//     }

//     if (stock.quantity > 0) {
//       stock.quantity -= 1;
//       await stock.save();
//     }

//     // If quantity hits zero → add to BuyList
//     if (stock.quantity === 0) {
//       const buyItem = await BuyList.create({
//         teamId: stock.teamId,
//         itemName: stock.name,
//         unit: stock.unit,
//         brand: stock.brand,
//       });
//       // return res.json({ message: `⚠️ Stock for ${stock.name} has reached ZERO! Added to BuyList.`, stock, buyItem, remove: true, // 👈 flag for frontend }); }

//       // return 
//      return res.json({
//         message: `⚠️ Stock for ${stock.name} has reached ZERO! Added to BuyList.`,
//         stock,
//         buyItem,
//         remove:true
//       });
//     }

//     res.json({ message: "Stock quantity decreased by 1", stock });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
router.patch("/:id/decrement", async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).json({ message: "Stock not found" });

    stock.quantity -= 1;
    await stock.save();

    await notifyTeam(
      stock.teamId,
      `➖ ${stock.name} quantity reduced. Remaining: ${stock.quantity} ${stock.unit}`
    );

    if (stock.quantity === 0) {
      const buyItem = await BuyList.create({
        teamId: stock.teamId,
        itemName: stock.name,
        unit: stock.unit,
        brand: stock.brand
      });

      await notifyTeam(
        stock.teamId,
        `⚠️ ${stock.name} is finished and added to BuyList`
      );

      await Stock.findByIdAndDelete(stock._id);

      return res.json({
        message: "Stock finished and added to BuyList",
        buyItem,
        remove: true
      });
    }

    res.json({ stock, remove: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Increment stock quantity by 1
router.patch("/:id/increment", async (req, res) => {
  try {
    const stock = await Stock.findByIdAndUpdate(
      req.params.id,
      { $inc: { quantity: 1 } },
      { new: true }
    );

    if (!stock) return res.status(404).json({ message: "Stock not found" });

    await notifyTeam(
      stock.teamId,
      `➕ ${stock.name} quantity increased. Now: ${stock.quantity} ${stock.unit}`
    );

    res.json({ stock });
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

// DELETE /api/stock/buylist/:id
router.delete("/buylist/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await BuyList.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({ message: "BuyList item not found" });
    }

    res.json({ message: "Item removed from BuyList", item });
  } catch (err) {
    console.error("Delete BuyList error:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});


export default router;
