
import { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import OnboardingSurvey from "@/components/calculate-impact/OnboardingSurvey";
import DailyTrackerForm from "@/components/calculate-impact/DailyTrackerForm";
import CarbonScoreMeter from "@/components/calculate-impact/CarbonScoreMeter";
import EmissionPieChart from "@/components/calculate-impact/EmissionPieChart";
import EmissionBarChart from "@/components/calculate-impact/EmissionBarChart";
import SuggestionCard from "@/components/calculate-impact/SuggestionCard";
import HistoryList from "@/components/calculate-impact/HistoryList";
import ThemeToggle from "@/components/calculate-impact/ThemeToggle";
import { ArrowDown, FileDown } from "lucide-react";
import {
  calculateBaselineEmissions,
  calculateDailyEmissions,
  carbonScore,
  getSuggestion,
  BaselineAnswers,
  DailyEntry,
} from "@/utils/emissionUtils";

// Top-level page for Carbon Footprint Tracker
export default function Track() {
  // Baseline setup state
  const [baseline, setBaseline] = useLocalStorage<BaselineAnswers | null>("carbon-baseline", null);
  const [history, setHistory] = useLocalStorage<{ [date: string]: DailyEntry }>("carbon-history", {});
  const [scrollY, setScrollY] = useState(0);
  
  // Derived
  const todayStr = new Date().toISOString().slice(0, 10);
  const [today, setToday] = useState<DailyEntry | null>(history[todayStr] || null);
  
  // Handle parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (today) {
      setHistory((hist) => ({ ...hist, [todayStr]: today }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [today]);

  if (!baseline) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300/30 to-sky-300/30 dark:from-green-900/30 dark:to-sky-900/30 relative overflow-hidden">
        {/* Floating shapes for visual interest */}
        <div className="absolute top-20 left-[20%] w-32 h-32 rounded-full bg-green-300/20 dark:bg-green-700/20 blur-2xl animate-float" />
        <div className="absolute bottom-40 right-[15%] w-40 h-40 rounded-full bg-sky-300/10 dark:bg-sky-700/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-[30%] w-56 h-56 rounded-full bg-blue-200/10 dark:bg-blue-800/10 blur-3xl" />
        
        {/* Survey component */}
        <div className="relative z-10">
          <OnboardingSurvey onDone={(ans) => setBaseline(ans)} />
        </div>
      </div>
    );
  }

  // Calculate
  const baselineValue = calculateBaselineEmissions(baseline);
  const entry = today || {
    date: todayStr,
    transport: { mode: "car", distance: 0 },
    electricity: 0,
    water: 0,
    meal: "veg",
    extras: [],
  };
  const emission = calculateDailyEmissions(entry);
  const percentDiff = ((emission.total - baselineValue) / baselineValue) * 100;
  const score = carbonScore(emission.total, baselineValue);
  const suggestion = getSuggestion(emission.total, baselineValue);

  // Pie Chart data
  const pieData = [
    { name: "Commute", value: emission.commute },
    { name: "Electricity", value: emission.electricity },
    { name: "Water", value: emission.water },
    { name: "Meal", value: emission.meal },
    { name: "Extras", value: emission.extras },
  ];

  // Weekly
  const week = Array.from({ length: 7 }).map((_, idx) => {
    const dt = new Date();
    dt.setDate(dt.getDate() - idx);
    const dstr = dt.toISOString().slice(0, 10);
    return history[dstr]
      ? { date: dstr, total: calculateDailyEmissions(history[dstr]).total }
      : null;
  }).filter(Boolean) as { date: string; total: number }[];

  // Export to PDF placeholder
  function exportReport() {
    alert("Exporting to PDF coming soon! This will include your summary & charts.");
    // Could implement html2canvas + jsPDF here in the future
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-sky-100 dark:from-green-950 dark:to-sky-950 transition-colors overflow-x-hidden">
      {/* Parallax background elements */}
      <div 
        className="fixed inset-0 w-full h-full z-0"
        style={{ pointerEvents: "none" }}
      >
        <div 
          className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-green-300/20 dark:bg-green-700/20 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div 
          className="absolute bottom-40 right-[5%] w-80 h-80 rounded-full bg-sky-300/10 dark:bg-sky-700/10 blur-3xl"
          style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute -bottom-10 left-[20%] w-96 h-96 rounded-full bg-blue-200/10 dark:bg-blue-800/10 blur-3xl"
          style={{ transform: `translateY(${-scrollY * 0.05}px)` }}
        />
      </div>
      
      {/* Header */}
      <div 
        className="sticky top-0 z-20 backdrop-blur-md bg-white/70 dark:bg-black/30 border-b border-white/20 dark:border-white/10 shadow-sm px-6 py-3"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <span className="text-green-600 dark:text-green-400">🪴</span> 
            <span className="bg-gradient-to-r from-green-600 to-sky-600 dark:from-green-400 dark:to-sky-400 bg-clip-text text-transparent">
              Carbon Footprint Tracker
            </span>
          </h1>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/"
              className="text-primary underline hover:scale-105 transition text-sm ml-4"
            >
              Home
            </a>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center gap-6 pb-16 relative z-10">
        <div className="w-full max-w-4xl px-4 mt-8">
          <div 
            className="animate-fade-in"
            style={{ transform: `translateY(${Math.min(0, scrollY * 0.05)}px)` }}
          >
            <DailyTrackerForm
              defaultEntry={entry}
              onSubmit={(e) => setToday(e)}
            />
          </div>
          
          <div className="flex flex-col md:flex-row md:gap-8 gap-4 w-full justify-center items-stretch mt-8">
            {/* Score and Suggestion */}
            <div 
              className="flex flex-col gap-4 w-full md:w-1/3 justify-between animate-fade-in"
              style={{ 
                animation: "fadeInStaggered 0.6s ease-out forwards",
                animationDelay: "0.2s", 
                opacity: 0,
                transform: `translateY(${Math.min(0, (scrollY - 200) * 0.05)}px)`
              }}
            >
              <div className="glass-card p-6 rounded-xl">
                <CarbonScoreMeter score={score} />
                <div className="text-center mt-4">
                  <span className="font-semibold text-sm px-4 py-2 rounded-full bg-white/70 dark:bg-black/30 backdrop-blur-sm">
                    {percentDiff < 0
                      ? `${Math.abs(percentDiff).toFixed(1)}% less than baseline`
                      : `${percentDiff.toFixed(1)}% more than baseline`}
                  </span>
                </div>
              </div>
              
              <div style={{ transform: `translateY(${Math.min(0, (scrollY - 300) * 0.08)}px)` }}>
                <SuggestionCard suggestion={suggestion} />
              </div>
              
              <button
                className="bg-primary/90 backdrop-blur-sm text-primary-foreground py-2.5 px-5 rounded-full font-semibold hover:scale-105 transition flex items-center justify-center gap-2 shadow-lg"
                onClick={exportReport}
                style={{ transform: `translateY(${Math.min(0, (scrollY - 400) * 0.1)}px)` }}
              >
                <FileDown size={16} />
                Export Report
              </button>
            </div>
            
            {/* Charts */}
            <div 
              className="flex flex-col gap-4 w-full md:w-2/3 animate-fade-in"
              style={{ 
                animation: "fadeInStaggered 0.6s ease-out forwards",
                animationDelay: "0.4s", 
                opacity: 0 
              }}
            >
              <div 
                className="glass-card p-6 rounded-xl"
                style={{ transform: `translateY(${Math.min(0, (scrollY - 250) * 0.07)}px)` }}
              >
                <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Emission Breakdown</h2>
                <EmissionPieChart data={pieData} />
              </div>
              
              <div 
                className="glass-card p-6 rounded-xl"
                style={{ transform: `translateY(${Math.min(0, (scrollY - 350) * 0.09)}px)` }}
              >
                <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Today vs Baseline</h2>
                <EmissionBarChart today={emission.total} baseline={baselineValue} />
              </div>
            </div>
          </div>
          
          <div 
            className="w-full mt-8 glass-card p-6 rounded-xl animate-fade-in"
            style={{ 
              animation: "fadeInStaggered 0.6s ease-out forwards",
              animationDelay: "0.6s", 
              opacity: 0,
              transform: `translateY(${Math.min(0, (scrollY - 500) * 0.1)}px)`
            }}
          >
            <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-green-600 to-sky-600 dark:from-green-400 dark:to-sky-400 bg-clip-text text-transparent">Weekly History</h2>
            <HistoryList history={week.reverse()} />
          </div>
        </div>
      </div>
    </div>
  );
}
