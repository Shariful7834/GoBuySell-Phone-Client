import React from "react";
import { Link } from "react-router-dom";

const CategoryPhone = ({ category }) => {
  const {
    image_url,
    Product_name,
    Condition,
    Original_price,
    Location,
    Resale_price,
    Seller_Name,
    used_year,
    Posted_Date,
    details,
  } = category;

  


  return (
    <div
      data-aos="zoom-out-up"
      data-aos-duration="1500"
      className="card card-compact  bg-base-100 shadow-xl hover:scale-[1.02] duration-200 p-10"
    >
      <figure className=" w-[300px] h-[300px] py-2 mx-auto">
        <img src={image_url} alt="Phones" />
      </figure>
      <div className="card-body ">
        <h2 className="text-2xl font-semibold">{Product_name}</h2>
        <div className="space-y-0">
          <p className="text-lg font-semibold">Condition: {Condition}</p>
          <p className="text-lg font-semibold">
            Original_Price: ${Original_price}
          </p>
          <p className="text-lg font-semibold">Location: {Location}</p>
          <p className="text-lg font-semibold">Resale_Price: ${Resale_price}</p>
          <p className="text-lg font-semibold">Seller Name: {Seller_Name}</p>
          <p className="text-lg font-semibold">
            Total years of use: {used_year}
          </p>
          <p className="text-lg font-semibold">Posted_Date: {Posted_Date}</p>
        </div>
        <p className="text-base text-gray-500">
          {details?.length > 90 ? details.slice(0, 90) + "..." : details}
        </p>
        <Link className="btn btn-secondary text-white">Book Now</Link>
      </div>
    </div>
  );
};
export default CategoryPhone;
