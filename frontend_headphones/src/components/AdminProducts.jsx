import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import product1 from "../assets/Products/Product1.webp";
import product2 from "../assets/Products/Product2.webp";
import product3 from "../assets/Products/Product3.webp";
import product4 from "../assets/Products/Product4.png";
import product5 from "../assets/Products/Product5.jpg";
import product6 from "../assets/Products/Product6.webp";
import product7 from "../assets/Products/Product7.webp";
import product8 from "../assets/Products/Product8.webp";
import product9 from "../assets/Products/Product9.jpg";
import product10 from "../assets/Products/Product10.webp";
import product11 from "../assets/Products/Product11.jpg";
import product12 from "../assets/Products/Product12.webp";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/products/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        const data = await response.json();
        console.log(data)
        setProducts(data);  // Assuming response has a 'products' key
        setLoading(false);
      } catch (err) {

        
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle delete product
  // const handleDelete = (id) => {
  //   const updatedProducts = products.filter((product) => product.id !== id);
  //   setProducts(updatedProducts);
  // };
  const handleDelete = async (id) => {
    try {
      // Retrieve token from local storage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token is missing.");
      }
  
      // Send DELETE request to API with Authorization header
      const response = await fetch(`http://localhost:5000/api/v1/products/product/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token in the Authorization header
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete the product.");
      }
  
      // Remove product from the local state after successful deletion
      const updatedProducts = products.filter((product) => product._id !== id);
      setProducts(updatedProducts);
  
      // Show success toast
      toast.success("Product deleted successfully!");
    } catch (err) {
      // Show error toast and log error
      toast.error(err.message);
      console.error(err.message);
    }
  };
  
  return (
    <section className="py-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Admin - Manage Products
          </h1>
        </div>

        {/* Loading or Error Message */}
        {loading && <p className="text-center text-gray-700">Loading products...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.length === 0 ? (
            <p className="text-center text-gray-700 col-span-full">
              No products available.
            </p>
          ) : (
            products.map((product) => (
              <div
                key={product._id}  // Assuming the product has an '_id' field
                className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative h-56 bg-white flex justify-center items-center">
                  <img
                    src={product.image || product1}  // Use default image if product image is missing
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                  <span className="absolute top-2 right-2 text-black text-sm font-semibold">
                    ₹{product.price.toLocaleString()}
                  </span>
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate mb-3">
                    {product.name}
                  </h3>
                  <h3 className="text-small font-semibold text-gray-800 truncate mb-3">
                    {product.description}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    CATEGORY:{product.category ? product.category.name : "Nothing"}
                  </p>
                  <div className="flex flex-col md:flex-row md:space-x-2">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex-1 py-2 bg-red-700 hover:bg-red-900 text-white text-m font-medium rounded-lg transition text-center"
                    >
                      Delete
                    </button>
                    <Link to="/editproducts" state={product} className="flex-1">
                      <button className="w-full py-2 bg-purple-700 hover:bg-purple-900 text-white text-m font-medium rounded-lg transition text-center">
                        Edit
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Product and Add Category Buttons */}
        <div className="text-center mt-8">
          <Link to="/addproduct">
            <button
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-medium rounded-lg shadow-md transition"
            >
              Add Product
            </button>
          </Link>
          <Link to="/addcategory" className="ml-4">
            <button
              className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white text-lg font-medium rounded-lg shadow-md transition"
            >
              Add Category
            </button>
          </Link>
        </div>
        
      </div>
    </section>
  );
};

export default AdminProducts;
