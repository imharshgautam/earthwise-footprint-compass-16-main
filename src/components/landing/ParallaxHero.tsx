
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ParallaxHero = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="parallax-container" style={{ marginTop: "-10rem", height: "110vh" }}>
      {/* Sky Background Layer */}
      <div 
        className="parallax-layer parallax-layer-6 h-full bg-cover bg-center absolute top-0 left-0 right-0 bottom-0"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2574')", 
          transform: `translateZ(-6px) scale(1.75) translateY(${scrollY * 0.3}px)`,
          zIndex: -1 // Ensure the background is behind everything
        }}
      />
      
      {/* Distant Mountains Layer with Forest */}
      <div 
        className="parallax-layer parallax-layer-5 h-full"
        style={{ transform: `translateZ(-5px) scale(1.625) translateY(${scrollY * 0.25}px)` }}
      >
        <div className="absolute bottom-0 w-full">
          <img 
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2670" 
            className="w-full h-auto" 
            alt="Distant Forest"
            style={{ maskImage: "linear-gradient(to bottom, transparent, black)" }}
          />
        </div>
      </div>
      
      {/* Middle Forest Layer */}
      <div 
        className="parallax-layer parallax-layer-4 h-full"
        style={{ transform: `translateZ(-4px) scale(1.5) translateY(${scrollY * 0.2}px)` }}
      >
        <div className="absolute bottom-0 w-full">
          <img 
            src="https://images.unsplash.com/photo-1615929378383-687ccc635154?q=80&w=2574" 
            className="w-full h-auto" 
            alt="Middle Forest"
            style={{ maskImage: "linear-gradient(to bottom, transparent 30%, black)" }}
          />
        </div>
      </div>
      
      {/* Closer Trees Layer */}
      <div 
        className="parallax-layer parallax-layer-3 h-full"
        style={{ transform: `translateZ(-3px) scale(1.375) translateY(${scrollY * 0.15}px)` }}
      >
        <div className="absolute bottom-0 w-full">
          <img 
            src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2532" 
            className="w-full h-auto" 
            alt="Close Trees"
            style={{ maskImage: "linear-gradient(to bottom, transparent 50%, black)" }}
          />
        </div>
      </div>
      
      {/* Foreground Trees */}
      <div 
        className="parallax-layer parallax-layer-2 h-full"
        style={{ transform: `translateZ(-2px) scale(1.25) translateY(${scrollY * 0.1}px)` }}
      >
        <div className="absolute bottom-0 w-full">
          <img 
            src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2574" 
            className="w-full h-auto" 
            alt="Foreground Trees"
            style={{ maskImage: "linear-gradient(to bottom, transparent 60%, black)" }}
          />
        </div>
      </div>
      
      {/* Content Layer */}
      <div className="parallax-layer parallax-layer-0 h-full flex items-center">
        <div className="container mx-auto px-6 py-32 pt-56 relative z-10">
          <div className="max-w-3xl hero-animate">
            <div className="inline-block mb-6 px-4 py-2 bg-green-900/30 backdrop-blur-sm border border-green-700/20 rounded-full">
              <div className="flex items-center text-sm font-medium text-green-200">
                <Leaf className="h-4 w-4 mr-2 animate-pulse text-green-400" />
                <span>Reduce your carbon footprint with ease</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
              Track Your Impact on <br />
              <span className="text-green-400">Our Green Planet</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-green-100 mb-10 max-w-2xl drop-shadow leading-relaxed">
              GreenMiles helps you make a difference by tracking, reducing, 
              and sharing your eco-friendly actions to combat climate change.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 staggered-fade-in">
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-green-950 text-base px-8 py-7 shadow-lg shadow-green-500/20 rounded-md">
                <Link to="/login">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-green-700 text-green-600 hover:bg-green-800/50 hover:text-white hover:border-green-600 text-base px-8 py-7 rounded-md">
                <a href="#features">
                  Learn More
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxHero;
