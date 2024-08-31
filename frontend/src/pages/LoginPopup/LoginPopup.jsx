import React, { useState, useEffect, useRef, useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { url, setToken } = useContext(StoreContext);
  const popupRef = useRef();

  const onChangeHandller = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);
    console.log(response.data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };
  useEffect(() => {
    document.body.classList.add("no-scroll");
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowLogin(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowLogin]);

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} ref={popupRef} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross}
            alt="cross"
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" ? (
            <input
              onChange={onChangeHandller}
              type="text"
              name="name"
              value={data.name}
              placeholder="Your Name"
              required
            />
          ) : null}
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChangeHandller}
            placeholder="Your Email"
            required
          />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={onChangeHandller}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create New Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>I Agree To All The Terms Of Use & Privacy Terms</p>
        </div>
        {currState === "Sign Up" ? (
          <p>
            Already Have An Account{" "}
            <span onClick={() => setCurrState("Login")}>Log In Here</span>
          </p>
        ) : (
          <p>
            Create A New Account{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
