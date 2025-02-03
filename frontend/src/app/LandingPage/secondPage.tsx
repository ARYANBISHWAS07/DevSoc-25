import { Container } from "./mainLandingPage";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect } from "react";

export function Page2() {
  const [replacements, setReplacements] = useState([false, false, false]);

  const circleVariants = {
    hidden: { 
      opacity: 0, 
      rotateY: -90,
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: { 
        duration: 0.5, 
        type: "spring", 
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      rotateY: 90,
      scale: 1.2,
      transition: { duration: 0.3 } 
    }
  };

  const newContainerVariants = {
    hidden: { 
      opacity: 0, 
      rotateY: 90,
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: { 
        duration: 0.5, 
        type: "spring", 
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      rotateY: -90,
      scale: 1.2,
      transition: { duration: 0.3 } 
    }
  };

  useEffect(() => {
    const timers = [
      setTimeout(() => setReplacements(prev => [true, ...prev.slice(1)]), 8000),
      setTimeout(() => setReplacements(prev => [prev[0], true, prev[2]]), 10000),
      setTimeout(() => setReplacements(prev => [...prev.slice(0, 2), true]), 12000)
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <Container id={2}>
      <div className="relative flex items-center justify-center h-screen w-full bg-blue-100">
        <div className="absolute inset-0 flex flex-col items-center justify-center z-0 space-y-20">
          {[0, 1, 2].map(index => (
            <AnimatePresence key={`circle-${index}`}>
              {!replacements[index] ? (
                <motion.div
                  variants={circleVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`
                    ${index === 0 ? 'w-[200px] h-[200px] -translate-x-8' : 
                      index === 1 ? 'w-[150px] h-[150px]' : 
                      'w-24 h-24 translate-x-8'} 
                    bg-blue-200 rounded-full flex items-center justify-center 
                    shadow-md translate-y-[-70px] backface-hidden
                  `}
                >
                  <span className="text-sm font-semibold">Circle {index + 1}</span>
                </motion.div>
              ) : (
                <motion.div
                  variants={newContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`
                    ${index === 0 ? 'w-[200px] h-[150px] -translate-x-8' : 
                      index === 1 ? 'w-[150px] h-[100px]' : 
                      'w-24 h-20 translate-x-8'} 
                    bg-green-200 rounded-lg flex items-center justify-center 
                    shadow-xl translate-y-[-70px] backface-hidden
                  `}
                >
                  <span className="text-sm font-semibold">New Div {index + 1}</span>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>
      </div>
    </Container>
  );
}