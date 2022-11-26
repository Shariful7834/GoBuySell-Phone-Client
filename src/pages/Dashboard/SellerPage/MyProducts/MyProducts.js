import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingRipple from "../../../../components/LoadingRipple/LoadingRipple";

const MyProducts = () => {
  const { data: myproducts = [], isLoading } = useQuery({
    queryKey: ["myproducts"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/myproducts");
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <LoadingRipple></LoadingRipple>;
  }

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
                  <label
                    htmlFor="ConfirmationModal"
                    className="btn btn-accent btn-xs"
                  >
                    Available
                  </label>
                </th>
                <th>
                  <label
                    htmlFor="ConfirmationModal"
                    className="btn btn-error btn-xs"
                  >
                    Delete
                  </label>
                </th>
                <th>
                  <label
                    htmlFor="ConfirmationModal"
                    className="btn btn-success btn-xs"
                  >
                    Advertise
                  </label>
                </th>
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

export default MyProducts;
