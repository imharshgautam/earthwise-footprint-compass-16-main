
import React, { useEffect, useRef } from 'react';
import { TreeDeciduous, Activity, Leaf, Users } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.setAttribute('style', 'opacity: 1');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const featureElements = featuresRef.current?.querySelectorAll('.feature-item');
    featureElements?.forEach((el) => {
      el.setAttribute('style', 'opacity: 1');
      observer.observe(el);
    });
    
    return () => {
      featureElements?.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);
  
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-black to-[#0a0a0a] relative">
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="fill-black">
          <path d="M0,160L48,149.3C96,139,192,117,288,133.3C384,149,480,203,576,208C672,213,768,171,864,154.7C960,139,1056,149,1152,154.7C1248,160,1344,160,1392,160L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">How GreenMiles Works</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our platform makes it easy to understand and reduce your environmental impact
            through simple daily actions.
          </p>
        </div>
        
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="feature-item" style={{ opacity: 1, transitionDelay: '0.1s' }}>
            <FeatureCard
              title="Track Activities"
              description="Log your daily eco-friendly activities and see the impact they make on your carbon footprint."
              icon={<Activity className="h-6 w-6 text-white" />}
              color="bg-blue-600"
            />
          </div>
          
          <div className="feature-item" style={{ opacity: 1, transitionDelay: '0.3s' }}>
            <FeatureCard
              title="Plant Trees"
              description="Watch your virtual forest grow as you earn points and plant real trees through our partners."
              icon={<TreeDeciduous className="h-6 w-6 text-white" />}
              color="bg-green-600"
            />
          </div>
          
          <div className="feature-item" style={{ opacity: 1, transitionDelay: '0.5s' }}>
            <FeatureCard
              title="Reduce Carbon"
              description="Get personalized recommendations to reduce your carbon footprint based on your habits."
              icon={<Leaf className="h-6 w-6 text-white" />}
              color="bg-purple-600"
            />
          </div>
          
          <div className="feature-item" style={{ opacity: 1, transitionDelay: '0.7s' }}>
            <FeatureCard
              title="Join Community"
              description="Connect with like-minded people and participate in eco-challenges together."
              icon={<Users className="h-6 w-6 text-white" />}
              color="bg-orange-600"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
