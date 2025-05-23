
import React from 'react';
import { TreeDeciduous } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge as BadgeUI } from '@/components/ui/badge';

interface ThankYouMessageProps {
  type: string;
}

const ThankYouMessage = ({ type }: ThankYouMessageProps) => {
  let colorClasses = 'border-green-200 bg-green-50';
  let textColor = 'text-green-800';
  let badgeComponent = null;

  if (type === 'tree') {
    badgeComponent = (
      <div className="flex items-center gap-2 mb-2">
        <BadgeUI variant="outline" className="bg-green-100 text-green-800 border-green-300">
          <TreeDeciduous className="h-4 w-4 mr-1" /> Eco Planter
        </BadgeUI>
        <span className="text-sm text-green-700">Badge earned!</span>
      </div>
    );
  } else if (type === 'solar') {
    colorClasses = 'border-amber-200 bg-amber-50';
    textColor = 'text-amber-800';
  } else if (type === 'water') {
    colorClasses = 'border-blue-200 bg-blue-50';
    textColor = 'text-blue-800';
  }

  return (
    <div className={`mt-8 p-6 border ${colorClasses} rounded-lg`}>
      <h2 className={`text-xl font-semibold ${textColor} mb-2`}>Thank You for Your Donation!</h2>
      
      {type === 'tree' ? (
        <p className="mb-4">Your tree has been added to your profile. You can track its growth and impact over time.</p>
      ) : (
        <p>Your contribution has been recorded. We'll keep you updated on the project's progress.</p>
      )}

      {badgeComponent}

      {type === 'tree' && (
        <Button 
          variant="link" 
          className="p-0 text-green-700"
          onClick={() => window.location.href = '/tree-tracker'}
        >
          View in Tree Tracker →
        </Button>
      )}
    </div>
  );
};

export default ThankYouMessage;
