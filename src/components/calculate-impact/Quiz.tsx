
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Award, Trophy, BookOpen, Star } from "lucide-react";

const quizQuestions = [
  {
    question: "What is the largest contributor to an individual's carbon footprint?",
    options: ["Transportation", "Diet", "Home energy use", "Shopping habits"],
    correctAnswer: 0,
    explanation: "Transportation, especially air travel and car usage, typically accounts for the largest portion of an individual's carbon footprint."
  },
  {
    question: "Which of these foods has the highest carbon footprint per kilogram?",
    options: ["Chicken", "Beef", "Tofu", "Lentils"],
    correctAnswer: 1,
    explanation: "Beef has a significantly higher carbon footprint than other protein sources due to methane emissions and land use requirements."
  },
  {
    question: "What percentage of global greenhouse gas emissions come from food production?",
    options: ["Around 10%", "Around 25%", "Around 50%", "Around 75%"],
    correctAnswer: 1,
    explanation: "Food systems are responsible for about 25-30% of global greenhouse gas emissions according to recent studies."
  },
  {
    question: "Which form of transport has the lowest carbon footprint per passenger-kilometer?",
    options: ["Train", "Bus", "Electric car", "Conventional car"],
    correctAnswer: 0,
    explanation: "Trains, especially electric ones, typically have the lowest carbon emissions per passenger-kilometer among major transportation methods."
  },
  {
    question: "What is the most effective way to reduce your carbon footprint?",
    options: ["Using less electricity", "Eating less meat", "Flying less", "Using public transportation"],
    correctAnswer: 2,
    explanation: "Reducing long-distance flights has the largest impact on your personal carbon footprint, as a single international flight can emit tons of CO2."
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  const quizRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    if (optionIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
  };

  const getScoreMessage = () => {
    const percent = (score / quizQuestions.length) * 100;
    if (percent >= 80) return "Excellent! You're a carbon footprint expert!";
    if (percent >= 60) return "Good job! You have solid knowledge about carbon footprints.";
    return "You're learning! Keep exploring ways to reduce your carbon footprint.";
  };

  return (
    <section 
      ref={quizRef}
      className="relative py-24 overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-gradient-to-br from-green-100 to-sky-100 dark:from-green-900/40 dark:to-sky-900/30 -z-20"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      />
      
      {/* Parallax decorative elements */}
      <div 
        className="absolute top-40 left-[10%] w-64 h-64 rounded-full bg-green-200/20 dark:bg-green-700/10 blur-3xl -z-10"
        style={{ transform: `translate(${scrollY * 0.02}px, ${scrollY * -0.05}px)` }}
      />
      <div 
        className="absolute bottom-20 right-[5%] w-80 h-80 rounded-full bg-sky-200/30 dark:bg-sky-700/10 blur-3xl -z-10"
        style={{ transform: `translate(${scrollY * -0.03}px, ${scrollY * 0.02}px)` }}
      />
      
      <div className="max-w-5xl mx-auto px-6">
        <div 
          className="text-center mb-12"
          style={{ transform: `translateY(${Math.max(0, (scrollY - 300) * 0.08)}px)` }}
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-sky-600 dark:from-green-400 dark:to-sky-400 bg-clip-text text-transparent mb-4">
            Test Your Carbon Knowledge
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Challenge yourself with these questions about carbon footprints and climate impact. Learn how your daily choices affect the environment.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Card 
            className="w-full max-w-2xl backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-white/10 shadow-xl"
            style={{ transform: `translateY(${Math.max(0, (scrollY - 400) * 0.05)}px)` }}
          >
            <CardContent className="p-8">
              {!quizComplete ? (
                <div className="animate-fade-in">
                  <div className="mb-2 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Question {currentQuestion + 1}/{quizQuestions.length}</span>
                    <span>Score: {score}/{currentQuestion + (selectedOption !== null ? 1 : 0)}</span>
                  </div>
                  
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-sky-500 rounded-full transition-all duration-500"
                      style={{ width: `${((currentQuestion + (selectedOption !== null ? 1 : 0)) / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                    {quizQuestions[currentQuestion].question}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                          selectedOption === index
                            ? index === quizQuestions[currentQuestion].correctAnswer
                              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                              : "border-red-500 bg-red-50 dark:bg-red-900/20"
                            : selectedOption !== null && index === quizQuestions[currentQuestion].correctAnswer
                              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                              : "border-gray-200 dark:border-gray-700 hover:border-sky-400 dark:hover:border-sky-600"
                        }`}
                        onClick={() => selectedOption === null && handleOptionSelect(index)}
                        disabled={selectedOption !== null}
                      >
                        <div className="flex items-center">
                          <span className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 ${
                            selectedOption === index
                              ? index === quizQuestions[currentQuestion].correctAnswer
                                ? "bg-green-100 text-green-800 dark:bg-green-800/50 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-800/50 dark:text-red-200"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-gray-700 dark:text-gray-200">{option}</span>
                          
                          {selectedOption === index && index === quizQuestions[currentQuestion].correctAnswer && (
                            <Check className="ml-auto text-green-600 dark:text-green-400" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {showExplanation && (
                    <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-xl border border-sky-200 dark:border-sky-700 mb-6 animate-fade-in">
                      <p className="text-gray-700 dark:text-gray-200">
                        <span className="font-semibold">Explanation:</span> {quizQuestions[currentQuestion].explanation}
                      </p>
                    </div>
                  )}
                  
                  {selectedOption !== null && (
                    <Button
                      className="w-full py-3 bg-gradient-to-r from-green-500 to-sky-500 hover:from-green-600 hover:to-sky-600"
                      onClick={handleNextQuestion}
                    >
                      {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center animate-fade-in">
                  <div className="mb-6">
                    <div className="inline-block p-4 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                      {score >= 4 ? (
                        <Trophy className="h-12 w-12 text-yellow-500" />
                      ) : score >= 3 ? (
                        <Award className="h-12 w-12 text-sky-500" />
                      ) : (
                        <BookOpen className="h-12 w-12 text-green-500" />
                      )}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
                      Quiz Complete!
                    </h3>
                    <div className="flex justify-center items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-6 w-6 ${i < Math.round((score / quizQuestions.length) * 5) 
                            ? "text-yellow-400 fill-yellow-400" 
                            : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xl font-medium mb-4">
                      Your score: {score}/{quizQuestions.length}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-8">
                      {getScoreMessage()}
                    </p>
                  </div>
                  <Button 
                    className="bg-gradient-to-r from-green-500 to-sky-500 hover:from-green-600 hover:to-sky-600"
                    onClick={resetQuiz}
                  >
                    Take Quiz Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
