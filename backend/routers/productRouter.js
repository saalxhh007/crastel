import express from "express";
import multer from "multer";
import {
  addProduct,
  productList,
  productsSellers,
  removeProduct,
} from "../controllers/productController.js";
const productRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

productRouter.post("/add", upload.single("image"), addProduct);
productRouter.post("/remove", removeProduct);
productRouter.get("/list", productList);
productRouter.get("/best-sellers", productsSellers);

export default productRouter;
