import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

const addToFavorite = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let favorite = userData.favorite;
    let productData = await productModel.findById(req.body.itemId);

    if (productData) {
      if (!favorite[req.body.itemId]) {
        favorite[req.body.itemId] = 1;
        await userModel.findByIdAndUpdate(req.body.userId, { favorite });
        res.json({ success: true, message: "Added To Favorites" });
      } else {
        res.json({ success: false, message: "Already In Favorites" });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const removeFromFavorite = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let favorite = userData.favorite;

    if (favorite[req.body.itemId] > 0) {
      favorite[req.body.itemId] -= 1;
      await userModel.findByIdAndUpdate(req.body.userId, { favorite });
      res.json({ success: true, message: "Removed From Favorite" });
    } else {
      res.json({ success: false, message: "Failed to Remove From Favorite" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
const fethFavorites = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let favoriteData = await userData.favorite;

    res.json({ success: true, favoriteData });
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: "Error" });
  }
};

export { addToFavorite, removeFromFavorite, fethFavorites };
