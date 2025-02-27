import React from "react";
import Headphone4 from "../../assets/headphone4.png";
import { motion } from "framer-motion";
import { UpdateFollower } from "react-mouse-follower";
import { fadeUp } from "../Services/Services";

const Banner = () => {
  return (
    <>
      <section>
        <div className="container py-14 grid grid-cols-1 md:grid-cols-2 space-y-6 md:space-y-0 gap-12">
          {/*   Banner Image   */}
          <div>
            <motion.img
              initial={{ opacity: 0, x: -100, rotate: -180 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
              src={Headphone4}
              alt=""
              className="w-[300px] md:w-[400px] mx-auto"
            />
          </div>
          {/*   Banner Text Info  */}
          <div className="flex flex-col justify-center">
            <div className="text-center md:text-left space-y-4 lg:max-w-[450px]">
              <motion.h1
                variants={fadeUp(0.4)}
                initial="hidden"
                whileInView="show"
                className="text 3-xl lg:text-4xl font-semibold font-poppins">
                The Latest Headphones With The Latest Technology
              </motion.h1>
              <motion.p
                variants={fadeUp(0.4)}
                initial="hidden"
                whileInView="show">
                Immerse Yourself in Pure Sound – Discover the Perfect Harmony of Innovation and Comfort with Our Latest Headphones
              </motion.p>
              <UpdateFollower
                mouseOptions={{
                  backgroundColor: "white",
                  zIndex: 9999,
                  followSpeed: 0.5,
                  mixBlendMode: "difference",
                  scale: 5,
                }}>
                <motion.a
                  href="/products" // Added the link to the button
                  variants={fadeUp(0.4)}
                  initial="hidden"
                  whileInView="show"
                  className="mt-6 inline-block bg-red-500 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-lg transition hover:bg-red-600">
                  Shop Now
                </motion.a>
              </UpdateFollower>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
