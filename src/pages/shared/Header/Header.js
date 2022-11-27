import React from "react";
import Navbar from "../Navbar/Navbar";

const Header = () => {
  return (
    <div>
      <div
        className="hero h-[880px] w-full "
        style={{
          backgroundImage: `url("https://cdn.shopify.com/s/files/1/0470/7719/5935/files/arnel-hasanovic-4oWSXdeAS2g-unsplash.jpg?v=1664189022&width=3000")`,
        }}
      >
        <div className="hero-overlay bg-opacity-30"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-7xl font-bold text-yellow-300">
              Used Phones <br /> For Everyone
            </h1>
            <p className="mb-5">
              Would you like to buy used electronics to protect your wallet and
              the environment? At Janado you are at the right address! We are
              your shop for used tablets, refurbished smartphones or second-hand
              Apple Watch.
            </p>

            <button className="btn bg-warning w-36 border-0">
              <a className=" font-semibold" href="#category">
                Buy now
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
