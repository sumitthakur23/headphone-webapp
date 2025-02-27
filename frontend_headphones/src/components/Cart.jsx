import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]); // State to store cart items
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(""); // State for errors
useEffect(() => {
  const fetchCart = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch("http://localhost:5000/api/v1/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error("CART IS EMPTY.");
      }

      const data = await response.json();
      console.log(data); // Debugging: Log fetched data
      setCart(data.items); // Set fetched cart items
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchCart();
}, []); 


const handleIncreaseQuantity = async (item) => {
  try {
    console.log(item)
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const updatedItem = { ...item, quantity: item.quantity + 1 };

    const response = await fetch("http://localhost:5000/api/v1/cart", { // Removed the extra space in the URL
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
      },
      body: JSON.stringify(updatedItem),
    });

    if (!response.ok) {
      throw new Error("Failed to update quantity.");
    }

    // Update the cart in the state with the updated quantity
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      )
    );
  } catch (err) {
    setError(err.message);
  }
};


  const decreaseQuantity = async (itemId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Authentication token not found.");
    }
    const item = cart.find((i) => i._id === itemId);
    if (item.quantity === 1) return; // Prevent quantity from going below 1

    try {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      const response = await fetch("http://localhost:5000/api/v1/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
        body: JSON.stringify(updatedItem),
      });
      if (!response.ok) {
        throw new Error("Failed to update quantity.");
      }
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem._id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
    
  
      if (!token) {
        throw new Error("Authentication token not found.");
      }
      console.log("ddddddd"+cart)
      // Send the DELETE request with the token
      const response = await fetch(`http://localhost:5000/api/v1/cart/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to remove item from cart.");
      }
  
      // Log the current cart state for debugging
      // console.log("Before removing:", cart);
  
      // Filter out the deleted item from the cart state
      setCart((prevCart) => {
        console.log("pppppppp")
        console.log(prevCart)
        const updatedCart = prevCart.filter((item) => item.productId!== itemId);  // Filter based on correct identifier
        // console.log("Updated cart after removal:", updatedCart);  // Log the updated state
        return updatedCart;
      });
      
      console.log("Item removed successfully");
    } catch (err) {
      setError(err.message); // Handle errors
      console.log(err);
    }
  };
  
  
  
  if (loading) {
    return <p>Loading cart items...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  console.log("total price is "+totalPrice)

  return (
    <section className="bg-white py-16" id="cart">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-black text-center mb-10">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-lg text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-lg"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="bg-red-600 text-lg text-white py-1 px-2.5 rounded-lg"
                  >
                    -
                  </button>

                  <span className="text-xl font-bold">{item.quantity}</span>

                  <button
                    onClick={() => handleIncreaseQuantity(item)}
                    className="bg-green-500 text-lg text-white py-1 px-2 rounded-lg"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="bg-red-600 text-lg text-white py-2 px-4 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-8 text-right">
            <h3 className="text-lg font-semibold">Total: ₹{totalPrice.toFixed(2)}</h3>
          </div>
        )}

        <div className="mt-8 text-center space-x-4">
        <Link
            to="/products"
            className="bg-purple-600 text-xl text-white py-2 px-6 rounded-lg"
          >
            Back to Products
          </Link>
          <Link
            to="/checkout"
            className="bg-green-600 text-xl text-white py-2 px-6 rounded-lg"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;
