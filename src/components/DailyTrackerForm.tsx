
import { useState } from "react";
import { DailyEntry } from "@/utils/emissionUtils";
import { Bike, Car, Bus } from "lucide-react";

// Only show supported options, for simplicity
const transportOptions = [
  { label: "Car", value: "car", icon: Car },
  { label: "Bus/Train", value: "bus", icon: Bus },
  { label: "Bicycle/Walk", value: "bike", icon: Bike },
];
const mealOptions = [
  { value: "veg", label: "Vegetarian" },
  { value: "non-veg", label: "Non-Vegetarian" },
];
const extras = [
  { value: "AC", label: "Used AC" },
  { value: "laundry", label: "Did Laundry" },
  { value: "dishwasher", label: "Used Dishwasher" },
];

export default function DailyTrackerForm({
  onSubmit,
  defaultEntry,
}: {
  onSubmit: (entry: DailyEntry) => void;
  defaultEntry?: DailyEntry;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const [entry, setEntry] = useState<DailyEntry>(
    defaultEntry || {
      date: today,
      transport: { mode: "car", distance: 10 },
      electricity: 8,
      water: 120,
      meal: "veg",
      extras: [],
    }
  );
  function handleChange(field: string, value: any) {
    setEntry((e) => ({ ...e, [field]: value }));
  }
  function handleTransportChange(mode: string) {
    setEntry((e) => ({
      ...e,
      transport: { ...e.transport, mode },
    }));
  }
  function handleExtrasChange(value: string) {
    setEntry((e) => ({
      ...e,
      extras: e.extras.includes(value)
        ? e.extras.filter((v) => v !== value)
        : [...e.extras, value],
    }));
  }
  return (
    <form
      className="glass-card rounded-xl p-6 shadow-xl w-full max-w-xl mx-auto animate-fade-in"
      onSubmit={e => {
        e.preventDefault();
        onSubmit(entry);
      }}
    >
      <h2 className="mb-6 text-xl font-bold bg-gradient-to-r from-green-600 to-sky-600 dark:from-green-400 dark:to-sky-400 bg-clip-text text-transparent">Today's Carbon Tracking</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Transport Method */}
        <div className="space-y-3">
          <label className="block text-sm font-medium">Transport mode & distance</label>
          <div className="flex items-center gap-2 mb-3">
            {transportOptions.map(opt => (
              <button
                type="button"
                key={opt.value}
                className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-300
                    ${entry.transport.mode === opt.value
                      ? "bg-primary/15 border border-primary/40"
                      : "backdrop-blur-md bg-white/30 dark:bg-gray-700/30 border border-white/20 dark:border-gray-600/20 hover:bg-white/50 dark:hover:bg-gray-700/50"
                    }`}
                onClick={() => handleTransportChange(opt.value)}
              >
                <opt.icon size={20} className={entry.transport.mode === opt.value ? "text-primary" : ""} />
                <span className="text-xs font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={250}
              value={entry.transport.distance}
              className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
              onChange={e =>
                setEntry(prev => ({
                  ...prev,
                  transport: { ...prev.transport, distance: Math.max(0, Number(e.target.value)) },
                }))
              }
            />
            <span className="text-sm font-medium w-16 text-right">{entry.transport.distance} km</span>
          </div>
        </div>
        
        {/* Electricity */}
        <div className="space-y-3">
          <label className="block text-sm font-medium">Electricity used today</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={30}
              value={entry.electricity}
              className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
              onChange={e =>
                handleChange("electricity", Math.max(0, Number(e.target.value)))
              }
            />
            <span className="text-sm font-medium w-16 text-right">{entry.electricity} kWh</span>
          </div>
        </div>
        
        {/* Water */}
        <div className="space-y-3">
          <label className="block text-sm font-medium">Water used today</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={300}
              step={5}
              value={entry.water}
              className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
              onChange={e =>
                handleChange("water", Math.max(0, Number(e.target.value)))
              }
            />
            <span className="text-sm font-medium w-16 text-right">{entry.water} L</span>
          </div>
        </div>
        
        {/* Meal type */}
        <div className="space-y-3">
          <label className="block text-sm font-medium">Main meal type</label>
          <div className="flex gap-3">
            {mealOptions.map(opt => (
              <button
                key={opt.value}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-300
                    ${entry.meal === opt.value
                      ? "bg-primary/15 border border-primary/40"
                      : "backdrop-blur-md bg-white/30 dark:bg-gray-700/30 border border-white/20 dark:border-gray-600/20 hover:bg-white/50 dark:hover:bg-gray-700/50"
                    }`}
                type="button"
                onClick={() => handleChange("meal", opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Extras */}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-3">Extra high-impact actions:</label>
        <div className="flex gap-2 flex-wrap">
          {extras.map(opt => (
            <label
              key={opt.value}
              className={`flex items-center rounded-full px-4 py-2 text-xs cursor-pointer transition-all
                ${entry.extras.includes(opt.value)
                  ? "bg-primary/15 border border-primary/40 text-gray-800 dark:text-white"
                  : "backdrop-blur-md bg-white/30 dark:bg-gray-700/30 border border-white/20 dark:border-gray-600/20 text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50"
                }`}
            >
              <input
                type="checkbox"
                className="mr-2 accent-primary"
                checked={entry.extras.includes(opt.value)}
                onChange={() => handleExtrasChange(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end mt-6">
        <button 
          className="bg-gradient-to-r from-green-600 to-sky-600 dark:from-green-500 dark:to-sky-500 text-white py-2.5 px-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium" 
          type="submit"
        >
          Save Today's Entry
        </button>
      </div>
    </form>
  );
}
