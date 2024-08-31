import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  image: { type: String, required: true },
  mark: { type: String, required: true },
  categorie: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  caracteristique: { type: mongoose.Schema.Types.Mixed, required: true },
  sales: { type: Number, default: 0 },
});

const productModel =
  mongoose.model("product", productSchema) || mongoose.models.product;

export default productModel;
