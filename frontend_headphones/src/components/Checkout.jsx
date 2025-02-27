import React from "react";
import {useState,useEffect} from "react"
// import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Checkout = () => {
  // const { cart, removeFromCart, decreaseQuantity, addToCart } = useCart();

  // const handleIncreaseQuantity = (item) => {
  //   addToCart(item);
  // };

  // const handleDecreaseQuantity = (item) => {
  //   decreaseQuantity(item.id);
  // };

  // const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [cart, setCart] = useState([]);
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
          throw new Error("Failed to fetch cart items.");
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
  return (
    <section className="bg-white py-16" id="checkout">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-black text-center mb-10">Checkout</h1>

        {cart.length === 0 ? (
          <p className="text-center text-lg text-gray-500">Your cart is empty. Add items to cart before proceeding.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left side: Cart items */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg mb-4">
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
                    {/* <button
                      onClick={() => handleDecreaseQuantity(item)}
                      className="px-2 py-1 bg-yellow-400 text-white rounded-full"
                    >
                      -
                    </button>

                    <span className="text-xl font-bold">{item.quantity}</span>

                    <button
                      onClick={() => handleIncreaseQuantity(item)}
                      className="px-2 py-1 bg-green-500 text-white rounded-full"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded-full"
                    >
                      Remove
                    </button> */}
                  </div>
                </div>
              ))}

              <div className="text-right mt-6">
                {/* <h3 className="text-lg font-semibold">Total: ₹{totalPrice}</h3> */}
              </div>
            </div>

            {/* Right side: Shipping Info Form */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>

              <form className="space-y-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-lg font-medium">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="address" className="text-lg font-medium">Shipping Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="city" className="text-lg font-medium">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="postal-code" className="text-lg font-medium">Postal Code</label>
                  <input
                    type="text"
                    id="postal-code"
                    name="postal-code"
                    className="p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="phone" className="text-lg font-medium">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div className="mt-8 text-center">
                  <Link
                    to="/cart" // Link to cart page
                    className="px-4 py-2 text-lg bg-purple-700 text-white rounded-lg mr-4"
                  >
                    Go back to Cart
                  </Link>
                  <Link
                    to="/payment" // Link to the payment page or processing page
                    className="bg-green-500 text-lg text-white py-2 px-6 rounded-lg"
                  >
                    Proceed to Payment
                  </Link>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Checkout;
