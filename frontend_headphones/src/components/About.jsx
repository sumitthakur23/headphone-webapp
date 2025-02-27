import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gray-100 text-gray-800 font-sans">
      {/* Hero Section */}
      <div className="relative bg-brandDark text-white py-20">
        <div className="container mx-auto px-6 lg:px-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-6xl font-bold leading-tight text-center"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 text-center text-lg lg:text-xl text-white/80"
          >
            Your trusted partner in innovation and quality, connecting dreams to reality.
          </motion.p>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8 }}
  className="flex items-center justify-center h-full w-full bg-red-50 rounded-lg shadow-lg p-10"
>
  <div className="text-center">
    <h1 className="text-5xl lg:text-6xl font-extrabold text-red-500">
      No. 1 in the Market
    </h1>
    <p className="mt-4 text-xl lg:text-2xl font-medium text-red-600">
      Trusted by Millions, Leading in Sales and Innovation
    </p>
  </div>
</motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-brandDark">Our Journey</h2>
            <p className="mt-4 text-lg text-gray-700">
              Playing Market began with a simple vision: to bridge the gap between innovation and accessibility.
              From our humble beginnings, we've grown into a community-driven marketplace that empowers creativity
              and supports innovation.
            </p>
            <p className="mt-4 text-lg text-gray-700">
              With years of dedication and commitment, we have become a trusted name in the industry, delivering
              exceptional products and services to our customers worldwide.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission and Values */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl lg:text-4xl font-bold text-brandDark"
          >
            Our Mission & Core Values
          </motion.h2>
          <div className="mt-10 grid lg:grid-cols-3 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-6 bg-gray-100 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold text-brandDark">Innovation</h3>
              <p className="mt-4 text-gray-700">
                At the core of everything we do, we strive to innovate and bring groundbreaking ideas to life.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="p-6 bg-gray-100 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold text-brandDark">Customer Commitment</h3>
              <p className="mt-4 text-gray-700">
                We prioritize our customers, ensuring unparalleled service and a seamless experience every time.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="p-6 bg-gray-100 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold text-brandDark">Integrity</h3>
              <p className="mt-4 text-gray-700">
                Transparency and honesty define us. We stand by our principles to build trust and foster relationships.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-brandDark text-white">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl lg:text-4xl font-bold"
          >
            Join Us in Our Journey
          </motion.h2>
          <p className="mt-4 text-lg text-white/80">
            Together, we can build a brighter future. Explore our products, read our stories, and become a part of
            something extraordinary.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-block bg-red-500 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-lg transition hover:bg-red-600"
          >
            Explore Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
