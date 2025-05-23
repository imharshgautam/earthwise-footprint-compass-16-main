
import { ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CarbonSavingCardProps {
  title: string;
  value: string;
  subValue?: string;
  progress: number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
}

const CarbonSavingCard = ({
  title,
  value,
  subValue,
  progress,
  icon,
  trend,
}: CarbonSavingCardProps) => {
  return (
    <Card className="overflow-hidden border-border/40 shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-foreground">{value}</span>
              {subValue && (
                <span className="ml-1 text-sm text-muted-foreground">{subValue}</span>
              )}
            </div>
            {trend && (
              <div className="flex items-center mt-1 text-xs">
                <span className={trend.positive ? 'text-green-500' : 'text-destructive'}>
                  {trend.positive ? '↑' : '↓'} {trend.value}
                </span>
                <span className="text-muted-foreground ml-1">vs last month</span>
              </div>
            )}
          </div>
          <div className="bg-primary/10 p-2 rounded-lg text-primary">{icon}</div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CarbonSavingCard;
