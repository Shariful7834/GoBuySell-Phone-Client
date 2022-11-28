import React from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const AdminPage = () => {
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users?userrole`);
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return (
      <button type="button" className="bg-indigo-500 ..." disabled>
        <svg
          className="animate-spin h-5 w-5 mr-3 ..."
          viewBox="0 0 24 24"
        ></svg>
        Processing...
      </button>
    );
  }
  // make admin for dashboard

  const handleMakeAdmin = (id) => {
    fetch(`http://localhost:5000/users/admin/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Make admin has successful");
          refetch();
        }
      });
  };

  const verifyseller = (id) => {
    fetch(`http://localhost:5000/users/seller/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Seller Verification successfull");
          refetch();
        }
      });
  };

  const deleteHandler = (user) => {
    fetch(`http://localhost:5000/users/${user._id}`, {
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
        } else {
          toast.error("Unable to assign as Seller");
        }
      });
    console.log(user);
  };
  return (
    <div>
      <h1 className="text-2xl text-center mt-10">all users page</h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>User Status</th>
            <th>Admin</th>
            <th>Delete</th>
            <th>Verify</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user._id}>
              <th>{i + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.userrole}</td>
              <td>
                {user.role !== "admin" && (
                  <button
                    onClick={() => handleMakeAdmin(user._id)}
                    className="btn btn-success"
                  >
                    Make Admin
                  </button>
                )}
                {user.role === "admin" && (
                  <span className="text-success font-bold">Admin</span>
                )}
              </td>
              <td>
                <button
                  onClick={() => deleteHandler(user)}
                  className="btn btn-error"
                >
                  Delete
                </button>
              </td>
              <td>
                {user.userrole !== "Seller" && (
                  <button
                    onClick={() => verifyseller(user._id)}
                    className="btn btn-error"
                  >
                    Unverified
                  </button>
                )}
                {user.userrole === "Seller" && (
                  <span className="text-success font-bold">Verified</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
