"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Step {
  id: number;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  { id: 1, title: "Step 1", description: "Get the extension from Chrome webstore." },
  { id: 2, title: "Step 2", description: "Click on the extension during online meet" },
  { id: 3, title: "Step 3", description: "Enjoy the experience :D" },
];

const StepsProgress: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const progressValue: number = (step / STEPS.length) * 100;
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setStep((prevStep) => {
          const nextStep = prevStep === STEPS.length ? 1 : prevStep + 1;
          setCarouselIndex(nextStep - 1);
          return nextStep;
        });
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Progress Bar Component
  const ProgressBar = ({ position }: { position: "left" | "right" }) => (
    <div className="hidden md:flex flex-col items-center w-2">
      <div className="h-2 w-2 bg-gray-200 rounded-full relative">
        <div
          className="absolute top-0 w-8 bg-gradient-to-b from-blue-400 to-indigo-600 rounded-full transition-all duration-700 ease-in-out"
          style={{ height: `${progressValue}%` }}
        />
        {STEPS.map((stepItem) => (
          <div
            key={stepItem.id}
            className={`absolute flex items-center ${position === "left" ? "-left-16" : "-right-16"}`}
            style={{ top: `${((stepItem.id - 1) / (STEPS.length - 1)) * 100}%` }}
          >
            <div
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                step >= stepItem.id ? "bg-indigo-600" : "bg-gray-300"
              } ${step === stepItem.id ? "scale-150" : "scale-100"}`}
            />
          </div>
        ))}
      </div>
    </div>
  );

  // Define different content for each carousel item
  const carouselItems = [
    <div key="item1" className="p-2 h-full flex flex-col items-center justify-center">
      <div className="max-w-xs">
        <img 
          src="/api/placeholder/300/200" 
          alt="Extension" 
          className="w-full h-auto object-cover"
        />
      </div>
      <h2 className="text-xl md:text-2xl font-bold mb-2">Carousel Item 1</h2>
      <p className="text-sm md:text-base text-center">First custom content block.</p>
    </div>,
    <div key="item2" className="p-2 h-full flex flex-col items-center justify-center">
      <h2 className="text-xl md:text-2xl font-bold mb-2">Carousel Item 2</h2>
      <p className="text-sm md:text-base text-center">Second custom content block.</p>
    </div>,
    <div key="item3" className="p-2 h-full flex flex-col items-center justify-center">
      <h2 className="text-xl md:text-2xl font-bold mb-2">Carousel Item 3</h2>
      <p className="text-sm md:text-base text-center">Third custom content block.</p>
    </div>
  ];

  return (
    <div className="flex flex-col md:flex-row h-auto w-full p-2 md:p-4 justify-center items-center gap-2 md:gap-4">
      <ProgressBar position="left" />

      <div className="flex flex-col w-full max-w-full md:max-w-md">
        {STEPS.map((stepItem) => (
          <div
            key={stepItem.id}
            className="flex items-center mb-2 md:mb-4 transition-all duration-500"
            style={{
              transform: step === stepItem.id ? "scale(1.02)" : "scale(1)",
              opacity: step === stepItem.id ? 1 : 0.7,
            }}
          >
            <Card
              className={`w-full shadow-md border-2 transition-all ${
                step === stepItem.id
                  ? "border-indigo-600 shadow-blue-100"
                  : "border-blue-400"
              }`}
            >
              <div className="flex flex-row items-center p-2 md:p-4">
                <div className="flex-shrink-0 w-16 flex justify-center mr-2 md:mr-4">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 text-base md:text-xl ${
                      step >= stepItem.id
                        ? "bg-indigo-600 text-white ring-2 ring-blue-200"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {stepItem.id}
                  </div>
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-base md:text-xl font-bold transition-colors duration-300 ${
                      step === stepItem.id ? "text-blue-800" : "text-gray-900"
                    }`}
                  >
                    {stepItem.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-800">
                    {stepItem.description}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <ProgressBar position="right" />

      <div className="w-full max-w-xs md:max-w-sm">
        <Carousel className="w-full">
          <CarouselContent
            className="h-[200px] md:h-[300px] transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
          >
            {carouselItems.map((item) => (
              <CarouselItem key={(item as any).key} className="w-full">
                {item}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default StepsProgress;