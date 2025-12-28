import Stock from "../models/Stock.js";
import { notifyTeam } from "./teamNotifier.js";

export const checkExpiringItems = async () => {
  try {
    console.log("🔍 Running expiry check...");
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const thirtyDaysFromNow = new Date(today);
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    
    const thirtyOneDaysFromNow = new Date(today);
    thirtyOneDaysFromNow.setDate(today.getDate() + 31);

    // ✅ Find items expiring in 1 day (tomorrow)
    const expiring1Day = await Stock.find({
      expiryDate: { $gte: tomorrow, $lt: thirtyDaysFromNow },
      $expr: {
        $lte: [
          { $abs: { $subtract: ["$expiryDate", tomorrow] } },
          86400000 // 1 day in milliseconds
        ]
      },
      lastExpiryNotification: { $ne: '1day' }
    }).populate('teamId');

    // ✅ Find items expiring in 30 days
    const expiring30Days = await Stock.find({
      expiryDate: { $gte: thirtyDaysFromNow, $lt: thirtyOneDaysFromNow },
      lastExpiryNotification: { $ne: '30days' }
    }).populate('teamId');

    // ✅ Find expired items
    const expiredItems = await Stock.find({
      expiryDate: { $lt: today },
      lastExpiryNotification: { $ne: 'expired' }
    }).populate('teamId');

    // Send notifications for items expiring in 1 day
    for (const item of expiring1Day) {
      try {
        await notifyTeam(
          item.teamId._id,
          `🚨 URGENT EXPIRY ALERT!\n\n📦 ${item.name} expires TOMORROW!\n⏰ Expiry: ${new Date(item.expiryDate).toLocaleDateString()}\n📊 Available: ${item.quantity} ${item.unit}\n\n⚠️ Please use this item soon to avoid waste!`
        );
        
        // Mark as notified
        item.lastExpiryNotification = '1day';
        item.lastNotificationDate = new Date();
        await item.save();
        
        console.log(`✅ Sent 1-day alert for: ${item.name}`);
      } catch (err) {
        console.error(`❌ Failed to notify for ${item.name}:`, err.message);
      }
    }

    // Send notifications for items expiring in 30 days
    for (const item of expiring30Days) {
      try {
        await notifyTeam(
          item.teamId._id,
          `⏰ EXPIRY REMINDER\n\n📦 ${item.name} expires in 30 days\n⏰ Expiry: ${new Date(item.expiryDate).toLocaleDateString()}\n📊 Available: ${item.quantity} ${item.unit}\n\nℹ️ Plan your usage accordingly.`
        );
        
        // Mark as notified
        item.lastExpiryNotification = '30days';
        item.lastNotificationDate = new Date();
        await item.save();
        
        console.log(`✅ Sent 30-day alert for: ${item.name}`);
      } catch (err) {
        console.error(`❌ Failed to notify for ${item.name}:`, err.message);
      }
    }

    // Send notifications for expired items
    for (const item of expiredItems) {
      try {
        await notifyTeam(
          item.teamId._id,
          `❌ EXPIRED ITEM ALERT!\n\n📦 ${item.name} has EXPIRED!\n⏰ Expired on: ${new Date(item.expiryDate).toLocaleDateString()}\n📊 Quantity: ${item.quantity} ${item.unit}\n\n⚠️ Please dispose of this item safely and remove from inventory.`
        );
        
        // Mark as notified
        item.lastExpiryNotification = 'expired';
        item.lastNotificationDate = new Date();
        await item.save();
        
        console.log(`✅ Sent expired alert for: ${item.name}`);
      } catch (err) {
        console.error(`❌ Failed to notify for ${item.name}:`, err.message);
      }
    }

    console.log(`✅ Expiry check complete! Sent ${expiring1Day.length + expiring30Days.length + expiredItems.length} notifications`);
  } catch (err) {
    console.error("❌ Expiry checker error:", err);
  }
};
