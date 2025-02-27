import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const formatNumber = (number) => {
  return number.toLocaleString('en-IN');
};

const Products = () => {
  const [searchQuery, setSearchQuery] = useState(""); // For the search query
  const [wishlist, setWishlist] = useState([]); // State for wishlist tracking
  const [productData, setProductData] = useState([]); // State for product data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate(); // For navigation

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/products/products"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        const data = await response.json();
        console.log(data)
        setProductData(data); // Set the fetched product data
      } catch (error) {
        setError(error.message); // Set error if any
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, []);

  const handleViewDetails = (product) => {
    navigate(`/product/${product.id}`, { state: product });
  };

  const handleAddToWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      // Toggle productId in the wishlist
      if (prevWishlist.includes(productId)) {
        // If already in wishlist, remove it
        return prevWishlist.filter((id) => id !== productId);
      } else {
        // If not in wishlist, add it
        return [...prevWishlist, productId];
      }
    });
  };

  const handleAddToCart = async (product) => {
    console.log("prodcut is"+product._id)
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Please login.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/v1/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
        }),
      });

      if (response.ok) {
        toast.success("Product added to cart successfully.");
        console.log("Product added to cart successfully.");
      } else {
        const errorData = await response.json();
        console.error("Failed to add product to cart:", errorData.message);
      }
    } catch (error) {
      console.error("Error while adding product to cart:", error);
    }
  };

  const categorizedProducts = productData.reduce((acc, product) => {
    const category = product.category ? product.category.name : "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  const filteredProducts = productData.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <section className="bg-gray-800 py-16" id="products">
      <ToastContainer />
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-4xl font-bold text-white mb-4">Explore Our Collection</h1>
        </div>

        {/* Search Bar */}
        <div className="mb-10 flex justify-center">
          <input
            type="text"
            placeholder="Search for products..."
            className="p-4 w-96 border-2 border-gray-300 rounded-xl bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-md hover:shadow-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Product Categories */}
        {Object.keys(categorizedProducts).map((category) => (
          <div key={category} className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {categorizedProducts[category].filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative h-56 bg-white flex justify-center items-center">
                    <img
                      src={product.image}
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
                    <p className="text-sm text-gray-600 mb-3">
                      CATEGORY: {product.category ? product.category.name : "Nothing"}
                    </p>
                    <div className="flex items-center mb-3">
                      <span className="text-yellow-500">
                        {Math.random() > 0.3 ? "★★★★★" : "★★★★☆"} {/* More 5-star ratings */}
                      </span>
                      <span className="text-sm text-gray-600 ml-2">
                        ({formatNumber(Math.floor(Math.random() * 67800) + 57800)})
                      </span>
                      <span className="text-sm text-green-600 ml-10"> {/* Changed ml-2 to ml-4 */}
                        Free Delivery
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleViewDetails(product)}
                        className="w-1/2 py-2 bg-red-500 text-white text-m font-medium rounded-lg hover:bg-red-600 transition duration-300"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-1/2 py-2 bg-green-500 text-white text-m font-medium rounded-lg hover:bg-green-600 transition duration-300"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
