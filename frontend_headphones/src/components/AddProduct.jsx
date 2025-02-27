import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/category/categories");
        // console.log(response);
        if (response.ok) {
          const data = await response.json();
          // console.log
          setCategories(data);
        } else {
          toast.error("Failed to fetch categories!", { position: "top-center" });
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Something went wrong. Please try again.", { position: "top-center" });
      }
    };

    fetchCategories();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Preview the image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation: Check if fields are filled
    if (!productName || !price || !description || !selectedCategory) {
      toast.error("Please fill out all fields!", { position: "top-center" });
      return;
    }
  
    try {
      // Create the product data object manually
      const productData = {
        name: productName,
        price: price,
        description: description,
        category: selectedCategory,
        image: imagePreview,  // If you are uploading an image and showing a preview URL
      };
  
      // Get the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found!", { position: "top-center" });
        return;
      }
  
      // Send the POST request using fetch
      const response = await fetch("http://localhost:5000/api/v1/products/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tell the backend that we're sending JSON
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(productData), // Send product data as a JSON object
      });
  
      // Handle response
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || "Product added successfully!", { position: "top-center" });
  
        // Reset form
        setProductName("");
        setPrice("");
        setDescription("");
        setImage(null);
        setImagePreview("");
        setSelectedCategory("");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to add product!", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Something went wrong. Please try again.", { position: "top-center" });
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Add a New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full py-2 text-sm text-gray-700"
              required
            />
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-500">Image Preview:</p>
                <img src={imagePreview} alt="Preview" className="w-full h-auto rounded-md" />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
