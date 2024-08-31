import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, getTotalAmount, products, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const getProductById = (category, id) => {
    return products.find(
      (product) => product._id === id && product.categorie === category
    );
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {Object.keys(cartItems).map((category) =>
          Object.entries(cartItems[category]).map(([itemId, quantity]) => {
            const product = getProductById(category, itemId);

            if (!product) {
              return null;
            }
            return (
              <div key={itemId} className="cart-items-item cart-items-title">
                <img
                  src={url + "/images/" + product.image}
                  alt={product.mark}
                />
                <p>{product.mark}</p>
                <p>{product.price} DA</p>
                <p>{quantity}</p>
                <p>{product.price * quantity} DA</p>
                <button
                  className="remove"
                  onClick={() => removeFromCart(category, itemId)}
                >
                  Remove
                </button>
              </div>
            );
          })
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalAmount() === 0 ? 0 : getTotalAmount()} DA</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery</p>
              <p>{getTotalAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{getTotalAmount() === 0 ? 0 : getTotalAmount() + 2}</b>
            </div>
            <hr />
          </div>
          <button
            onClick={
              getTotalAmount() === 0
                ? () => navigate("/cart")
                : () => navigate("/orders")
            }
          >
            CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Enter Promo Code</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo Code" />
              <button type="submit">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
