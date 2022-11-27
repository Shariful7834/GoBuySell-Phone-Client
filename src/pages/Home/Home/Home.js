import React from "react";
import useTitle from "../../../hooks/useTitle";
import Header from "../../shared/Header/Header";
import Navbar from "../../shared/Navbar/Navbar";
import AdvertisedItems from "../AdvertisedItems/AdvertisedItems";
import ContactSection from "../ContactSection/ContactSection";
import ProductCategories from "../ProductCategories/ProductCategories";

const Home = () => {
  useTitle("Home");
  return (
    <div>
      <Header></Header>
      <AdvertisedItems></AdvertisedItems>
      <ProductCategories></ProductCategories>
      <ContactSection></ContactSection>
    </div>
  );
};

export default Home;
