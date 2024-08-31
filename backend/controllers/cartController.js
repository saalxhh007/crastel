import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
// Add To Cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    let productData = await productModel.findById(req.body.itemId);

    if (productData) {
      if (!cartData[req.body.itemId]) {
        cartData[req.body.itemId] = 1;
      } else {
        cartData[req.body.itemId] += 1;
      }
      await userModel.findByIdAndUpdate(req.body.userId, { cartData });
      res.json({ success: true, message: "Added To Cart" });
    } else {
      res.json({ success: false, message: "Error" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove From Cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Fetch Cart
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {}
};

const checkout = async (req, res) => {
  const { cartItems } = req.body;
  try {
    for (const [category, items] of Object.entries(cartItems)) {
      for (const [itemId, quantity] of Object.entries(items)) {
        await productModel.findByIdAndUpdate(itemId, {
          $inc: { sales: quantity },
        });
      }
    }
    res.json({ success: true, message: "Checkout" });
  } catch (error) {}
};
export { addToCart, removeFromCart, getCart, checkout };
