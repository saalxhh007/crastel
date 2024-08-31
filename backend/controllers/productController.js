import productModel from "../models/productModel.js";
import fs from "fs";

// Add Product
const addProduct = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const product = new productModel({
    mark: req.body.mark,
    categorie: req.body.categorie,
    price: req.body.price,
    description: req.body.description,
    caracteristique: req.body.caracteristique,
    image: image_filename,
  });
  try {
    await product.save();
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove Product
const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id);
    fs.unlink(`uploads/${product.image}`, () => {});
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Get All Products
const productList = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Get Best Sellers
const productsSellers = async (req, res) => {
  try {
    const bestSellers = await productModel.find().sort({ sales: -1 }).limit(10);
    res.json({ success: true, data: bestSellers });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};
export { addProduct, removeProduct, productList, productsSellers };
