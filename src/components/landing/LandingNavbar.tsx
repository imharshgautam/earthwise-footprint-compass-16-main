
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TreeDeciduous, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const LandingNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16",
        scrolled 
          ? "backdrop-blur-md shadow-md" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-green-50">
            <div className="relative">
              <TreeDeciduous className="h-7 w-7 text-green-400" />
              <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-green-300 rounded-full"></span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-300 to-green-100 bg-clip-text text-transparent">
              GreenMiles
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <Link to="/calculate-impact" className="text-green-200 hover:text-white transition-colors text-base font-medium">
              Calculate Impact
            </Link>
            <Link to="/tree-tracker" className="text-green-200 hover:text-white transition-colors text-base font-medium">
              Tree Tracker
            </Link>
            <Link to="/challenges" className="text-green-200 hover:text-white transition-colors text-base font-medium">
              Challenges
            </Link>
            <Link to="/learn" className="text-green-200 hover:text-white transition-colors text-base font-medium">
              Learn More
            </Link>
            <Link to="/carbon-offset" className="text-green-200 hover:text-white transition-colors text-base font-medium">
              Carbon Offset
            </Link>
            {/* <Link to="/login" className="text-green-200 hover:text-white transition-colors text-base font-semibold underline underline-offset-4 pl-2">
              Log In
            </Link> */}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="ghost" className="text-green-200 hover:text-white hover:bg-green-800">
              <Link to="/login">Log In</Link>
            </Button>
            <Button asChild className="bg-green-500 text-green-950 hover:bg-green-400 shadow-lg shadow-green-500/20 rounded-md">
              <Link to="/login">Get Started</Link>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-green-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden backdrop-blur-md border-t border-green-800/30">
          <div className="flex flex-col py-4 px-4 space-y-3">
            <Link 
              to="/calculate-impact" 
              className="text-green-200 hover:text-white py-2 px-3 rounded-md hover:bg-green-800/30 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Calculate Impact
            </Link>
            <Link 
              to="/tree-tracker" 
              className="text-green-200 hover:text-white py-2 px-3 rounded-md hover:bg-green-800/30 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tree Tracker
            </Link>
            <Link 
              to="/challenges" 
              className="text-green-200 hover:text-white py-2 px-3 rounded-md hover:bg-green-800/30 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Challenges
            </Link>
            <Link 
              to="/learn" 
              className="text-green-200 hover:text-white py-2 px-3 rounded-md hover:bg-green-800/30 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Learn More
            </Link>
            <Link 
              to="/carbon-offset" 
              className="text-green-200 hover:text-white py-2 px-3 rounded-md hover:bg-green-800/30 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Carbon Offset
            </Link>
            <Link 
              to="/login"
              className="text-green-200 hover:text-white py-2 px-3 rounded-md hover:bg-green-800/30 transition-colors font-semibold underline underline-offset-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Log In
            </Link>
            <div className="pt-2 flex flex-col space-y-2">
              <Button asChild variant="outline" className="border-green-700/50 text-green-200">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Log In</Link>
              </Button>
              <Button asChild className="bg-green-500 text-green-950 hover:bg-green-400 rounded-md">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingNavbar;
