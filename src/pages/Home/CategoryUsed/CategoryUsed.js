import React from "react";
import { useLoaderData } from "react-router-dom";
import CategoryPhone from "./CategoryPhone";
import { useState } from "react";
import LoadingCircle from "../../../components/LoadingCircle";

const CategoryUsed = () => {
  const categoryPhones = useLoaderData();
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <LoadingCircle></LoadingCircle>;
  }

  return (
    <div className="container mx-auto mt-8 min-h-full">
      <h1 className="text-4xl text-center mb-10">
        {" "}
        {categoryPhones.length} Book the selected second-hand phones
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
        {categoryPhones.map((category) => (
          <CategoryPhone key={category._id} category={category}></CategoryPhone>
        ))}
      </div>
    </div>
  );
};

export default CategoryUsed;
