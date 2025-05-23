
import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactElement;
  color: string;
}

const FeatureCard = ({ title, description, icon, color }: FeatureCardProps) => {
  return (
    <div className="p-6 rounded-xl backdrop-blur-sm bg-[#0f0f0f] border border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group hover:translate-y-[-2px]">
      <div className={`${color} p-3 rounded-lg inline-block mb-4 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
