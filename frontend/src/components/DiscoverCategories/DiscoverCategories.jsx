import React, { useContext } from "react";
import "./DiscoverCategories.css";
import { categorie_list } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const DiscoverCategories = () => {
  const navigate = useNavigate();
  const handleDiscover = (categoryName) => {
    navigate(`/categories/${categoryName}`);
  };

  return (
    <div className="discover-categories" id="discover-categories">
      <h2>Discover Our Categories</h2>
      <div className="discover-categories-cart">
        {categorie_list.map((item, index) => {
          return (
            <div className="discover-categorie-list">
              <div className="discover-img-container">
                <img src={item.categorie_image} alt="" />
              </div>
              <p>{item.categorie_name}</p>
              <button onClick={() => handleDiscover(item.categorie_name)}>
                Discover
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiscoverCategories;
