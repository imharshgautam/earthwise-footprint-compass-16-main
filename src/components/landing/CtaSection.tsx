
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CtaSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1586962358070-16a0f05b8e67?q=80&w=2574" 
          alt="Forest Background" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white tracking-tight">Ready to start your green journey?</h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto text-green-100 leading-relaxed">
          Join thousands of people who are making a difference for our planet
          with simple everyday actions. It only takes a minute to get started.
        </p>
        
        <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-green-950 text-base px-8 py-7 shadow-lg shadow-black/30 hover:shadow-xl transition-all rounded-md">
          <Link to="/login">
            Start Tracking Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;
