import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const { token, setToken, products, url } = useContext(StoreContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleSearch = () => {
    const filteredSearch = products.filter((product) =>
      product.mark.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(filteredSearch);
  };
  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={assets.logo} alt="Logo" />
      </Link>
      <ul className="navbar-menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="#discover-categories">Categories</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <div className={`navbar-right ${isMenuOpen ? "open" : ""}`}>
        <div className="icons">
          <Link to="/cart">
            <div className="icon">
              <img src={assets.shopping_cart} alt="Cart" />
              {isMenuOpen ? <span>Cart</span> : null}
            </div>
          </Link>
          <Link to="/favorite">
            <div className="icon">
              <img src={assets.heart} alt="Favorites" />
              {isMenuOpen ? <span>Favorites</span> : null}
            </div>
          </Link>
          <div className="icon search">
            <img
              src={assets.search}
              alt="Search"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />

            {isSearchOpen ? (
              <div className="search-dropdown">
                <input
                  type="text"
                  placeholder="Search ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <div className="dropdown">
                  {products
                    .filter((item) => {
                      const searchItem = searchQuery.toLowerCase();
                      const mark = item.mark.toLowerCase();

                      return searchQuery && mark.startsWith(searchItem);
                    })
                    .map((item) => (
                      <div className="dropdown-row">
                        <Link
                          to={`/product/laptops/${item._id}`}
                          className="row"
                        >
                          <img src={url + "/images/" + item.image} alt="" />
                          <span>{item.mark}</span>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={`navbar-search ${isMenuOpen ? "open" : ""}`}></div>
        <div className="navbar-profile">
          {token ? (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="Profile" />
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate("/myorders")}>
                  <img src={assets.shopping_cart} alt="Orders" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="Logout" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setShowLogin(true);
              }}
            >
              Sign In / Login
            </button>
          )}
        </div>
      </div>
      <button
        className="menu-toggle"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <img src={assets.menu} alt="Menu" />
      </button>
    </div>
  );
};

export default Navbar;
