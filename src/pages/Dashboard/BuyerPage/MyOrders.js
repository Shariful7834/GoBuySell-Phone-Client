import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import LoadingRipple from "../../../components/LoadingRipple/LoadingRipple";
import { AuthContext } from "../../../context/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["buyerorders", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/buyerorders?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <LoadingRipple></LoadingRipple>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold"> Your Orders</h1>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Phone Image</th>
              <th>Phone Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={order._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={order.image_url}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {" "}
                  <div className="font-bold">{order.product_name}</div>
                </td>
                <td>{order.price}</td>

                <td>
                  {order.price && !order.paid && (
                    <Link to={`/dashboard/payment/${order._id}`}>
                      <button className="btn btn-accent">Pay</button>
                    </Link>
                  )}
                  {order.price && order.paid && (
                    <span className="text-green-600 font-bold">Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* {deletingDoctor && (
        <ConfirmationModal
          title={`Do you want to delete?`}
          message={`if you delete, ${deletingDoctor.name}  you cannot be able to undone`}
          closeModal={closeModal}
          successAction={deleteHandler}
          modalData={deletingDoctor}
        ></ConfirmationModal>
      )} */}
    </div>
  );
};

export default MyOrders;
