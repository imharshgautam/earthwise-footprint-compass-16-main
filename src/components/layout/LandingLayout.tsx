
import React from 'react';

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col text-green-100 relative">
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default LandingLayout;
