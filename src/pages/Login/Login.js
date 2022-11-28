import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../context/AuthProvider";
import useToken from "../../hooks/useToken";
import { toast } from "react-hot-toast";
import useTitle from "../../hooks/useTitle";

const Login = () => {
  // get user context
  const { userLogIn, googleSignIn } = useContext(AuthContext);
  useTitle("Login");
  // use states
  const [signInError, SetSignInError] = useState("");
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  // get jwt token from hook for security in login page

  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);
  if (token) {
    // navigate(from, { replace: true })
    navigate("/");
  }

  // social media
  const [socialMediaUserEmail, setSocialMediaUserEmail] = useState("");
  const [googleToken] = useToken(socialMediaUserEmail);

  if (googleToken) {
    navigate(from, { replace: true });
  }

  // react form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // login handler
  const handleLogin = (data) => {
    userLogIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setLoginUserEmail(data.email);
        // navigate(from, { replace: true });
        toast.success("Loged In successfully");
      })
      .catch((error) => {
        console.log(error.message);
        SetSignInError(error.message);
      });
    console.log(data);
  };
  const handleGoogle = (userrole, email) => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        // navigate(from, { replace: true });
        userrole = "Buyer";
        email = user?.email;
        // saveUser(user?.displayName, email, userrole);
        setSocialMediaUserEmail(email);
        // navigate("/");
        toast.success("Loged In successfully");
      })
      .catch((error) => console.log(error));
  };

  // const saveUser = (name, email, userrole) => {
  //   const user = { name, email, userrole };
  //   fetch("https://gobuysellphone-server.vercel.app/users", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);

  //       navigate(from, { replace: true });
  //     });
  // };
  return (
    <div className="h-[880px] flex justify-center items-center">
      <div className="w-96 p-7 border-2 rounded-xl shadow-2xl">
        <h2 className="text-2xl text-center">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
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

          <p className="text-red-600 font-semibold">{signInError}</p>
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

export default Login;
