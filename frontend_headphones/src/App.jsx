import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Banner from "./components/Banner/Banner";
import BannerText from "./components/Banner/BannerText";
import Blogs from "./components/Blogs/Blogs";
import Footer from "./components/Footer/Footer";
import LoginPage from "./components/Login";
import AdminLoginPage from "./components/AdminLogin";
import SignupPage from "./components/Signup";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import DetailedView from "./components/DetailedView";
import About from "./components/About";
import AdminBoard from "./components/AdminBoard";
import AdminProducts from "./components/AdminProducts";
import EditProducts from "./components/EditProducts";
import UsersManage from "./components/UsersManage";
import AddReviews from "./components/AddReviews";
import ReviewsManage from "./components/ReviewsManage";
import UserBoard from "./components/UserBoard";
import AddProduct from "./components/AddProduct";
import Contact from "./components/Contact";
import AddCategory from "./components/AddCategory";
import AudioTest from "./components/AudioTest";

const App = () => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  
  const checkRole = () => {
    const storedRole = localStorage.getItem("role");
    if (storedRole !== role) {
      setRole(storedRole); 
    }
  };

  useEffect(() => {
    // Initial check for role
    checkRole();

    // Poll every 500ms to check for role change
    const roleInterval = setInterval(() => {
      checkRole();
    }, 500); // Adjust the interval as needed (500ms in this case)

    // Cleanup the polling interval on unmount
    return () => {
      clearInterval(roleInterval);
    };
  }, [role]); // Dependency on role so that it will update when role changes

  return (
    // <CartProvider>
    <Router>
      <main className="overflow-x-hidden">
        <Navbar />
        <Routes>
          {/* Common Routes for All Users */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Services />
                <Banner />
                <BannerText />
                <AudioTest />
                <Blogs />
                <Footer />
              </>
            }
          />
          <Route path="login/products" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<DetailedView />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/addreview" element={<AddReviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/addproduct" element={role === "admin" ? <AddProduct /> : <Navigate to="/" />} />

          {/* Admin-Specific Routes */}
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route
            path="/adminboard"
            element={role === "admin" ? <AdminBoard /> : <Navigate to="/" />}
          />
          <Route
            path="/adminproducts"
            element={role === "admin" ? <AdminProducts /> : <Navigate to="/" />}
          />
          <Route
            path="/editproducts"
            element={role === "admin" ? <EditProducts /> : <Navigate to="/" />}
          />
          <Route
            path="/usersmanage"
            element={role === "admin" ? <UsersManage /> : <Navigate to="/" />}
          />
          <Route
            path="/reviewsmanage"
            element={role === "admin" ? <ReviewsManage /> : <Navigate to="/" />}
          />

          {/* Customer-Specific Routes */}
          <Route
            path="/addreviews"
            element={role === "user" ? <AddReviews /> : <Navigate to="/" />}
          />
          <Route path="/userboard" element={<UserBoard />} />
          <Route path="/addcategory" element={<AddCategory />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
