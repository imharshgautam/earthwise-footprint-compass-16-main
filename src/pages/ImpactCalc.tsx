
import { useState, useEffect, useRef } from "react";
import ThemeToggle from "@/components/calculate-impact/ThemeToggle";
import Quiz from "@/components/calculate-impact/Quiz";
import { ArrowDown } from "lucide-react";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Handle parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Parallax header section */}
      <header className="relative h-screen overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-green-400/40 to-sky-500/40 dark:from-green-900/40 dark:to-sky-800/40 z-0"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        
        {/* Floating shapes for modern look */}
        <div 
          className="absolute top-20 left-[20%] w-32 h-32 rounded-full bg-green-300/30 dark:bg-green-700/30 blur-2xl"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div 
          className="absolute top-40 right-[15%] w-40 h-40 rounded-full bg-sky-300/20 dark:bg-sky-700/20 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div 
          className="absolute bottom-40 left-[30%] w-56 h-56 rounded-full bg-blue-200/20 dark:bg-blue-800/20 blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.15}px)` }}
        />
        
        {/* Navigation */}
        <div className="relative z-10 p-6 w-full flex justify-between items-center">
          <span className="text-lg font-bold tracking-tight backdrop-blur-sm px-4 py-2 rounded-full bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/5">
            Carbon Footprint Tracker
          </span>
          <ThemeToggle />
        </div>
        
        {/* Hero content with parallax effect */}
        <div 
          ref={heroRef}
          className="flex flex-col items-center justify-center h-full text-center px-6 relative z-10"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-br from-green-500 via-sky-500 to-blue-500 dark:from-green-400 dark:via-sky-400 dark:to-blue-400 bg-clip-text text-transparent mb-8 animate-fade-in">
            Track your impact on the planet
          </h1>
          <p className="mb-10 text-xl max-w-2xl text-gray-700 dark:text-gray-200 animate-fade-in backdrop-blur-sm px-6 py-3 rounded-2xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/5">
            Set your baseline, log your daily activities, and discover actionable ways to reduce your carbon footprint with beautiful visualizations.
          </p>
          <a
            href="/track"
            className="mt-6 px-8 py-4 rounded-full font-bold bg-primary text-primary-foreground shadow-xl hover:scale-105 transition-all duration-300 animate-scale-in flex items-center gap-2 group"
          >
            Start Tracking
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-8 h-14 rounded-full border-2 border-gray-500 dark:border-gray-400 flex items-start justify-center p-1">
              <div className="w-1.5 h-3 bg-gray-500 dark:bg-gray-400 rounded-full animate-fade-in" />
            </div>
          </div>
        </div>
      </header>

      {/* Additional content section with parallax effect */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-sky-100 to-green-50 dark:from-sky-950 dark:to-green-950 -z-10"
          style={{ transform: `translateY(${(scrollY - 500) * 0.1}px)` }}
        />
        
        <div className="max-w-6xl mx-auto px-6">
          <div 
            className="text-center mb-16"
            style={{ transform: `translateY(${(scrollY - 600) * 0.08}px)` }}
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-sky-600 dark:from-green-400 dark:to-sky-400 bg-clip-text text-transparent mb-6">Why Track Your Carbon Footprint?</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">Every action we take has an impact on our planet. Understanding your carbon footprint is the first step toward making meaningful changes.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Daily Tracking",
                description: "Log your transportation, electricity, water usage, and more in just seconds.",
                delay: 100
              },
              {
                title: "Visual Insights",
                description: "See beautiful charts that help you understand your environmental impact.",
                delay: 200
              },
              {
                title: "Actionable Tips",
                description: "Get personalized suggestions to reduce your carbon footprint over time.",
                delay: 300
              }
            ].map((card, index) => (
              <div 
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20 dark:border-white/5 hover:shadow-xl transition-all hover:-translate-y-1"
                style={{ 
                  transform: `translateY(${Math.max(0, (scrollY - 700) * 0.05)}px)`,
                  transitionDelay: `${card.delay}ms`
                }}
              >
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">{card.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Quiz section with parallax effect */}
      <Quiz />
      
      {/* Call to action */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent to-green-50 dark:to-green-950 -z-10"
          style={{ transform: `translateY(${(scrollY - 1000) * 0.05}px)` }}
        />
        
        <div 
          className="max-w-4xl mx-auto text-center px-6"
          style={{ transform: `translateY(${Math.max(0, (scrollY - 1100) * 0.08)}px)` }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-white">Ready to make a difference?</h2>
          <a
            href="/track"
            className="inline-block px-8 py-4 rounded-full font-bold bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-green-500/30 transition-all hover:scale-105"
          >
            Start Your Carbon Journey
          </a>
        </div>
      </section>

      <footer className="py-10 text-gray-500 text-sm text-center w-full border-t border-gray-200 dark:border-gray-800">
        &copy; {new Date().getFullYear()} Carbon Footprint Tracker &ndash; made for Lovable
      </footer>
    </div>
  );
};

export default Index;
