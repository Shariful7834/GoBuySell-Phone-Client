import React from "react";
import { useLoaderData } from "react-router-dom";

const CategoryUsed = () => {
  const categoryPhone = useLoaderData();

  return (
    <div>
      <h1 className="text-4xl"> {categoryPhone.length} used category</h1>
    </div>
  );
};

export default CategoryUsed;
