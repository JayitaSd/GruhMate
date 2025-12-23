import Stock from '../models/Stock.js';

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
    console.log(stock);

    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= GET STOCK BY TEAM ================= */
export const getStockByTeam = async (req, res) => {
  try {
    const { teamId } = req.params;

    const stock = await Stock.find({ teamId }).populate('teamId', 'teamName');

    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
