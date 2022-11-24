import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
const SignUp = () => {
  // use states
  const [signUpError, SetSignUpError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignUp = (data) => {
    console.log(data);
  };
  return (
    <div className="h-[880px] flex justify-center items-center">
      <div className="w-96 p-7 border-2 rounded-xl shadow-2xl">
        <h2 className="text-2xl text-center">Login</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: "Email Address is required" })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-600" role="alert">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be longer then 8",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <p className="text-red-600" role="alert">
                {errors.password?.message}
              </p>
            )}
            <label className="label">
              <span className="label-text">Forget password?</span>
            </label>
          </div>
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-semibold">
                Buyer or Seller ?
              </span>
            </label>
            <select
              defaultValue={`buyer`}
              {...register("buyerorseller")}
              className="select select-bordered w-full max-w-xs"
            >
              <option selected>Buyer</option>
              <option>Seller</option>
            </select>
          </div>
          <label className="label">
            <span className="label-text">Forget password?</span>
          </label>

          <p className="text-red-600 font-semibold">{signUpError}</p>
          <input className="btn btn-accent mt-5 w-full" type="submit" />
        </form>

        <p className="mt-3">
          New to Gobuysell site?{" "}
          <Link to="/signup" className="text-secondary">
            Create new account
          </Link>
        </p>
        <div className="divider">OR</div>
        <div>
          <button className="hover:bg-accent-100 btn-outline btn-accent duration-200 shadow space-x-2 rounded-md flex items-center p-2 w-full justify-center">
            <FcGoogle className="text-3xl" />
            <span className="text-black">Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
