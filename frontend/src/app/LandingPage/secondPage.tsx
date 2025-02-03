import { Container } from "./mainLandingPage";
import Hand from "../../../public/handSize.png";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export function Page2() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [-90, 0]);
  const x = 600;
  const y = 200;
  const scale = 3.3;

  const circleVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        opacity: { duration: 0.2, ease: "easeOut" },
        scale: { duration: 0.2, type: "spring" }
      }
    },
    exit: { 
      opacity: 0, 
      scale: 1.1,
      transition: { 
        opacity: { duration: 0.15, ease: "easeIn" },
        scale: { duration: 0.15 }
      }
    }
  };

  const newContainerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        opacity: { duration: 0.15, ease: "easeOut" },
        scale: { duration: 0.15, type: "spring" }
      }
    },
    exit: { 
      opacity: 0, 
      scale: 1.1,
      transition: { 
        opacity: { duration: 0.15, ease: "easeIn" },
        scale: { duration: 0.15 }
      }
    }
  };

  const [replacements, setReplacements] = useState([false, false, false]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setReplacements(prev => [true, ...prev.slice(1)]), 10000),
      setTimeout(() => setReplacements(prev => [prev[0], true, prev[2]]), 12000),
      setTimeout(() => setReplacements(prev => [...prev.slice(0, 2), true]), 14000)
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <Container id={2}>
      <div className="relative flex items-center justify-center h-screen w-full bg-transparent">
        <div className="absolute inset-0 flex flex-col items-center justify-center z-0 space-y-20">
          {[0, 1, 2].map(index => (
            <AnimatePresence key={`circle-${index}`}>
              {!replacements[index] ? (
                <motion.div
                  key={`circle${index + 1}`}
                  variants={circleVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`
                    ${index === 0 ? 'w-[200px] h-[200px] -translate-x-8' : 
                      index === 1 ? 'w-[150px] h-[150px]' : 
                      'w-24 h-24 translate-x-8'} 
                    bg-blue-200 rounded-full flex items-center justify-center 
                    shadow-md translate-y-[-70px]
                  `}
                >
                  <span className="text-sm font-semibold">Circle {index + 1}</span>
                </motion.div>
              ) : (
                <motion.div
                  key={`new${index + 1}`}
                  variants={newContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`
                    ${index === 0 ? 'w-[200px] h-[150px] -translate-x-8' : 
                      index === 1 ? 'w-[150px] h-[100px]' : 
                      'w-24 h-20 translate-x-8'} 
                    bg-green-200 rounded-lg flex items-center justify-center 
                    shadow-xl translate-y-[-70px]
                  `}
                >
                  <span className="text-sm font-semibold">New Div {index + 1}</span>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        <motion.div
          className="relative z-10 m-4"
          style={{ rotate, x, y, scale }}
        >
          <Image src={Hand} alt="Hand" />
        </motion.div>
      </div>
    </Container>
  );
}