import React, { useContext, useEffect } from "react";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext.jsx";
import { assets } from "../../assets/assets.js";
const ProductDetails = () => {
  const { id, categoryName } = useParams();
  const { products } = useContext(StoreContext);
  const product = products.find((item) => {
    return item._id === id && item.categorie === categoryName;
  });

  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  if (!product) {
    return <div>Product not found!</div>;
  }
  console.log("cart items", cartItems);
  const itemCount = cartItems[categoryName]?.[id] || 0;
  return (
    <div className="product-detail">
      <div className="product-detail-image">
        <img src={url + "/images/" + product.image} alt={product.item_mark} />
      </div>
      <div className="product-detail-info">
        <h3>{product.price} DA</h3>
        <p>
          {product.mark} {product.description}
        </p>
        <div className="product-counter">
          <img
            src={assets.minus}
            alt="Decrease"
            onClick={() => removeFromCart(categoryName, id)}
          />
          <p>{itemCount}</p>
          <img
            src={assets.add}
            alt="Increase"
            onClick={() => addToCart(categoryName, id)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
