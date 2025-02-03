"use client";
import Extension from "../../../public/extension.png";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

interface Step {
  id: number;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    id: 1,
    title: "Step 1",
    description: "Get the extension from Chrome webstore.",
  },
  {
    id: 2,
    title: "Step 2",
    description: "Click on the extension during online meet",
  },
  {
    id: 3,
    title: "Step 3",
    description: "Enjoy the experience :D",
  },
];

const StepsProgress: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const progressValue: number = (step / STEPS.length) * 100;
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  // Automatically update the step and carousel index every 3 seconds.
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

  // Carousel items array with responsive styling.
  const carouselItems = [
    <div
      key="item1"
      className="p-2 flex flex-col items-center justify-center space-y-2"
    >
      <div className="relative w-full sm:max-w-md lg:max-w-lg aspect-[2.67]">
        <Image src={Extension} alt="Extension" layout="fill" objectFit="contain" />
      </div>
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">Carousel Item 1</h2>
      <p className="text-sm sm:text-base lg:text-lg text-center">
        This is the first custom content block.
      </p>
    </div>,
    ...Array(4)
      .fill(null)
      .map((_, index) => (
        <div
          key={`item${index + 2}`}
          className="p-2 flex flex-col items-center justify-center space-y-2"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
            Carousel Item {index + 2}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-center">
            This is the {index + 2} custom content block.
          </p>
        </div>
      )),
  ];

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row w-full p-4 sm:p-6 md:p-8 lg:p-12 mt-0 md:mt-16 justify-center items-center gap-4 md:gap-8 lg:gap-16">
      {/* Left Progress Bar */}
      <div className="hidden md:flex flex-col items-center w-12 md:w-24 lg:w-48">
        <div className="h-24 md:h-48 lg:h-96 w-2 md:w-4 lg:w-8 bg-gray-200 rounded-full relative">
          <div
            className="absolute top-0 w-full bg-gradient-to-b from-blue-400 to-indigo-600 rounded-full transition-all duration-700 ease-in-out"
            style={{ height: `${progressValue}%` }}
          />
          {STEPS.map((stepItem) => (
            <div
              key={stepItem.id}
              className={`absolute flex items-center ${
                // Position labels on the left
                "-left-4 md:-left-8 lg:-left-16"
              }`}
              style={{
                top: `${((stepItem.id - 1) / (STEPS.length - 1)) * 100}%`,
              }}
            >
              <div
                className={`w-2 md:w-3 lg:w-4 h-2 md:h-3 lg:h-4 rounded-full transition-all duration-500 ${
                  step >= stepItem.id ? "bg-indigo-600" : "bg-gray-300"
                } ${step === stepItem.id ? "scale-150" : "scale-100"}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* main content area */}
      <div className="flex flex-col w-full md:flex-1 md:min-w-[500px] lg:min-w-[750px]">
        {STEPS.map((stepItem) => (
          <div
            key={stepItem.id}
            className="mb-2 sm:mb-4 md:mb-6 lg:mb-8 transition-all duration-500"
            style={{
              transform: step === stepItem.id ? "scale(1.02)" : "scale(1)",
              opacity: step === stepItem.id ? 1 : 0.7,
            }}
          >
            <Card
              className={`w-full shadow-md border transition-all ${
                step === stepItem.id
                  ? "border-indigo-600 shadow-blue-100"
                  : "border-blue-400"
              }`}
            >
              <div className="flex flex-col md:flex-row items-center p-2 sm:p-4 md:p-6 lg:p-8">
                <div className="flex-shrink-0 w-12 sm:w-16 md:w-24 lg:w-32 mb-2 md:mb-0 md:mr-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center transition-all duration-500 text-base sm:text-lg md:text-xl ${
                      step >= stepItem.id
                        ? "bg-indigo-600 text-white ring-2 md:ring-4 ring-blue-200"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {stepItem.id}
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3
                    className={`text-base sm:text-xl md:text-2xl lg:text-3xl font-bold transition-colors duration-300 ${
                      step === stepItem.id ? "text-blue-800" : "text-gray-900"
                    }`}
                  >
                    {stepItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-800 mt-1 sm:mt-2">
                    {stepItem.description}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Carousel Area */}
      <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg mt-4 md:mt-0">
        <Carousel className="w-full">
          <CarouselContent
            className="overflow-hidden transition-transform duration-700 ease-in-out"
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
