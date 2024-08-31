import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <ul>
            <li>CRASTEL</li>
            <li>0176351750</li>
            <li>crastel24@gmail.com</li>
          </ul>
          <div className="social-media">
            <img src={assets.facebook} alt="" />
            <img src={assets.instagram} alt="" />
            <img src={assets.linkedin} alt="" />
          </div>
        </div>
        <div className="footer-center">
          <ul>
            <li>About Us</li>
            <li>Services</li>
            <li>Contact Us</li>
            <li>Favorites</li>
          </ul>
        </div>
        <div className="footer-right">
          <b>Enter Your Email For All New Products</b>
          <input type="email" placeholder="Enter Your Email Here ..." />
        </div>
      </div>
    </div>
  );
};

export default Footer;
