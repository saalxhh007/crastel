import React from "react";
import "./Latest.css";
import Product from "../Product/Product";
import { items_list } from "../../assets/assets";
const Latest = () => {
  return (
    <div className="latest">
      <h2>Latest Upadates</h2>
      <div className="latest-container">
        {items_list.map((item) => {
          return (
            <Product
              key={item.id}
              id={item.id}
              item_mark={item.item_mark}
              item_description={item.item_description}
              item_price={item.item_price}
              item_image={item.item_image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Latest;
