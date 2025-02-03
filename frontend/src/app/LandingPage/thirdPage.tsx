"use client";
import Extension from "../../../public/extension.png"
import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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

  const handleReset = (): void => {
    setStep(1);
    setIsPlaying(true);
    setCarouselIndex(0);
  };

  // Progress Bar Component
  const ProgressBar = ({ position }: { position: "left" | "right" }) => (
    <div className="flex flex-col items-center w-48">
      <div className="h-144 w-8 bg-gray-200 rounded-full relative">
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
              className={`w-6 h-6 rounded-full transition-all duration-500 ${
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
    <div key="item1" className="p-4 h-full flex flex-col items-center justify-center transparent">
        <div>
            <Image src={Extension} alt="Extension"/>
        </div>
      <h2 className="text-4xl font-bold mb-4">Carousel Item 1</h2>
      <p className="text-xl">This is the first custom content block.</p>
    </div>,
    <div key="item2" className="p-4 h-full flex flex-col items-center justify-center transparent">
      <h2 className="text-4xl font-bold mb-4">Carousel Item 2</h2>
      <p className="text-xl">This is the second custom content block.</p>
    </div>,
    <div key="item3" className="p-4 h-full flex flex-col items-center justify-center transparent">
      <h2 className="text-4xl font-bold mb-4">Carousel Item 3</h2>
      <p className="text-xl">This is the third custom content block.</p>
    </div>,
    <div key="item4" className="p-4 h-full flex flex-col items-center justify-center transparent">
      <h2 className="text-4xl font-bold mb-4">Carousel Item 4</h2>
      <p className="text-xl">This is the fourth custom content block.</p>
    </div>,
    <div key="item5" className="p-4 h-full flex flex-col items-center justify-center transparent">
      <h2 className="text-4xl font-bold mb-4">Carousel Item 5</h2>
      <p className="text-xl">This is the fifth custom content block.</p>
    </div>,
  ];

  return (
    // Wrapper with global text styling via "text-style-body" class if defined globally
    <div className="flex flex-row h-screen w-full p-12 mt-16 justify-center items-center gap-16">
      <ProgressBar position="left" />

      <div className="flex flex-col flex-1" style={{ minWidth: "750px" }}>
        {STEPS.map((stepItem) => (
          <div
            key={stepItem.id}
            className="flex items-center mb-12 transition-all duration-500"
            style={{
              transform: step === stepItem.id ? "scale(1.05)" : "scale(1)",
              opacity: step === stepItem.id ? 1 : 0.7,
            }}
          >
            <Card
              className={`w-full max-w-6xl shadow-2xl border-4 transition-all ${
                step === stepItem.id
                  ? "border-indigo-600 shadow-blue-100"
                  : "border-blue-400"
              }`}
            >
              <div className="flex items-center p-12">
                <div className="flex-shrink-0 w-80 flex-row">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 text-3xl ${
                      step >= stepItem.id
                        ? "bg-indigo-600 text-white ring-4 ring-blue-200"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {stepItem.id}
                  </div>
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-style-body text-4xl font-bold transition-colors duration-300 ${
                      step === stepItem.id ? "text-blue-800" : "text-gray-900"
                    }`}
                  >
                    {stepItem.title}
                  </h3>
                  <p className="text-style-body text-slate-800 text-2xl mt-4">
                    {stepItem.description}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <ProgressBar position="right" />

      {/* Carousel Component with Different Divs for Each Item */}
      <div className="w-full max-w-lg">
        <Carousel className="w-full">
          <CarouselContent
            className="mb-10 h-[800px] transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
          >
            {carouselItems.map((item) => (
              <CarouselItem key={(item as any).key}>
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
