import React from "react";
import Header from "./../../components/Header/Header.jsx";
import DiscoverCategories from "../../components/DiscoverCategories/DiscoverCategories.jsx";
import Details from "../../components/Details/Details.jsx";
import Sellers from "../../components/Sellers/Sellers.jsx";
import Latest from "../../components/Latest/Latest.jsx";
const Home = () => {
  return (
    <div className="home">
      <Header />
      <Details />
      <DiscoverCategories />
      <Sellers />
    </div>
  );
};

export default Home;
