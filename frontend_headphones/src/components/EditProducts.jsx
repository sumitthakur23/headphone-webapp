import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProducts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  // If no product is passed, handle gracefully
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-800">No product selected for editing.</p>
        <Link to="/adminproducts">
          <button className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-md">
            Go Back
          </button>
        </Link>
      </div>
    );
  }

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [loading, setLoading] = useState(false);

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (!token) {
        throw new Error("Authentication token is missing.");
      }

      const response = await fetch(
        `http://localhost:5000/api/v1/products/product/${product._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
          body: JSON.stringify({
            name,
            price,
            description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the product.");
      }

      const data = await response.json();
      console.log("Updated Product:", data);

      toast.success("Product updated successfully!");
      navigate("/adminproducts"); // Navigate back to AdminProducts after success
    } catch (error) {
      toast.error(error.message || "Failed to update the product.");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Product
        </h1>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-gray-700 font-medium">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Price (₹)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleSaveChanges}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <Link to="/adminproducts">
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
                disabled={loading}
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProducts;
