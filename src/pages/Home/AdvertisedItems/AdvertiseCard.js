import React from "react";
import { Link } from "react-router-dom";

const AdvertiseCard = ({ ads, SetProductInfo }) => {
  const {
    image_url,
    product_name,
    Resale_price,
    condition,
    Location,

    price,
  } = ads;
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl p-2 rounded">
      <figure>
        <img className="rounded" src={image_url} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-3xl">{product_name}</h2>

        <div className="card-actions flex justify-between justify-end">
          <div>
            <p className="text-xl text-left text-black-600  ">
              Original_price: ${price}
            </p>
            <p className="text-xl text-left text-black-600 ">
              Resale_Price ${Resale_price}
            </p>
            <p className="text-xl text-left text-black-600  ">
              Location: {Location}
            </p>
            <p className="text-xl text-left text-black-600  ">
              condition: {condition}
            </p>
          </div>

          <label
            htmlFor="booking-modal"
            onClick={() => SetProductInfo(ads)}
            className="btn btn-accent  text-white mt-16"
          >
            Purchase
          </label>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseCard;
