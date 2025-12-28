import express from "express";
import { addStock, getStockByTeam, updateStock, deleteStock } from "../controller/stockController.js";
import Stock from "../models/Stock.js";
import BuyList from "../models/BuyList.js";
import { notifyTeam } from "../services/teamNotifier.js";

const router = express.Router();

// Add new stock (uses controller)
router.post("/", addStock);

// Get stock by team
router.get("/team/:teamId", getStockByTeam);

// Update stock (uses controller)
router.put("/:id", updateStock);

// Delete stock (uses controller)
router.delete("/:id", deleteStock);

// ✅ FIXED: Decrement stock WITH better error handling
// ✅ FIXED: Decrement stock - Check if quantity is already 0
router.patch("/:id/decrement", async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    const userName = req.body.userName || 'Team member';

    // ✅ Check if quantity is already 0
    if (stock.quantity <= 0) {
      return res.status(400).json({ 
        message: "Stock is already at zero. Cannot decrease further.",
        stock,
        remove: false
      });
    }

    // Decrease quantity
    stock.quantity -= 1;
    await stock.save();

    // ✅ Send notification for decrease
    try {
      await notifyTeam(
        stock.teamId,
        `➖ STOCK DECREASED\n📦 ${stock.name}\n📊 Remaining: ${stock.quantity} ${stock.unit}\n👤 By: ${userName}`
      );
    } catch (notifyError) {
      console.error("⚠️ Notification failed:", notifyError.message);
    }

    // ✅ If stock reaches zero, add to buylist and delete
    if (stock.quantity === 0) {
      const buyItem = await BuyList.create({
        teamId: stock.teamId,
        itemName: stock.name,
        unit: stock.unit,
        brand: stock.brand
      });

      // Send notification for stock finished
      try {
        await notifyTeam(
          stock.teamId,
          `⚠️ STOCK FINISHED!\n📦 ${stock.name} is out of stock\n🛒 Added to BuyList\n👤 By: ${userName}`
        );
      } catch (notifyError) {
        console.error("⚠️ Notification failed:", notifyError.message);
      }

      await Stock.findByIdAndDelete(stock._id);
      return res.json({
        message: "Stock finished and added to BuyList",
        buyItem,
        remove: true
      });
    }

    res.json({ stock, remove: false });
  } catch (err) {
    console.error("❌ Decrement error:", err);
    res.status(500).json({ message: err.message });
  }
});


// ✅ FIXED: Increment stock WITH better error handling
router.patch("/:id/increment", async (req, res) => {
  try {
    const stock = await Stock.findByIdAndUpdate(
      req.params.id,
      { $inc: { quantity: 1 } },
      { new: true }
    );
    
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    const userName = req.body.userName || 'Team member';
    
    // ✅ TRY to send notification, but don't fail if it errors
    try {
      await notifyTeam(
        stock.teamId,
        `➕ STOCK INCREASED\n📦 ${stock.name}\n📊 Now: ${stock.quantity} ${stock.unit}\n👤 By: ${userName}`
      );
    } catch (notifyError) {
      console.error("⚠️ Notification failed (but stock was updated):", notifyError.message);
    }

    res.json({ stock });
  } catch (err) {
    console.error("❌ Increment error:", err);
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

// Add to BuyList manually
router.post("/buylist", async (req, res) => {
  try {
    const { teamId, itemName, unit, brand, userName } = req.body;

    const buyItem = await BuyList.create({
      teamId,
      itemName,
      unit,
      brand
    });

    // ✅ TRY to send notification
    try {
      await notifyTeam(
        teamId,
        `🛒 NEW ITEM ADDED TO BUYLIST\n📦 ${itemName}\n👤 By: ${userName || 'Team member'}`
      );
    } catch (notifyError) {
      console.error("⚠️ Notification failed:", notifyError.message);
    }

    res.json({ message: "Item added to BuyList", buyItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE from BuyList
router.delete("/buylist/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await BuyList.findById(id);
    
    if (!item) {
      return res.status(404).json({ message: "BuyList item not found" });
    }

    const userName = req.body.userName || 'Team member';
    const itemName = item.itemName;
    const teamId = item.teamId;

    await BuyList.findByIdAndDelete(id);

    // ✅ TRY to send notification
    try {
      await notifyTeam(
        teamId,
        `✅ REMOVED FROM BUYLIST\n🛒 ${itemName}\n👤 By: ${userName}`
      );
    } catch (notifyError) {
      console.error("⚠️ Notification failed:", notifyError.message);
    }

    res.json({ message: "Item removed from BuyList", item });
  } catch (err) {
    console.error("Delete BuyList error:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// Update expiry and consumption rate
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { expiry, consumptionRate } = req.body;

  if (!expiry || !consumptionRate) {
    return res.status(400).json({ error: "Expiry and consumptionRate are required" });
  }

  try {
    const updated = await Stock.findByIdAndUpdate(
      id,
      { expiry, consumptionRate },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Stock item not found" });
    }

    res.json({ message: "Stock updated successfully", stock: updated });
  } catch (err) {
    console.error("Error updating stock:", err);
    res.status(500).json({ error: "Server error" });
  }
});




export default router;
