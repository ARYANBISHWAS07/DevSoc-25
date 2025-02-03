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

  const ProgressBar = ({ position }: { position: "left" | "right" }) => (
    <div className="hidden md:hidden md:flex flex-col items-center w-12 md:w-24 lg:w-2">
      <div className="h-48 md:h-96 lg:h-2 w-4 md:w-6 lg:w-2 bg-gray-200 rounded-full relative">
        <div
          className="absolute top-0 w-full bg-gradient-to-b from-blue-400 to-indigo-600 rounded-full transition-all duration-700 ease-in-out"
          style={{ height: `${progressValue}%` }}
        />
        {STEPS.map((stepItem) => (
          <div
            key={stepItem.id}
            className={`absolute flex items-center ${position === "left" ? "-left-8 md:-left-12 lg:-left-16" : "-right-8 md:-right-12 lg:-right-16"}`}
            style={{ top: `${((stepItem.id - 1) / (STEPS.length - 1)) * 100}%` }}
          >
            <div
              className={`w-4 h-4 md:w-5 md:h-5 lg:w-2 lg:h-2 rounded-full transition-all duration-500 ${
                step >= stepItem.id ? "bg-indigo-600" : "bg-gray-300"
              } ${step === stepItem.id ? "scale-150" : "scale-100"}`}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const carouselItems = [
    <div key="item1" className="p-4 h-full flex flex-col items-center justify-center">
      <div className="max-w-xs md:max-w-md">
        <Image src={Extension} alt="Extension" layout="responsive"/>
      </div>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">Carousel Item 1</h2>
      <p className="text-base md:text-xl text-center">This is the first custom content block.</p>
    </div>,
    // Similar responsive adjustments for other carousel items
    ...Array(4).fill(null).map((_, index) => (
      <div key={`item${index + 2}`} className="p-4 h-full flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">Carousel Item {index + 2}</h2>
        <p className="text-base md:text-xl text-center">This is the {index + 2} custom content block.</p>
      </div>
    ))
  ];

  return (
    <div className="flex flex-col md:flex-row h-auto md:h-screen w-full p-4 md:p-12 mt-0 md:mt-16 justify-center items-center gap-4 md:gap-8 lg:gap-16">
      <ProgressBar position="left" />

      <div className="flex flex-col w-full md:flex-1 md:min-w-[500px] lg:min-w-[750px]">
        {STEPS.map((stepItem) => (
          <div
            key={stepItem.id}
            className="mb-4 md:mb-8 lg:mb-2 md:mb-4 transition-all duration-500"
            style={{
              transform: step === stepItem.id ? "scale(1.02) md:scale(1.05)" : "scale(1)",
              opacity: step === stepItem.id ? 1 : 0.7,
            }}
          >
            <Card
              className={`w-full shadow-xl border-2 md:border-4 transition-all ${
                step === stepItem.id
                  ? "border-indigo-600 shadow-blue-100"
                  : "border-blue-400"
              }`}
            >
              <div className="flex flex-row items-center p-4 md:p-8 lg:p-2 md:p-4">
                <div className="flex-shrink-0 w-20 md:w-40 lg:w-16 flex justify-center mr-2 md:mr-4 mr-4 md:mr-8">
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 lg:w-10 lg:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 text-xl md:text-2xl lg:text-base md:text-xl ${
                      step >= stepItem.id
                        ? "bg-indigo-600 text-white ring-2 md:ring-2 ring-blue-200"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {stepItem.id}
                  </div>
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-xl md:text-3xl lg:text-4xl font-bold transition-colors duration-300 ${
                      step === stepItem.id ? "text-blue-800" : "text-gray-900"
                    }`}
                  >
                    {stepItem.title}
                  </h3>
                  <p className="text-base md:text-xl lg:text-2xl text-slate-800 mt-2 md:mt-4">
                    {stepItem.description}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <ProgressBar position="right" />

      <div className="w-full max-w-xs md:max-w-md lg:max-w-lg mt-4 md:mt-0">
        <Carousel className="w-full">
          <CarouselContent
            className="h-64 md:h-[500px] lg:h-[800px] transition-transform duration-700 ease-in-out overflow-hidden"
            style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
          >
            {carouselItems.map((item) => (
              <CarouselItem key={(item as any).key} className="w-full">
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