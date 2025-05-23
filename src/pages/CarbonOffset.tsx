
import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import DonationCard from '@/components/carbon-offset/DonationCard';
import ThankYouMessage from '@/components/carbon-offset/ThankYouMessage';
import BadgeDialog from '@/components/carbon-offset/BadgeDialog';

const CarbonOffset = () => {
  const [donationComplete, setDonationComplete] = useState(false);
  const [donationType, setDonationType] = useState<string | null>(null);
  const [showBadgeDialog, setShowBadgeDialog] = useState(false);

  const handleDonate = (type: string) => {
    // In a real app, this would process payment via Stripe or another gateway
    setDonationComplete(true);
    setDonationType(type);
    
    if (type === 'tree') {
      toast({
        title: "Thank you for your donation!",
        description: "You've earned the Eco Planter badge!",
      });
      setShowBadgeDialog(true);
    } else {
      toast({
        title: "Thank you for your donation!",
        description: "Your contribution will help offset CO2 emissions.",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
      <div className="space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold">CO2 Offsetting</h1>
        <p className="text-muted-foreground">
          Offset your carbon footprint by contributing to our eco-friendly initiatives
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Tree Plantation Card */}
          <DonationCard 
            title="Tree Plantation"
            description="Plant trees to reduce carbon footprint"
            imageSrc="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
            co2Offset="25 kg/year per tree"
            cost="₹500 per tree"
            location="Western Ghats, India"
            buttonColor="bg-green-600 hover:bg-green-700"
            type="tree"
            onDonate={handleDonate}
            showBadge={true}
          />

          {/* Solar Plant Card */}
          <DonationCard 
            title="Solar Plant Initiative"
            description="Help us build clean energy infrastructure"
            imageSrc="https://images.unsplash.com/photo-1500673922987-e212871fec22"
            co2Offset="1000 kg/year per kW"
            cost="₹2000 per kW"
            location="Rajasthan, India"
            buttonColor="bg-amber-600 hover:bg-amber-700"
            type="solar"
            onDonate={handleDonate}
          />

          {/* Water Conservation Card */}
          <DonationCard 
            title="Water Conservation"
            description="Support sustainable water management projects"
            imageSrc="https://images.unsplash.com/photo-1504893524553-b855bce32c67"
            co2Offset="500 kg/year per project"
            cost="₹1500 per project"
            location="Karnataka, India"
            buttonColor="bg-blue-600 hover:bg-blue-700"
            type="water"
            onDonate={handleDonate}
          />
        </div>

        {donationComplete && donationType && (
          <ThankYouMessage type={donationType} />
        )}
      </div>

      <BadgeDialog 
        open={showBadgeDialog} 
        onOpenChange={setShowBadgeDialog} 
      />
    </div>
  );
};

export default CarbonOffset;
