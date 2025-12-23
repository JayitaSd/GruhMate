import express from 'express';
import { addStock, getStockByTeam } from "../controller/stockController.js"

const router = express.Router();

// Add new stock
router.post('/', addStock);

// Get stock by team
router.get('/team/:teamId', getStockByTeam);


export default router;
