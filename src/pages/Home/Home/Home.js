import React from "react";
import Header from "../../shared/Header/Header";
import Navbar from "../../shared/Navbar/Navbar";
import AdvertisedItems from "../AdvertisedItems/AdvertisedItems";
import ProductCategories from "../ProductCategories/ProductCategories";

const Home = () => {
  return (
    <div>
      <Header></Header>
      <AdvertisedItems></AdvertisedItems>
      <ProductCategories></ProductCategories>
    </div>
  );
};

export default Home;
