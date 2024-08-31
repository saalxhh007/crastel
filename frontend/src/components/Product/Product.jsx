import React, { useContext, useEffect } from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "./../../assets/assets.js";
const Product = ({ _id, description, price, mark, image, category }) => {
  const { url, favoriteItems, addToFavorite, removeFromFavorite } =
    useContext(StoreContext);
  const isFavorite =
    favoriteItems[category] && favoriteItems[category].includes(_id);

  const handlleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorite(category, _id);
    } else {
      addToFavorite(category, _id);
    }
  };
  return (
    <div className="product" key={_id}>
      <img
        className={`favorite-img ${isFavorite ? "active" : ""}`}
        src={assets.heart}
        alt="heart"
        onClick={handlleFavoriteClick}
      />
      <Link to={`/product/${category}/${_id}`}>
        <div className="product-img-contain">
          <img
            src={url + "/images/" + image}
            alt={description}
            className="product-image"
          />
        </div>
      </Link>
      <div className="product-info">
        <h3 className="mark">{mark}</h3>
        <p className="desc">{description}</p>
        <h3 className="price">{price} DA</h3>
      </div>
      <Link to="/cart">
        <button>Add To Cart</button>
      </Link>
    </div>
  );
};

export default Product;
