import React from "react";
import "./Details.css";
import { assets } from "../../assets/assets";
const Details = () => {
  return (
    <div className="details">
      <div className="details-content">
        <div className="col">
          <img src={assets.cargo_truck} alt="" />
          <p>Delivery Available For 58 Wilayas</p>
        </div>
        <div className="col">
          <img src={assets.mouse} alt="" />
          <p>A Free Mouse With Any PC</p>
        </div>
        <div className="col">
          <img src={assets.cash} alt="" />
          <p>Cash On Delivery Available</p>
        </div>
      </div>
    </div>
  );
};
export default Details;
