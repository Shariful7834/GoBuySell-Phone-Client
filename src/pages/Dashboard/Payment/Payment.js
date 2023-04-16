import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import LoadingRipple from "../../../components/LoadingRipple/LoadingRipple";

const stripePromise = loadStripe(
  "pk_test_51M6E5VCbXdZ89woGHMv32Uy3sBLIv0HeQgYJM0C1Y8W4MXRH0DIndNtm7OsWS8gnCojbh44AxNTt3kLj754xLRYh00J9VGu3bs"
);

const Payment = () => {
  const orders = useLoaderData();
  const navigation = useNavigation();
  const { product_name, price, image_url } = orders;
  if (navigation.state === "loading") {
    return <LoadingRipple></LoadingRipple>;
  }

  return (
    <div className="mx-auto p-5 space-y-5 mt-10">
      <div className="card w-96 md:w-[600px] bg-base-100 shadow-xl">
        <div className="p-8 flex justify-between">
          <div>
            <h2 className="card-title text-2xl">Pay for the {product_name}</h2>

            <p>
              <span className="font-semibold">Total cost:</span> ${price}
            </p>
          </div>
          <img className="w-32 " src={image_url} alt="Img" />
        </div>
      </div>
      <div className="card w-96 md:w-[600px] bg-base-100 shadow-xl">
        <div className="p-8 ">
          <Elements stripe={stripePromise}>
            <CheckoutForm orders={orders} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
