import React, { useContext, useState } from "react";
import "./Favorites.css";
import { StoreContext } from "../../Context/StoreContext";
import Product from "../../components/Product/Product";
const Favorites = () => {
  const { products, url, favoriteItems } = useContext(StoreContext);

  const favoriteProducts = products.filter((product) => {
    const { _id, categorie } = product;
    return favoriteItems[categorie] && favoriteItems[categorie].includes(_id);
  });

  favoriteProducts.forEach((product) => console.log(product));
  return (
    <div className="favorite">
      <h2>Favorites</h2>
      <div className="favorite-container">
        {favoriteProducts.map((product) => (
          <Product
            key={product._id}
            _id={product._id}
            mark={product.mark}
            description={product.description}
            price={product.price}
            image={product.image}
            category={product.categorie}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
