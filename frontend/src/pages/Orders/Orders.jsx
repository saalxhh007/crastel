import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
const Orders = () => {
  const { getTotalAmount, products, url, token, cartItems } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandller = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    products.forEach((product) => {
      const categoryItems = cartItems[product.categorie];
      if (categoryItems) {
        Object.entries(categoryItems).forEach(([id, quantity]) => {
          if (quantity > 0) {
            let productInfo = { ...product };
            productInfo["quantity"] = quantity;
            orderItems.push(productInfo);
          }
        });
      } else {
        console.log(
          `No items found in cart for category: ${product.categorie}`
        );
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalAmount() + 2,
    };

    try {
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });

      if (response.data.success) {
        navigate("/myorders");
      }
    } catch (error) {
      navigate("/");
      console.error(error);
    }
  };

  return (
    <form className="orders" onSubmit={placeOrder}>
      <div className="orders-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            onChange={onChangeHandller}
            value={data.firstName}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            onChange={onChangeHandller}
            value={data.lastName}
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            name="commune"
            placeholder="Commune"
            onChange={onChangeHandller}
            value={data.commune}
          />
          <input
            type="text"
            name="wilaya"
            placeholder="Wilaya"
            onChange={onChangeHandller}
            value={data.wilaya}
          />
        </div>
        <input
          type="text"
          name="street"
          placeholder="Street"
          onChange={onChangeHandller}
          value={data.street}
        />
        <div className="multi-fields">
          <input
            type="text"
            name="zipcode"
            placeholder="Zip Code"
            onChange={onChangeHandller}
            value={data.zipcode}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            onChange={onChangeHandller}
            value={data.country}
          />
        </div>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={onChangeHandller}
          value={data.phone}
        />
      </div>
      <div className="orders-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalAmount() === 0 ? 0 : getTotalAmount()} DA</p>
              <hr />
            </div>
            <div className="cart-total-details">
              <p>Delivery</p>
              <p>{getTotalAmount() === 0 ? 0 : 2} </p>
              <hr />
            </div>
            <div className="cart-total-details">
              <p>Total</p>
              <p>{getTotalAmount() === 0 ? 0 : getTotalAmount() + 2} DA</p>
              <hr />
            </div>
            <button type="submit">Checkout</button>
          </div>
        </div>
      </div>
    </form>
  );
};
import "./Orders.css";
export default Orders;
