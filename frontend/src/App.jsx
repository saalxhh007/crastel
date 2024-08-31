import { useContext, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import Category from "./pages/Category/Category.jsx";
import ProductDetails from "./pages/ProductDetails/ProductDetails.jsx";
import LoginPopup from "./pages/LoginPopup/LoginPopup.jsx";
import MyOrders from "./pages/MyOrders/MyOrders.jsx";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <ToastContainer />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:categoryName" element={<Category />} />
          <Route
            path="/product/:categoryName/:id"
            element={<ProductDetails />}
          />
          <Route path="/favorite" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
