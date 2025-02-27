import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/category/categories");
      const data = await response.json();
      console.log(data)
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if fields are filled
    if (!categoryName) {
      toast.error("Please fill out the category name!", { position: "top-center" });
      return;
    }

    try {
      // Create the category data object manually
      const categoryData = {
        name: categoryName,
      };

      // Get the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found!", { position: "top-center" });
        return;
      }

      // Send the POST request using fetch
      const response = await fetch("http://localhost:5000/api/v1/category/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tell the backend that we're sending JSON
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(categoryData), // Send category data as a JSON object
      });

      // Handle response
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || "Category added successfully!", { position: "top-center" });

        // Reset form
        setCategoryName("");
        fetchCategories(); // Refresh categories list
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to add category!", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Something went wrong. Please try again.", { position: "top-center" });
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/v1/category/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Category deleted successfully!", { position: "top-center" });
        fetchCategories(); // Refresh categories list
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to delete category!", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Something went wrong. Please try again.", { position: "top-center" });
    }
  };

  const handleEdit = async (id, newName) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/v1/category/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newName }),
      });

      if (response.ok) {
        toast.success("Category updated successfully!", { position: "top-center" });
        fetchCategories(); // Refresh categories list
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to update category!", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Something went wrong. Please try again.", { position: "top-center" });
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Add a New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Name */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-2">Category Name</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition transform hover:scale-105"
          >
            Add Category
          </button>
        </form>
        {/* Categories List */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Categories</h3>
          <ul>
            {categories.map((category) => (
              <li key={category._id} className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">{category.name}</span>
                <div>
                  <button
                    onClick={() => handleEdit(category._id, prompt("Enter new name:", category.name))}
                    className="bg-blue-800 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default AddCategory;
