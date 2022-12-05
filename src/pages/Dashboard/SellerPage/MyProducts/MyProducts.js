import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import LoadingRipple from "../../../../components/LoadingRipple/LoadingRipple";
import { AuthContext } from "../../../../context/AuthProvider";
import ConfirmationModal from "../../../shared/ConfirmationModal/ConfirmationModal";

const MyProducts = () => {
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [products, setMyProducts] = useState([]);
  const [advertisements, setAdvertisements] = useState([]);
  const {
    product_name,
    image_url,
    Resale_price,
    condition,
    Location,
    details,
    price,
  } = advertisements;
  // console.log(product_name, condition, details);
  const { user } = useContext(AuthContext);
  const {
    data: myproducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myproducts", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://gobuysellphone-server.vercel.app/myproducts?email=${user?.email}`
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
    fetch(
      `https://gobuysellphone-server.vercel.app/manageproducts/${product._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
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
    fetch(
      `https://gobuysellphone-server.vercel.app/manageproducts/${product._id}`,
      {
        method: "PATCH",
        Headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ verify: "Sold" }),
      }
    )
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

  const handleAdvertise = () => {
    const advertisements = {
      product_name,
      image_url,
      condition,
      Resale_price,
      Location,
      price,
    };

    fetch("https://gobuysellphone-server.vercel.app/advertisements", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(advertisements),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

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
                          src={product.image_url}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold">{product.product_name}</div>
                </td>
                <td>{product.Resale_price}</td>

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
                {!product.advertisement && (
                  <th>
                    <label
                      htmlFor="ConfirmationModal"
                      className="btn btn-success btn-xs"
                      onClick={() => setAdvertisements(product)}
                    >
                      Post Ads
                    </label>
                  </th>
                )}
                {product.advertisement && (
                  <span className="text-green-600 font-bold" disabled>
                    Already Posted
                  </span>
                )}
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
          ActionBtn={`Delete`}
          modalData={deletingProduct}
        ></ConfirmationModal>
      )}

      {advertisements && (
        <ConfirmationModal
          title={`Do you want to advertise this product?`}
          message={`if you Confirm, ${advertisements.product_name}  will be display on home page`}
          closeModal={closeModal}
          successAction={handleAdvertise}
          modalData={advertisements}
          ActionBtn={`Advertise`}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default MyProducts;
