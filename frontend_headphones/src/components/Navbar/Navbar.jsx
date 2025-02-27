import React, { useState, useEffect } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { FaUserShield } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { UpdateFollower } from "react-mouse-follower";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
// import { useCart } from "../../context/CartContext";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom";
const NavbarMenu = [
  { id: 1, title: "Home", link: "/" },
  { id: 2, title: "Products", link: "/products" },
  { id: 4, title: "About", link: "/about" },
  { id: 3, title: "Contact", link: "/contact" },
  { id: 5, title: "Dashboard", link: "/userboard" },
  {id:6,title:"Admin",link:"/adminboard"}
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [auth, setAuth] = useState(false); // For storing authentication status
  // const { cart } = useCart();
  const navigate = useNavigate();

  // Calculate total number of items in the cart
  // const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const checkAuthStatus = () => {
    const isAuthenticated = localStorage.getItem("auth") === "true";
    setAuth(isAuthenticated);
  };

  useEffect(() => {
    // Check auth status on mount
    checkAuthStatus();

    // Use a polling mechanism to continuously monitor auth state changes
    const authInterval = setInterval(() => {
      checkAuthStatus();
    }, 500); // Poll every 500ms (adjustable)

    return () => clearInterval(authInterval); // Cleanup interval on component unmount
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    // Clear relevant data from localStorage
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuth(false); // Update auth state
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="bg-brandDark text-white py-8 font-valera">
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="container flex justify-between items-center"
      >
        {/* Logo section */}
        <div>
          <a href="#" className="text-xl font-bold uppercase">
            Playing /<span className="font-extralight text-white/70">Market</span>
          </a>
        </div>

        {/* Menu for larger screens */}
        <div className="hidden md:flex items-center gap-4">
          {NavbarMenu.map((item) => (
            <li key={item.id} className="mx-4 list-none">
              <UpdateFollower
                mouseOptions={{
                  backgroundColor: "white",
                  zIndex: 999,
                  followspeed: 1.5,
                  scale: 5,
                  mixBlendMode: "difference",
                }}
              >
                {item.scrollLink ? (
                  <ScrollLink
                    to={"blog"}
                    smooth={true}
                    duration={500}
                    className="inline-block text-sm py-2 px-3 uppercase cursor-pointer"
                  >
                    {item.title}
                  </ScrollLink>
                ) : (
                  <Link to={item.link} className="inline-block text-sm py-2 px-3 uppercase">
                    {item.title}
                  </Link>
                )}
              </UpdateFollower>
            </li>
          ))}

          {/* Cart and User/Logout Button */}
          <div className="flex items-center gap-6 ps-14">
            

            {auth ? (
              <button
                onClick={handleLogout}
                className="text-sm py-2 px-3 uppercase text-white hover:text-gray-300 flex items-center gap-2"
              >
                <FiLogOut /> Logout
              </button>
            ) : (
              <div className='flex gap-4'>
                  {/* User Icon */}
            <UpdateFollower
              mouseOptions={{
                backgroundColor: "white",
                zIndex: 999,
                followspeed: 1.5,
                scale: 5,
                mixBlendMode: "difference",
              }}
            >
              <Link to="/login" className="text-xl">
                <FiUser />
              </Link>
            </UpdateFollower>
            <UpdateFollower
              mouseOptions={{
                backgroundColor: "white",
                zIndex: 999,
                followspeed: 1.5,
                scale: 5,
                mixBlendMode: "difference",
              }}
            >
              <Link to="/admin-login" className="text-xl">
                <FaUserShield />
              </Link>
            </UpdateFollower>


              </div>
            )}
            <Link to="/cart" className="relative flex items-center text-xl">
              <FiShoppingCart />
              {/* {totalItems > 0 && ( */}
                {/* // <span className="absolute top-[-6px] right-[-6px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"> */}
                  {/* {totalItems} */}
                {/* </span> */}
              {/* )} */}
            </Link>
          </div>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/cart" className="relative text-2xl">
            <FiShoppingCart />
            {/* {totalItems > 0 && ( */}
              {/* <span className="absolute top-[-6px] right-[-6px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"> */}
                {/* {totalItems} */}
              {/* </span> */}
            {/* )} */}
          </Link>

          <div onClick={toggleMenu}>
            {menuOpen ? <MdClose className="text-4xl" /> : <MdMenu className="text-4xl" />}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${menuOpen ? "block" : "hidden"}`}
      >
        <div className="flex flex-col items-center py-4 bg-brandDark text-white">
          {NavbarMenu.map((item) => (
            <li key={item.id} className="my-2 list-none">
              <UpdateFollower
                mouseOptions={{
                  backgroundColor: "white",
                  zIndex: 999,
                  followspeed: 1.5,
                  scale: 5,
                  mixBlendMode: "difference",
                }}
              >
                {item.scrollLink ? (
                  <ScrollLink
                    to={item.scrollLink}
                    smooth={true}
                    duration={500}
                    className="inline-block text-sm py-2 px-3 uppercase cursor-pointer"
                  >
                    {item.title}
                  </ScrollLink>
                ) : (
                  <Link
                    to={item.link}
                    className="inline-block text-sm py-2 px-3 uppercase"
                  >
                    {item.title}
                  </Link>
                )}
              </UpdateFollower>
            </li>
          ))}

          {/* Login/Logout for Mobile */}
          {auth ? (
            <button
              onClick={handleLogout}
              className="text-sm py-2 px-3 uppercase text-white hover:text-gray-300 my-2 flex items-center gap-2"
            >
              <FiLogOut /> Logout
            </button>
          ) : (
            <Link
                to="/login"
                className="text-sm py-2 px-3 uppercase text-white hover:text-gray-300 my-2"
              >
                Login
              </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
