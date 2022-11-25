import React from "react";
import { Link } from "react-router-dom";
const Categories = ({ category }) => {
  const { id, name, image_url } = category;
  return (
    <div className="hover:bg-zinc-300 p-10">
      <Link to={`/categoryUsed/${id}`}>
        <button className="w-[135px] h-[135px]">
          <span>
            <img className="ml-7" src={image_url} alt="" />
            <h2 className="text-2xl font-semibold text-lime-500	mt-5">{name}</h2>
          </span>
        </button>
      </Link>
    </div>
  );
};

export default Categories;
