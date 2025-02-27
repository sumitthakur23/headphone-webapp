// import React, { createContext, useContext, useState,useEffect } from "react";

// // Create a Context for the cart
// const CartContext = createContext();

// export const useCart = () => {
//   return useContext(CartContext);
// };

// export const CartProvider = ({ children }) => {
// //   // Initialize the cart state with an empty array
// //   const [cart, setCart] = useState([]);


// //   const fetchCart = async () => {
// //     // Retrieve the token from localStorage
// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       console.error("No token found. Please login.");
// //       return;
// //     }

// //     try {
// //       // Call the backend API to fetch the cart
// //       const response = await fetch("http://localhost:5000/api/v1/cart", {
// //         method: "GET",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`, // Pass the token for authentication
// //         },
// //       });
// //       console.log(response)
// //       if (response.ok) {
// //         // If the API call is successful, update the cart in the local state
// //         const data = await response.json();
// //         setCart(data.items || []); // Assuming the API returns { cartItems: [...] }
// //         console.log("Fetched cart data:", data);
// //       } else {
// //         console.error("Failed to fetch cart. Status:", response.status);
// //         const errorData = await response.json();
// //         console.error("Error response:", errorData);
// //       }
// //     } catch (error) {
// //       console.error("Error while calling the API:", error);
// //     }
// //   };

// //   // Function to add a product to the cart
// //   const addToCart = async (product) => {
// //     // Retrieve the token from localStorageC
// //     console.log(product)
// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       console.error("No token found. Please login.");
// //       return;
// //     }
  
// //     try {
// //       // Call the backend API to add the product to the cart
// //       const response = await fetch("http://localhost:5000/api/v1/cart", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`, // Pass the token for authentication
// //         },
// //         body: JSON.stringify({
// //           productId: product._id, // Product ID
// //           quantity: 1, // Quantity to add (default is 1)
// //         }),
// //       });
  
// //       if (response.ok) {
// //         // If the API call is successful, update the cart in the local state
// //         setCart((prevCart) => {
// //           const existingProduct = prevCart.find((item) => item.id === product.id);
  
// //           if (existingProduct) {
// //             // Increment quantity if the product already exists in the cart
// //             return prevCart.map((item) =>
// //               item.id === product.id
// //                 ? { ...item, quantity: item.quantity + 1 }
// //                 : item
// //             );
// //           } else {
// //             // Add the new product with quantity 1
// //             return [...prevCart, { ...product, quantity: 1 }];
// //           }
// //         }
// //       );
// //       console.log("suceess add to cart")
// //       } else {
// //         console.error("Failed to add item to cart. Status:", response.status);
// //         const errorData = await response.json();
// //         console.error("Error response:", errorData);
// //       }
// //     } catch (error) {
// //       console.error("Error while calling the API:", error);
// //     }
// //   };
  

// //   const removeFromCart = async (id) => {
// //     console.log(id)
// //     // Retrieve the token from localStorage
// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       console.error("No token found. Please login.");
// //       return;
// //     }
  
// //     try {
// //       // Call the backend API to remove the product from the cart
// //       const response = await fetch(`http://localhost:5000/api/v1/cart/${id}`, {
// //         method: "DELETE",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`, // Pass the token for authentication
// //         },
// //       });
  
// //       if (response.ok) {
// //         // If the API call is successful, update the cart in the local state
// //         setCart((prevCart) => prevCart.filter((item) => item.id !== id));
// //         console.log("sucess delete")
// //       } else {
// //         console.error("Failed to remove item from cart. Status:", response.status);
// //         const errorData = await response.json();
// //         console.error("Error response:", errorData);
// //       }
// //     } catch (error) {
// //       console.error("Error while calling the API:", error);
// //     }
// //   };
  

// //   // Function to decrease the quantity of a product in the cart
// //   const decreaseQuantity = (id) => {
// //     setCart((prevCart) =>
// //       prevCart.map((item) =>
// //         item.id === id && item.quantity > 1
// //           ? { ...item, quantity: item.quantity - 1 }
// //           : item
// //       )
// //     );
// //   };
// //   useEffect(() => {
// //     fetchCart();
// //   }, []);

//   return (
//     <CartContext.Provider >
//       {children}
//     </CartContext.Provider>
//   );
// };
