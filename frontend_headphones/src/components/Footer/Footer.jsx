import React from "react";
import { FaMapLocation } from "react-icons/fa6";
import { FaPhone, FaFacebook, FaInstagram, FaTelegram, FaGoogle } from "react-icons/fa";
import Cards from "../../assets/credit-cards.webp";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <>
      <footer id="footer" className="bg-gray-800 pt-12 pb-8 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Company Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
              }}
              className="space-y-4"
            >
              <h1 className="text-2xl font-bold uppercase">Headphones</h1>
              <p className="text-sm max-w-[300px]">
                Discover the best headphones for your needs. Stay updated with our latest products and offers.
              </p>
              <div className="mt-4">
                <p className="flex items-center gap-2">
                  <FaPhone /> +91 987-265-5363
                </p>
                <p className="flex items-center gap-2 mt-2">
                  <FaMapLocation /> Chandigarh, India
                </p>
              </div>

              <div className="flex items-center mt-4 space-x-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-md text-black focus:outline-none w-full md:w-auto"
                />
                <button className="bg-white text-primary font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition duration-300">
                  Subscribe
                </button>
              </div>
            </motion.div>

            {/* Link Section 1 */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
              }}
              className="space-y-4"
            >
              <h1 className="text-xl font-bold">Product</h1>
              <ul className="space-y-2">
                <li className="hover:text-gray-300 transition duration-300">Headphones</li>
                <li className="hover:text-gray-300 transition duration-300">Earbuds</li>
                <li className="hover:text-gray-300 transition duration-300">Accessories</li>
                <li className="hover:text-gray-300 transition duration-300">New Arrivals</li>
                <li className="hover:text-gray-300 transition duration-300">Best Sellers</li>
              </ul>
            </motion.div>

            {/* Link Section 2 */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
              }}
              className="space-y-4"
            >
              <h1 className="text-xl font-bold">Platform</h1>
              <ul className="space-y-2">
                <li className="hover:text-gray-300 transition duration-300">Our Technology</li>
                <li className="hover:text-gray-300 transition duration-300">Compatibility</li>
                <li className="hover:text-gray-300 transition duration-300">Mobile App</li>
                <li className="hover:text-gray-300 transition duration-300">Support</li>
                <li className="hover:text-gray-300 transition duration-300">Updates</li>
              </ul>
            </motion.div>

            {/* Link Section 3 */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
              }}
              className="space-y-4"
            >
              <h1 className="text-xl font-bold">Support</h1>
              <ul className="space-y-2">
                <li className="hover:text-gray-300 transition duration-300">FAQs</li>
                <li className="hover:text-gray-300 transition duration-300">Contact Us</li>
                <li className="hover:text-gray-300 transition duration-300">Warranty</li>
                <li className="hover:text-gray-300 transition duration-300">Returns</li>
                <li className="hover:text-gray-300 transition duration-300">Shipping</li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 border-t border-white/10 pt-4 flex flex-col md:flex-row justify-between items-center text-white text-sm">
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-xl hover:scale-105 duration-300" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-xl hover:scale-105 duration-300" />
              </a>
              <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
                <FaTelegram className="text-xl hover:scale-105 duration-300" />
              </a>
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                <FaGoogle className="text-xl hover:scale-105 duration-300" />
              </a>
            </div>
            <div className="my-4 md:my-0">
              <img src={Cards} alt="Payment Methods" className="w-[80%] md:w-[50%]" />
            </div>
          </div>
          <p className="text-white text-center mt-8 border-t-2 pt-8">©️ 2024. All Rights Reserved || Headphones Website</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
