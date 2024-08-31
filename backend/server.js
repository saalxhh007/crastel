import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import cartRouter from "./routers/cartRouter.js";
import orderRouter from "./routers/orderRouter.js";
import favoriteRouter from "./routers/favoriteRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Connect To DB
connectDB();

// Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/favorite", favoriteRouter);
app.use("/api/order", orderRouter);
app.use("/images", express.static("uploads"));

// Listening
app.get("/", (req, res) => {
  res.send("working");
});

app.listen(PORT, () => {
  console.log(`Listening On Port ${PORT}`);
});
