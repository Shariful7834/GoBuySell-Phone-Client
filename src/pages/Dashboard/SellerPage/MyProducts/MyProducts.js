import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import LoadingRipple from "../../../../components/LoadingRipple/LoadingRipple";
import { AuthContext } from "../../../../context/AuthProvider";
import ConfirmationModal from "../../../shared/ConfirmationModal/ConfirmationModal";

const MyProducts = () => {
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [products, setMyProducts] = useState([]);

  const { user } = useContext(AuthContext);
  const {
    data: myproducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myproducts", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/myproducts?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <LoadingRipple></LoadingRipple>;
  }
  const closeModal = () => {
    setDeletingProduct(null);
  };
  const deleteHandler = (product) => {
    fetch(`http://localhost:5000/manageproducts/${product._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Deleted successful");
          refetch();
        }
      });
    console.log(product);
  };

  // Update
  const handleUpdate = (product) => {
    fetch(`http://localhost:5000/manageproducts/${product._id}`, {
      method: "PATCH",
      Headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ status: "Sold" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // const proceed = window.confirm('Product Updated Successfully')
        toast.success("Product Updated Successfully");
        if (data.modifiedCount > 0) {
          const remaining = myproducts.filter(
            (product) => product._id !== product.id
          );
          const approving = myproducts.find(
            (product) => product._id === product.id
          );
          approving.status = "Sold";
          const newProducts = [approving, ...remaining];
          setMyProducts(newProducts);
        }
      })
      .catch((error) => console.error(error));
  };

  /// advertisement handler

  const handleAdvertise = () => {};

  return (
    <div>
      <h1 className="text-2xl font-bold"> My Products</h1>
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
              <th>Status</th>
              <th>Action</th>
              <th>Advertise</th>
            </tr>
          </thead>
          <tbody>
            {myproducts.map((product, i) => (
              <tr key={product._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={product.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold">{product.product_name}</div>
                </td>
                <td>{product.price}</td>

                <th>
                  <button
                    onClick={() => handleUpdate(product)}
                    className="btn btn-accent btn-xs"
                  >
                    {product.status ? product.status : "Available"}
                  </button>
                </th>
                <th>
                  <label
                    htmlFor="ConfirmationModal"
                    onClick={() => setDeletingProduct(product)}
                    className="btn btn-error btn-xs"
                  >
                    Delete
                  </label>
                </th>
                <th>
                  <label
                    htmlFor="ConfirmationModal"
                    className="btn btn-success btn-xs"
                    onClick={handleAdvertise}
                  >
                    Advertise
                  </label>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingProduct && (
        <ConfirmationModal
          title={`Do you want to delete?`}
          message={`if you delete, ${deletingProduct.product_name}  you cannot be able to undone`}
          closeModal={closeModal}
          successAction={deleteHandler}
          modalData={deletingProduct}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default MyProducts;
