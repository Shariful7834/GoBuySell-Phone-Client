import { useQuery } from "@tanstack/react-query";
import React from "react";

const AdvertisedItems = () => {
  const {} = useQuery({
    queryKey: ["advertises"],
    queryFn: async () => {
      const res = await fetch("");
      const data = await res.json();
      return data;
    },
  });

  return (
    <div className="container mx-auto">
      <div className=" h-[550px] bg-slate-50 m-auto text-center ">
        <h2 className="text-3xl font-bold my-10">Advertised items</h2>
      </div>
    </div>
  );
};

export default AdvertisedItems;
