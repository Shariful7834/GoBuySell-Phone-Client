import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../context/AuthProvider";

const AddProducts = () => {
  const [errorSignUp, setErrorSignUp] = useState("");
  const imageHostKey = "048fbcb6a19131be8c7ec5613c2b30bf";
  const { user } = useContext(AuthContext);

  // for private route authentication
  let navigate = useNavigate();
  let location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddProduct = (data) => {
    console.log(data);
    // get image from imagebb setup.>> first see imgbb instruction along with mdn file uploading section
    console.log(data.image[0]);
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        console.log(imgData);
        if (imgData.success) {
          console.log(imgData.data.url);
          const addproducts = {
            email: user?.email,
            product_name: data.Product_name,
            price: data.price,
            condition: data.condition,
            Location: data.Location,
            Phone_category: data.Phone_category,
            Resale_price: data.Resale_price,
            details: data.details,
            image_url: imgData.data.url,
          };
          fetch("https://gobuysellphone-server.vercel.app/addproducts", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(addproducts),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              toast.success(`Product added successfully`);
              navigate("/dashboard/myproducts");
            });
        }
      });
  };

  return (
    <div className="container mx-auto">
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className="h-[880px]  mt-6 ml-20"
      >
        <h2 className="text-4xl font-bold mb-5">Add Second-hand phone</h2>
        <div className="w-[550px] p-7 border-2 rounded-xl shadow-2xl">
          <h2 className="text-2xl text-center">Add Products</h2>
          <form
            className="container mx-auto"
            onSubmit={handleSubmit(handleAddProduct)}
          >
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                {...register("Product_name", {
                  required: "Product Name is required",
                })}
                className="input input-bordered w-full "
              />
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="text"
                {...register("price", {
                  required: "Email Address is required",
                })}
                className="input input-bordered w-full mr-2"
              />
            </div>

            <div className="form-control w-full  ">
              <label className="label">
                <span className="label-text font-semibold">Condition</span>
              </label>
              <select
                {...register("condition")}
                className="select select-bordered w-full mr-2"
              >
                <option defaultValue={`Buyer`}>Excellent</option>
                <option>Good</option>
                <option>Fair</option>
              </select>
            </div>
            <div className="form-control w-full mr-2">
              <label className="label">
                <span className="label-text">Mobile Number</span>
              </label>
              <input
                type="text"
                {...register("Phone_number", {
                  required: "Mobile number is required",
                })}
                className="input input-bordered w-full mr-2"
              />
            </div>
            <div className="form-control w-full mr-2 ">
              <label className="label">
                <span className="label-text font-semibold">Location</span>
              </label>
              <select
                {...register("Location")}
                className="select select-bordered w-full mr-2"
              >
                <option defaultValue={`Buyer`}>Berlin</option>
                <option>Dortmund</option>
                <option>Dusseldorf</option>
                <option>Munich</option>
              </select>
            </div>
            <div className="form-control w-full mr-2 ">
              <label className="label">
                <span className="label-text font-semibold">Phone Category</span>
              </label>
              <select
                {...register("Phone_category")}
                className="select select-bordered w-full mr-2"
              >
                <option defaultValue={`Buyer`}>iPhone</option>
                <option>Samsung</option>
                <option>LG</option>
                <option>Google</option>
                <option>Motorola</option>
                <option>ZTE</option>
              </select>
            </div>
            <div className="form-control w-full mr-2">
              <label className="label">
                <span className="label-text">Resale_price</span>
              </label>
              <input
                type="text"
                {...register("Resale_price", {
                  required: "Product Resale price is required",
                })}
                className="input input-bordered w-full mr-2"
              />
            </div>
            <div className="form-control w-full mr-2">
              <label className="label">
                <span className="label-text">Year of Purchase</span>
              </label>
              <input
                type="text"
                {...register("used_year", {
                  required: "Year of Purchase is required",
                })}
                className="input input-bordered w-full mr-2"
              />
            </div>
            <input
              type="file"
              {...register("image", { required: "Required field" })}
              className="file-input file-input-bordered w-full  mt-3"
            />
            <div className="form-control w-full mr-2">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                type="text"
                {...register("details", {
                  required: "Product Details is required",
                })}
                className="textarea textarea-bordered h-24 w-full mr-2"
              />
            </div>

            <input className="btn btn-accent mt-5 w-full" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
