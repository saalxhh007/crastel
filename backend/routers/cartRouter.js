import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  addToCart,
  checkout,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.get("/get", authMiddleware, getCart);
cartRouter.get("/checkout", authMiddleware, checkout);

export default cartRouter;
