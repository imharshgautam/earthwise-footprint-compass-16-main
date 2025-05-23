
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function SuggestionCard({ suggestion }: { suggestion: string }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Animate in after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Add emoji for fun!
  let emoji = "🌱";
  if (suggestion.startsWith("Excellent")) emoji = "🎉";
  else if (suggestion.startsWith("Good")) emoji = "💚";
  else if (suggestion.startsWith("You're about")) emoji = "🙂";
  else if (suggestion.startsWith("Slightly")) emoji = "🤔";
  else if (suggestion.startsWith("High impact")) emoji = "⚠️";

  // Determine category and specific tips
  let category = "Standard";
  let tipList: string[] = [];

  if (suggestion.startsWith("Excellent")) {
    category = "Excellent";
    tipList = [
      "Keep up your eco-friendly habits",
      "Consider teaching friends about your green choices",
      "Track your progress over time to see your impact"
    ];
  } else if (suggestion.startsWith("Good")) {
    category = "Good";
    tipList = [
      "Try one more eco-friendly choice tomorrow",
      "Consider a plant-based meal to reduce your footprint further",
      "Share your success with friends"
    ];
  } else if (suggestion.startsWith("You're about")) {
    category = "Average";
    tipList = [
      "Consider using public transport once this week",
      "Try a vegetarian meal next time",
      "Reduce water consumption when possible"
    ];
  } else if (suggestion.startsWith("Slightly")) {
    category = "Above Average";
    tipList = [
      "Try biking for short trips instead of driving",
      "Choose one day to go meat-free this week",
      "Be mindful of electricity usage tomorrow"
    ];
  } else if (suggestion.startsWith("High impact")) {
    category = "High Impact";
    tipList = [
      "Consider carpooling or public transport for your next trip",
      "Reduce AC usage by a few degrees",
      "Choose plant-based options for your next meal"
    ];
  }

  return (
    <div className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-50 to-sky-50 dark:from-green-900/40 dark:to-sky-900/40">
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 h-16 w-16 bg-green-200/30 dark:bg-green-700/20 rounded-bl-full -z-10" />
          <div className="absolute bottom-0 left-0 h-12 w-12 bg-sky-200/30 dark:bg-sky-700/20 rounded-tr-full -z-10" />
          
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{emoji}</span>
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="text-green-600 dark:text-green-400 h-4 w-4" />
                  <h3 className="font-semibold text-sm text-green-700 dark:text-green-300">{category} Rating</h3>
                </div>
                <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100">{suggestion}</h2>
              </div>
            </div>
            
            <div className="pl-2 border-l-2 border-green-300 dark:border-green-700 ml-3 mt-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Suggestions:</h4>
              <ul className="space-y-2">
                {tipList.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 dark:text-green-400 font-bold">•</span>
                    <span className="text-gray-600 dark:text-gray-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
