import React from "react";
import { useNavigate } from "react-router-dom";
import Headphone1 from "../../assets/headphone.png";
import Headphone2 from "../../assets/headphone2.png";
import Headphone3 from "../../assets/headphone3.png";
import { FaWhatsapp } from "react-icons/fa";
import { UpdateFollower } from "react-mouse-follower";
import { AnimatePresence, easeInOut, motion } from "framer-motion";

const fadeUp = (delay) => {
  return {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.5,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: easeInOut,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.5,
      transition: {
        duration: 0.2,
        ease: easeInOut,
      },
    },
  };
};

const headphoneData = [
  {
    id: 1,
    image: Headphone1,
    title: "Thunder",
    subtitle: "Designed to Impress, Engineered to Perform – The Sound You Deserve",
    price: "1499",
    modal: "Modal Brown",
    bgColor: "#8b5958",
  },
  {
    id: 2,
    image: Headphone2,
    title: "Anchor",
    subtitle: "Block the Noise, Embrace the Music – Discover Headphones Built for Perfection",
    price: "1499",
    modal: "Lime Green",
    bgColor: "#638153",
  },
  {
    id: 3,
    image: Headphone3,
    title: "Booster",
    subtitle: "Where Style Meets Superior Sound – Experience the Future of Audio Today",
    price: "1499",
    modal: "Ocean Blue",
    bgColor: "#5d818c",
  },
];

const Hero = () => {
  const [activeData, setActiveData] = React.useState(headphoneData[0]);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleActiveData = (data) => {
    setActiveData(data);
  };

  return (
    <>
      <section className="bg-brandDark text-white">
        <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[700px]">

          {/* Headphone Info */}
          <div className="flex flex-col justify-center py-14 md:py-0 xl:max-w-[500px]">
            <div className="space-y-5 text-center md:text-left">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={activeData.id}
                  variants={fadeUp(0.2)}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="text-3xl lg:text-6xl font-bold font-varela">{activeData.title}
                </motion.h1>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeData.id}
                  variants={fadeUp(0.3)}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="text-sm leading-loose text-white/80">{activeData.subtitle}
                </motion.p>
              </AnimatePresence>

              {/* Buy and Listen Button */}
              <AnimatePresence mode="wait">
                <UpdateFollower mouseOptions={{
                  backgroundColor: activeData.bgColor,
                  zIndex: 9999,
                  followSpeed: 0.5,
                  rotate: -720,
                  scale: 6,
                  backgroundElement: <div>
                    <img src={activeData.image} />
                  </div>
                }}>
                  <motion.button
                    key={activeData.id}
                    variants={fadeUp(0.2)}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    style={{
                      backgroundColor: activeData.bgColor
                    }}
                    onClick={() => navigate('/products')} // Add onClick handler
                    className="px-4 py-2 inline-block font-normal rounded-sm">Buy and Listen
                  </motion.button>
                </UpdateFollower>
              </AnimatePresence>
            </div>

            {/* Headphone List Separator */}
            <div className="flex item-center justify-center md:justify-start gap-4 !mt-24">
              <div className="w-20 h-[1px] bg-white"></div>
              <p className="uppercase text-sm">Top Headphones for you</p>
              <div className="w-20 h-[1px] bg-white"></div>
            </div>

            {/* Headphones list switcher */}
            <div className="grid grid-cols-3 gap-10">
              {headphoneData.map((item) => {
                return (
                  <div
                    key={item.id}
                    onClick={() => handleActiveData(item)}
                    className="grid grid-cols-2 place-items-center cursor-pointer">
                    <div>
                      <img src={item.image} alt="" className="w-[200px]" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-base font-bold">{item.price}</p>
                      <p className="text-xs font-normal text-nowrap">{item.modal}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex flex-cols justify-end items-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeData.id}
                initial={{ opacity: 0, scale: 0.9, y: 100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: easeInOut }}
                exit={{
                  opacity: 0, scale: 0.9, y: 100,
                  transition: {
                    duration: 0.2,
                  },
                }}
                src={activeData.image} alt="" className="w-[300px] md:w-[400px] xl:w-[550px]" />
            </AnimatePresence>
          </div>

          {/* WhatsApp Icon */}
          <div>
            <a href="">
              <FaWhatsapp className="text-3xl text-white fixed bottom-10 right-10 hover:rotate-[360deg] duration-500 z-[99999] mix-blend-difference " />
            </a>
          </div>

        </div>
      </section>
    </>
  );
};

export default Hero;
