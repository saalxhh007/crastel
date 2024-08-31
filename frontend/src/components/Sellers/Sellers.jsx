import React, { useContext } from "react";
import "./Sellers.css";
import Product from "../Product/Product";
import { StoreContext } from "../../Context/StoreContext";

const Sellers = () => {
  const { products } = useContext(StoreContext);

  const topSellers = products.sort((a, b) => b.sales - a.sales).slice(0, 5);

  return (
    <div className="sellers">
      <h2>Best Sellers</h2>
      <div className="sellers-container">
        {topSellers.map((item) => (
          <Product
            key={item._id}
            _id={item._id}
            mark={item.mark}
            description={item.description}
            price={item.price}
            image={item.image}
            category={item.categorie}
          />
        ))}
      </div>
    </div>
  );
};

export default Sellers;
