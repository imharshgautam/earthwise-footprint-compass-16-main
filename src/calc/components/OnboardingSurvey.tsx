
import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { BaselineAnswers } from "@/utils/emissionUtils";
import { Bus, Bike, Car, PlaneIcon } from "lucide-react";

// Onboarding 5-question survey.
const commuteOptions = [
  { label: "Car", value: "car", icon: Car },
  { label: "Bus/Train", value: "bus", icon: Bus },
  { label: "Bicycle/Walk", value: "bike", icon: Bike },
];
const meatOptions = [
  { value: "never", label: "Never" },
  { value: "rarely", label: "Rarely" },
  { value: "sometimes", label: "Sometimes" },
  { value: "often", label: "Often" },
];

type Props = {
  onDone: (answers: BaselineAnswers) => void;
};

const steps = [
  "Commute Details",
  "Electricity Usage",
  "Water Usage",
  "Meat Consumption",
  "Flights Per Year",
];

export default function OnboardingSurvey({ onDone }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<BaselineAnswers>({
    commute: { mode: "car", distance: 10 },
    electricity: 300,
    water: 120,
    meat: "sometimes",
    flights: 0,
  });

  const handleNext = () => {
    if (step >= steps.length - 1) {
      onDone(answers);
    } else {
      setStep(step + 1);
    }
  };
  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="w-full max-w-md mx-auto backdrop-blur-lg bg-white/60 dark:bg-gray-800/40 rounded-xl p-8 shadow-xl animate-fade-in border border-white/30 dark:border-gray-700/30">
      <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-600 to-sky-600 dark:from-green-400 dark:to-sky-400 bg-clip-text text-transparent text-center">
        Set Up Your Carbon Profile
      </h1>
      
      <div className="mb-8 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{steps[step]}</span>
          <span className="text-xs px-2 py-1 bg-primary/10 rounded-full text-primary">{step + 1} / {steps.length}</span>
        </div>
        <ProgressBar progress={((step+1)/steps.length)*100} />
      </div>
      
      <div className="min-h-[230px]">
        {step === 0 && (
          <div className="animate-fade-in">
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-3 font-medium">Primary commute method?</label>
            <div className="flex gap-4 mb-4">
              {commuteOptions.map(opt => (
                <button
                  type="button"
                  key={opt.value}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg backdrop-blur-md transition-all duration-300
                    ${answers.commute.mode === opt.value
                      ? "bg-primary/15 border border-primary/40 shadow-md"
                      : "bg-white/30 dark:bg-gray-700/30 border border-white/20 dark:border-gray-600/20 hover:bg-white/50 dark:hover:bg-gray-700/50"
                    }`}
                  onClick={() => setAnswers(a => ({ ...a, commute: { ...a.commute, mode: opt.value } }))}
                >
                  <opt.icon size={28} className={answers.commute.mode === opt.value ? "text-primary" : ""} />
                  <span className="text-sm font-medium">{opt.label}</span>
                </button>
              ))}
            </div>
            <label className="block mt-6 text-sm text-gray-700 dark:text-gray-300 font-medium">
              Commute distance (km)
            </label>
            <input
              type="range"
              value={answers.commute.distance}
              min={0}
              max={150}
              step={1}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer mt-2"
              onChange={e =>
                setAnswers(a => ({
                  ...a, commute: { ...a.commute, distance: Math.max(0, Number(e.target.value)) },
                }))
              }
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>0 km</span>
              <span>{answers.commute.distance} km</span>
              <span>150 km</span>
            </div>
          </div>
        )}
        
        {step === 1 && (
          <div className="animate-fade-in">
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium">
              Monthly electricity usage (kWh)
            </label>
            <p className="text-xs text-gray-500 mb-4">
              Average household uses between 200-800 kWh per month
            </p>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={0}
                max={1000}
                step={10}
                value={answers.electricity}
                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                onChange={e => setAnswers(a => ({ ...a, electricity: Math.max(0, Number(e.target.value)) }))}
              />
              <span className="text-sm font-medium w-16 text-right">{answers.electricity} kWh</span>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>0</span>
              <span>500</span>
              <span>1000</span>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="animate-fade-in">
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium">
              Average daily water usage (liters)
            </label>
            <p className="text-xs text-gray-500 mb-4">
              Average person uses about 80-150 liters per day
            </p>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={0}
                max={300}
                step={5}
                value={answers.water}
                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                onChange={e => setAnswers(a => ({ ...a, water: Math.max(0, Number(e.target.value)) }))}
              />
              <span className="text-sm font-medium w-16 text-right">{answers.water} L</span>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>0</span>
              <span>150</span>
              <span>300</span>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="animate-fade-in">
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-4 font-medium">
              How frequently do you consume meat?
            </label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {meatOptions.map(opt => (
                <button
                  key={opt.value}
                  className={`px-4 py-4 rounded-lg backdrop-blur-md text-center transition-all duration-300
                    ${answers.meat === opt.value
                      ? "bg-primary/15 border border-primary/40 shadow-md"
                      : "bg-white/30 dark:bg-gray-700/30 border border-white/20 dark:border-gray-600/20 hover:bg-white/50 dark:hover:bg-gray-700/50"
                    }`}
                  onClick={() => setAnswers(a => ({ ...a, meat: opt.value as any }))}
                >
                  <span className="font-medium">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {step === 4 && (
          <div className="animate-fade-in">
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium">
              Number of flights taken per year
            </label>
            <div className="flex items-center justify-center mt-4">
              <button 
                type="button"
                className="w-10 h-10 rounded-full backdrop-blur-md bg-white/30 dark:bg-gray-700/30 border border-white/20 dark:border-gray-600/20 flex items-center justify-center"
                onClick={() => setAnswers(a => ({ ...a, flights: Math.max(0, a.flights - 1) }))}
              >
                -
              </button>
              <div className="mx-8 flex flex-col items-center">
                <PlaneIcon size={24} className="mb-2 text-primary" />
                <span className="text-3xl font-bold">{answers.flights}</span>
                <span className="text-xs text-gray-500 mt-1">flights per year</span>
              </div>
              <button 
                type="button"
                className="w-10 h-10 rounded-full backdrop-blur-md bg-white/30 dark:bg-gray-700/30 border border-white/20 dark:border-gray-600/20 flex items-center justify-center"
                onClick={() => setAnswers(a => ({ ...a, flights: Math.min(20, a.flights + 1) }))}
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 flex justify-between">
        <button 
          type="button" 
          className={`px-4 py-2 rounded-lg transition-all ${step === 0 
            ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' 
            : 'text-gray-500 dark:text-gray-400 hover:bg-white/20 dark:hover:bg-gray-700/20'}`}
          onClick={handleBack} 
          disabled={step === 0}
        >
          Back
        </button>
        <button
          type="button"
          className="bg-gradient-to-r from-green-600 to-sky-600 dark:from-green-500 dark:to-sky-500 text-white py-2 px-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium"
          onClick={handleNext}
        >
          {step === steps.length - 1 ? "Complete Setup" : "Next"}
        </button>
      </div>
    </div>
  );
}

function ProgressBar({ progress }:{progress:number}) {
  return (
    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-green-500 to-sky-500 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
