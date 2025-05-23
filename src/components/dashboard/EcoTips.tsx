
import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface Tip {
  id: number;
  title: string;
  description: string;
  category: string;
}

const tips: Tip[] = [
  {
    id: 1,
    title: 'Reduce Shower Time',
    description: 'Cutting your shower time by just 2 minutes can save up to 10 gallons of water.',
    category: 'Water',
  },
  {
    id: 2,
    title: 'Use LED Bulbs',
    description: 'LED light bulbs use up to 90% less energy than incandescent bulbs.',
    category: 'Energy',
  },
  {
    id: 3,
    title: 'Meal Prep Sunday',
    description: 'Preparing meals for the week reduces food waste and packaging.',
    category: 'Food',
  },
  {
    id: 4,
    title: 'Try Meatless Monday',
    description: 'Going meatless once a week can reduce your carbon footprint by up to 8 pounds.',
    category: 'Food',
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Water':
      return 'bg-blue-100 text-blue-800';
    case 'Energy':
      return 'bg-amber-100 text-amber-800';
    case 'Food':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const EcoTips = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium flex items-center">
          <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />
          Eco Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel className="w-full">
          <CarouselContent>
            {tips.map((tip) => (
              <CarouselItem key={tip.id}>
                <Card className="border-0 shadow-none">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{tip.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getCategoryColor(tip.category)}`}>
                        {tip.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-1 pt-2">
            <CarouselPrevious className="relative h-7 w-7 rounded-full" />
            <CarouselNext className="relative h-7 w-7 rounded-full" />
          </div>
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default EcoTips;
