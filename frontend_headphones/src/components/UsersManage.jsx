import React, { useState, useEffect } from "react";

const UsersManage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/users/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        console.log(response)
        const data = await response.json();
        console.log(data)
        setUsers(data); // Assuming the response returns an array of users
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle user deletion
  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/users/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      const data = await response.json();
      // If successful, filter the deleted user out of the list
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      alert(data.message); // Show success message from API
    } catch (error) {
      alert(error.message); // Show error message from API
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-100 min-h-screen">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600">Loading users...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-100 min-h-screen">
        <div className="container mx-auto px-6 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Manage Users</h1>
          <p className="text-gray-600">View and manage user accounts below.</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {users.length === 0 ? (
            <p className="text-center text-gray-600">No users available.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Phone</th>
                  <th className="border border-gray-300 px-4 py-2">Role</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">{user._id}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.firstName} {user.lastName}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
};

export default UsersManage;
