import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingCircle from "../../../components/LoadingCircle";
import Categories from "./Categories";

const ProductCategories = () => {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/categories");
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <LoadingCircle></LoadingCircle>;
  }
  return (
    <div className="w-full">
      <div className="container mx-auto text-center mt-5">
        <h2 className="text-4xl font-bold my-20 text-green-300">
          Search or select a brand category
        </h2>
        <div className="divider"></div>
        <div
          id="category"
          className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-2"
        >
          {categories.map((category) => (
            <Categories key={category._id} category={category}></Categories>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
