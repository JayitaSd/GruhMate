import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import teamRoutes from "./routes/team.js"
// import Stock from "./models/Stock.js";
import stockRoutes from "./routes/stock.js";

dotenv.config();
// dotenv.config({ path: './.env' });


const app = express();
app.use(express.json());

app.use(cors());

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@gruhmate.pzn4wqm.mongodb.net/GruhMate?retryWrites=true&w=majority`
)

  .then(() => console.log(" Connected to MongoDB Atlas"))
  .catch((err) => console.error(" MongoDB connection error:", err));


app.use("/api/auth", authRoutes);
app.use("/api/team", teamRoutes);

// app.use('/api/stocks', Stock);
app.use('/api/stock', stockRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
