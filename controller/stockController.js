import Stock from '../models/Stock.js';
// import BuyList from '../src/components/BuyList.jsx';
import { notifyTeam } from '../services/teamNotifier.js';

/* ================= ADD STOCK ================= */
export const addStock = async (req, res) => {
  try {
    const {
      teamId,
      name,
      quantity,
      unit,
      consumptionRate,
      expiryDate,
      brand
    } = req.body;
    console.log(req.body);

    const stock = await Stock.create({
      teamId,
      name,
      quantity,
      unit,
      consumptionRate,
      expiryDate: expiryDate || null,
      brand
    });
    await notifyTeam(
      teamId,
      `📦 New stock added: ${name} (${quantity} ${unit})`
    );

    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= GET STOCK BY TEAM ================= */
// export const getStockByTeam = async (req, res) => {
//   try {
//     const { teamId } = req.params;

//     const stock = await Stock.find({ teamId }).populate('teamId', 'teamName');


//     res.json(stock);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const getStockByTeam = async (req, res) => {
  try {
    const { teamId } = req.params;

    if (!teamId || teamId === "undefined" || teamId === "null") {
      return res.status(400).json({ message: "Invalid teamId" });
    }

    const stock = await Stock.find({ teamId }).populate("teamId", "teamName");
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

