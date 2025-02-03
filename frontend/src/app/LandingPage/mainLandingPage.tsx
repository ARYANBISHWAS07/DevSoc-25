"use client";
import Page1 from "./firstPage1";
import { Page2 } from "./secondPage";
import { Page3 } from "./thirdPage";
import { Page4 } from "./fourthPage";
import { Page5 } from "./fifthPage";
import {
    motion,
    MotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { useRef } from "react";

// Define the type for the useParallax hook
export  function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

// Define the props for the Container component
interface ContainerProps {
    id: number;
    children: React.ReactNode; // Allow any elements to be passed as children
}

// Container component for each page
export  function Container({ id, children }: ContainerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 300);

    return (
        <section 
            ref={ref} 
            className="container w-screen min-h-screen flex items-center justify-center relative mt-5"
        >
            <div className="content w-full"> {/* Full width content */}
                {children}
            </div>
            <motion.h2
                initial={{ visibility: "hidden" }}
                animate={{ visibility: "visible" }}
                style={{ y }}
                className="absolute top-10 left-10 text-3xl font-bold"
            >
          
            </motion.h2>
        </section>
    );
}


// Page Components









// Main Parallax Component
export default function Parallax() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 20,
        restDelta: 0.001,
    });

    return (
        <div className=" top-0 left-0 right-0 w-full bg-gradient-to-r from-blue-900 to-blue-400">
            {/* Static Section (Full Screen) */}
            <div className="h-screen flex items-center justify-center">
                <h1 className="text-5xl font-bold text-white">Welcome to My Page</h1>
            </div>

            {/* Scrolling Section (Starts After Static Section) */}
            <div id="example" className="relative mt-0">  
                <Page1 />
                <Page2 />
                <Page3 />
                <Page4 />
                <Page5 />
                <motion.div 
                    className="fixed bottom-0 left-0 h-2 bg-blue-500 origin-center w-full" 
                    style={{ scaleX }} 
                />
            </div>
        </div>
    );
}
