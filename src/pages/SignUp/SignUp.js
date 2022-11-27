import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";
import useToken from "../../hooks/useToken";
import useTitle from "../../hooks/useTitle";

const SignUp = () => {
  const { createUser, googleSignIn, updateUserProfile } =
    useContext(AuthContext);
  // use states
  const [errorSignUp, setErrorSignUp] = useState("");
  // for private route onluy
  // for private route authentication
  useTitle("SignUp");
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // calling jwt token in signup form
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEmail);

  if (token) {
    navigate(from, { replace: true });
    //navigate("/");
  }

  // signup function
  const handleSignUp = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Successfully User Created");
        const userInfo = {
          displayName: data.name,
        };
        updateUserProfile(userInfo)
          .then((result) => {
            saveUser(data.name, data.email, data.userrole);
          })
          .catch((error) => {
            console.log(error.message);
            setErrorSignUp(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
        setErrorSignUp(error.message);
      });
    // console.log(data);
  };

  const handleGoogle = (userrole, email) => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        // navigate(from, { replace: true });
        userrole = "Buyer";
        email = user?.email;
        saveUser(user?.displayName, email, userrole);
        navigate("/");
        toast.success("Loged In successfully");
      })
      .catch((error) => console.log(error));
  };

  const saveUser = (name, email, userrole) => {
    const user = { name, email, userrole };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCreatedUserEmail(email);
        navigate(from, { replace: true });
      });
  };

  return (
    <div className="h-[880px] flex justify-center items-center">
      <div className="w-96 p-7 border-2 rounded-xl shadow-2xl">
        <h2 className="text-2xl text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-600" role="alert">
                {errors.name?.message}
              </p>
            )}
          </div>
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
          </div>
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-semibold">
                Buyer or Seller ?
              </span>
            </label>
            <select
              {...register("userrole")}
              className="select select-bordered w-full max-w-xs"
            >
              <option defaultValue={`Buyer`}>Buyer</option>
              <option>Seller</option>
            </select>
          </div>
          <label className="label">
            <span className="label-text">Forget password?</span>
          </label>

          <p className="text-red-600 font-semibold">{errorSignUp}</p>
          <input className="btn btn-accent mt-5 w-full" type="submit" />
        </form>

        <p className="mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-secondary">
            Log in
          </Link>
        </p>
        <div className="divider">OR</div>
        <div>
          <button
            onClick={handleGoogle}
            className="hover:bg-accent-100 btn-outline btn-accent duration-200 shadow space-x-2 rounded-md flex items-center p-2 w-full justify-center"
          >
            <FcGoogle className="text-3xl" />
            <span className="text-black">Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
