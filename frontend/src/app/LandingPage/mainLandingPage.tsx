// Parallax.tsx

"use client";
import Page1 from "./firstPage1";
import { Page2 } from "./secondPage";
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
import Navbar from "../navbar";
import StepsProgress from "./thirdPage";
import Footer from '../components/fotter';

// Define the type for the useParallax hook
export function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

// Define the props for the Container component
interface ContainerProps {
    id: number;
    children: React.ReactNode; // Allow any elements to be passed as children
}

// Container component for each page
export function Container({ id, children }: ContainerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 300);

    return (
        <section
            ref={ref}
            className=" fixed container w-[100%] min-h-screen flex items-center justify-center relative mt-5 mr-20"
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
                {/* You can add text or other content here if needed */}
            </motion.h2>
        </section>
    );
}

// main Parallax Component
export default function Parallax() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 20,
        restDelta: 0.001,
    });

    return (
        <>
            <Navbar />

            <div className="relative w-full  overflow-x-hidden "> {/* Ensure background is fixed and doesn't interfere with scrolling */}
                <div className="h-screen flex items-center justify-center z-10">
                    <div className=' h-screen flex items-center justify-center'>

                        <section className=" py-14"> {/* Example Tailwind classes */}
                            <div className="container mx-auto text-center mb-20">
                                <div className="flex flex-row justify-center mb-10 mr-16" >
                                    <img src="new.png"
                                        className="max-w-[50%] mx-auto"
                                        alt="" />
                                </div>
                                <div className='mb-10'>
                                    <h1 className="font-light font-sans text-5xl  text-white mb-4 ">
                                        CAN YOU
                                    </h1>
                                    <h1 className="font-extralight font-sans text-5xl  text-white mb-4 ">
                                        HEAR ME NOW?
                                    </h1>
                                </div>
                                <div className='text-center flex justify-center'>
                                    <p className=" font-mono text-xs font-extralight text-center w-1/3 text-white">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti unde deserunt quasi incidunt blanditiis eaque voluptates minima, voluptatem molestiae ut doloremque dolorum consequuntur, consequatur atque delectus maiores error sequi nulla? {/* Your description */}
                                    </p>
                                </div>

                            </div>
                        </section>
                    </div>
                </div>

                {/* Scrolling Section (Starts After Static Section) */}
                <div id="example" className="relative justify-center items-center m-20 z-20"> {/* Ensure the content is above the background */}
                    <Page1 />
                    <Page2 />
                    <StepsProgress />
                    {/* <Page4 /> */}
                    {/* <Page5 /> */}
                </div>

                {/* Bottom Animation (Fixed Position) */}
                <motion.div
                    className="fixed bottom-0 left-0 h-2 bg-gradient-to-t from-blue-500 to-slate-700 origin-center w-full z-30"
                    style={{ scaleX }}
                />
            </div>
            <Footer />
        </>
    );
}
