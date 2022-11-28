import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import LoadingRipple from "../../../components/LoadingRipple/LoadingRipple";
import BookingModal from "../../BookingModal/BookingModal";
import AdvertiseCard from "./AdvertiseCard";

const AdvertisedItems = () => {
  const [productInfo, SetProductInfo] = useState(null);
  const { data: advertisements = [], isLoading } = useQuery({
    queryKey: ["advertises"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/advertisements");
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <LoadingRipple></LoadingRipple>;
  }
  return (
    <div className="container mx-auto">
      <div className=" bg-slate-50 m-auto text-center ">
        <div className="mb-5">
          <div className="text-center">
            <p className=" text-2xl font-bold text-warning pt-6">
              Phone to sell
            </p>
            <h2 className="text-5xl font-bold my-5"> Advertisement Area</h2>
            <p className="w-1/2 mx-auto">
              Best used phones for sell with good, excellent conditions. Recent
              added this advertisement post for sell the phone.
            </p>
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5">
            {advertisements.map((ads) => (
              <AdvertiseCard
                key={ads._id}
                ads={ads}
                SetProductInfo={SetProductInfo}
              ></AdvertiseCard>
            ))}
          </div>
        </div>
      </div>
      {productInfo && (
        <BookingModal
          productInfo={productInfo}
          SetProductInfo={SetProductInfo}
        ></BookingModal>
      )}
    </div>
  );
};

export default AdvertisedItems;
