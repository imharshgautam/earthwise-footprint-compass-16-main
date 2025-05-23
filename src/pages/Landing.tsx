
import React from 'react';
import ParallaxHero from '@/components/landing/ParallaxHero';
import FeaturesSection from '@/components/landing/FeaturesSection';
import CtaSection from '@/components/landing/CtaSection';
import Footer from '@/components/landing/Footer';
import LandingNavbar from '@/components/landing/LandingNavbar';

const Landing = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-transparent">
      <LandingNavbar />
      <ParallaxHero />
      <FeaturesSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Landing;
