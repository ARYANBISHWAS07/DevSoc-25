import { Container } from "./mainLandingPage";
import Hand from "../../../public/handSize.png";
import { motion, useScroll, useTransform, AnimatePresence, useAnimation } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export function Page2() {
  const { scrollYProgress } = useScroll();

  // Map scroll progress to rotation and opacity
  const rotate = useTransform(scrollYProgress, [0, 1], [-90, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0, 1]); // Fade in after 20% scroll

  const x = 100;
  const y = 100;
  const scale = 2.1;

  // Array of descriptions for each container
  const descriptions = [
    {
      title: "New Div 1",
      description:
        "This is the first container. It provides an overview of the features and benefits of the product.",
      image: "/images/new1.png",
    },
    {
      title: "New Div 2",
      description:
        "This is the second container. It highlights the key functionalities and use cases.",
      image: "/images/new2.png",
    },
    {
      title: "New Div 3",
      description:
        "This is the third container. It showcases customer testimonials and success stories.",
      image: "/images/new3.png",
    },
  ];

  // Container variants with left-to-right staggered animation
  const newContainerVariants = {
    hidden: {
      opacity: 0,
      x: -100,
      scale: 0.9,
      rotate: -10,
    },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    }),
    exit: {
      opacity: 0,
      x: 100,
      scale: 1.1,
      rotate: 10,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // Elevation (floating) animation
  const elevationAnimation = {
    float: {
      y: [0, -20, 0], // Move up and down
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };

  // Controls for elevation animation
  const controls = useAnimation();

  // Start elevation animation after initial animation
  useEffect(() => {
    const startElevation = async () => {
      await controls.start("float");
    };
    startElevation();
  }, [controls]);

  return (
    <Container id={2}>
      <div className="relative flex flex-row items-end justify-center min-h-screen w-full overflow-hidden">
        {/* Hand Image Positioned at Top */}
        
        {/* Containers Section */}
        <div className="flex flex-col items-center justify-center z-0 space-y-16 w-full px-4">
          {descriptions.map((item, index) => (
            <AnimatePresence key={`rect-${index}`}>
              <motion.div
                key={`new${index + 1}`}
                variants={newContainerVariants}
                initial="hidden"
                whileInView="visible" // Trigger animation when in view
                viewport={{ once: true, amount: 0.5 }} // Trigger when 50% of the element is visible
                exit="exit"
                custom={index}
                animate={controls} // Apply elevation animation after initial animation
                className={`
                  ${index === 0 ? "w-[800px] h-[180px]" : 
                   index === 1 ? "w-[600px] h-[180px]" : 
                   "w-[400px] h-[180px]"}
                  bg-gradient-to-r from-blue-800 to-blue-900 rounded-xl 
                  flex items-center space-x-6 p-4 
                  shadow-2xl shadow-blue-500/50 
                  transform transition-all duration-300 
                  hover:scale-[1.02] hover:shadow-blue-600/70
                `}
              >
                {/* Image Section */}
                <div className="w-1/3 h-full">
                  <img
                    src={item.image}
                    alt={`New Div ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Content Section */}
                <div className="w-2/3 px-4">
                  <h2 className="text-white text-lg font-bold mb-2">
                    {item.title}
                  </h2>
                  <p className="text-white text-sm opacity-80">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
        <motion.div
          className="relative z-10"
          style={{ rotate, x, y, scale, opacity }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Image
            src={Hand}
            alt="Hand"
            layout="intrinsic"
            width={900}
            height={900}
            className="object-contain w-[80vw] h-[85vh] sm:w-[75vw] sm:h-[80vh] lg:w-[70vw] lg:h-[75vh] xl:w-[65vw] xl:h-[70vh] transition-all duration-300 ease-in-out"
          />
        </motion.div>

      </div>
    </Container>
  );
}