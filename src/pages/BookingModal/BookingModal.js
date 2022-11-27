import React from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";
import toast from "react-hot-toast";

const BookingModal = ({ productInfo, SetProductInfo }) => {
  const { user } = useContext(AuthContext);
  const { Product_name, Resale_price, image_url } = productInfo;

  console.log();

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const price = form.price.value;
    const phoneName = form.phone.value;
    const location = form.location.value;
    console.log(name, price, phoneName, location);

    const buyerBookingItem = {
      Product_name,
      name: user?.displayName,
      image_url,
      price: price,
      email: user?.email,
    };
    console.log(buyerBookingItem);

    fetch("http://localhost:5000/buyerBookingItems", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(buyerBookingItem),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success("Your order has placed successfully");
        } else {
          toast.error(data.message);
        }
      });

    SetProductInfo(null);
    console.log(buyerBookingItem);
  };
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{Product_name}</h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-4 mt-10"
          >
            <input
              type="text"
              defaultValue={user?.displayName}
              disabled
              placeholder="Full Name"
              name="name"
              className="input input-bordered w-full "
            />

            <input
              type="email"
              placeholder="Email"
              defaultValue={user?.email}
              disabled
              name="email"
              className="input input-bordered w-full "
            />
            <input
              type="text"
              placeholder="Price"
              defaultValue={Resale_price}
              disabled
              name="price"
              className="input input-bordered w-full "
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              className="input input-bordered w-full "
            />
            <input
              type="text"
              placeholder="Meeting locatioin"
              name="location"
              className="input input-bordered w-full "
            />
            <input className="btn btn-accent w-full" type="Submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
