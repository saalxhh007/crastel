import React, { useContext, useEffect } from "react";
import "./Category.css";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext.jsx";
import Product from "../../components/Product/Product.jsx";
const Category = () => {
  const { categoryName } = useParams();
  const { products } = useContext(StoreContext);
  const getCategoryItems = () => {
    switch (categoryName) {
      case "laptops":
        return products.filter((product) => product.categorie === "laptops");
        break;

      case "smartphones":
        return products.filter(
          (product) => product.categorie === "smartphones"
        );
        break;

      case "accessoires":
        return products.filter((product) => product.categorie === "accesoires");
        break;

      default:
        return [];
        break;
    }
  };

  const items = getCategoryItems();

  return (
    <div className="category">
      <h2></h2>
      <div className="category-container">
        {items.map((item) => {
          return (
            <Product
              key={item._id}
              _id={item._id}
              mark={item.mark}
              description={item.description}
              price={item.price}
              image={item.image}
              category={item.categorie}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Category;
