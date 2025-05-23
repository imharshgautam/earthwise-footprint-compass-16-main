
import React from 'react';
import { CircleDollarSign, Badge } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge as BadgeUI } from '@/components/ui/badge';

interface DonationCardProps {
  title: string;
  description: string;
  imageSrc: string;
  co2Offset: string;
  cost: string;
  location: string;
  buttonColor: string;
  type: string;
  onDonate: (type: string) => void;
  showBadge?: boolean;
}

const DonationCard = ({
  title,
  description,
  imageSrc,
  co2Offset,
  cost,
  location,
  buttonColor,
  type,
  onDonate,
  showBadge = false,
}: DonationCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="h-48 overflow-hidden rounded-t-lg mb-2">
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>CO2 Offset</span>
            <span className="font-medium">{co2Offset}</span>
          </div>
          <div className="flex justify-between">
            <span>Cost</span>
            <span className="font-medium">{cost}</span>
          </div>
          <div className="flex justify-between">
            <span>Location</span>
            <span className="font-medium">{location}</span>
          </div>
          {showBadge && (
            <div className="flex items-center mt-4">
              <Badge className="mr-2 bg-green-600" />
              <span className="text-sm">Earn an Eco Planter badge</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onDonate(type)} className={`w-full ${buttonColor}`}>
          <CircleDollarSign className="mr-2 h-4 w-4" />
          Donate Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DonationCard;
