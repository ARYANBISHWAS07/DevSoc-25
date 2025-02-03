    import { Container } from "./mainLandingPage";
    import Hand from "../../../public/handSize.png";
    import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
    import Image from "next/image";
    import { useState, useEffect } from "react";

    export function Page2() {
    const { scrollYProgress } = useScroll();
    const rotate = useTransform(scrollYProgress, [0, 1], [-90, 0]);
const x=100;
const y=100;
const scale= 2.1 ;
    // Container variants with left-to-right staggered animation
    const newContainerVariants = {
        hidden: { 
        opacity: 0, 
        x: -100,
        scale: 0.9, 
        rotate: -10 
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
            damping: 10
        }
        }),
        exit: { 
        opacity: 0, 
        x: 100,
        scale: 1.1,
        rotate: 10,
        transition: { 
            duration: 0.3, 
            ease: "easeInOut" 
        }
        }
    };

    return (
        <Container id={2}>
        <div className="relative flex flex-row items-center justify-center min-h-screen w-full overflow-hidden">
            {/* Hand Image Positioned at Top */}
        

            {/* Containers Section */}
            <div className="flex flex-col items-center justify-center z-0 space-y-16 w-full px-4">
            {[0, 1, 2].map((index) => (
                <AnimatePresence key={`rect-${index}`}>
                <motion.div
                    key={`new${index + 1}`}
                    variants={newContainerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={index}
                    className={`
                    ${index === 0 ? 'w-[800px] h-[180px]' : 
                        index === 1 ? 'w-[600px] h-[180px]' : 
                        'w-[400px] h-[180px]'}
                    bg-gradient-to-r from-green-500 to-green-600 rounded-xl 
                    flex items-center space-x-6 p-4 
                    shadow-2xl shadow-green-500/50 
                    transform transition-all duration-300 
                    hover:scale-[1.02] hover:shadow-green-600/70
                    `}
                >
                    {/* Image Section */}
                    <div className="w-1/3 h-full">
                    <img
                        src={index === 0 ? '/images/new1.png' :
                            index === 1 ? '/images/new2.png' :
                            '/images/new3.png'}
                        alt={`New Div ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    </div>
                
                    {/* Content Section */}
                    <div className="w-2/3 px-4">
                    <h2 className="text-white text-lg font-bold mb-2">
                        New Div {index + 1}
                    </h2>
                    <p className="text-white text-sm opacity-80">
                        Detailed description for div {index + 1}. 
                        Additional context can be added here.
                    </p>
                    </div>
                </motion.div>
                
                </AnimatePresence>
            ))}
            </div>
            <motion.div
          className="relative z-10"
          style={{ rotate, x, y, scale }}
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