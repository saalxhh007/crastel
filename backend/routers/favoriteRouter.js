import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  addToFavorite,
  removeFromFavorite,
  fethFavorites,
} from "../controllers/favoriteController.js";

const favoriteRouter = express.Router();

favoriteRouter.post("/add", authMiddleware, addToFavorite);
favoriteRouter.post("/remove", authMiddleware, removeFromFavorite);
favoriteRouter.get("/list", authMiddleware, fethFavorites);

export default favoriteRouter;
