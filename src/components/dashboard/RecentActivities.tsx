
import { Activity, Bike, Car, Train, Utensils } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const activities = [
  {
    id: 1,
    type: 'transportation',
    description: 'Biked to work instead of driving',
    date: 'Today',
    icon: Bike,
    points: 25,
    carbonSaved: 3.2,
  },
  {
    id: 2,
    type: 'transportation',
    description: 'Used public transportation',
    date: 'Yesterday',
    icon: Train,
    points: 15,
    carbonSaved: 2.7,
  },
  {
    id: 3,
    type: 'food',
    description: 'Plant-based meal',
    date: '2 days ago',
    icon: Utensils,
    points: 10,
    carbonSaved: 1.5,
  },
  {
    id: 4,
    type: 'transportation',
    description: 'Carpooled with colleagues',
    date: '3 days ago',
    icon: Car,
    points: 15,
    carbonSaved: 2.1,
  },
];

const getIconColor = (type: string) => {
  switch (type) {
    case 'transportation':
      return 'text-sky-500';
    case 'food':
      return 'text-green-500';
    case 'energy':
      return 'text-amber-500';
    default:
      return 'text-primary';
  }
};

const getIconBg = (type: string) => {
  switch (type) {
    case 'transportation':
      return 'bg-sky-100';
    case 'food':
      return 'bg-green-100';
    case 'energy':
      return 'bg-amber-100';
    default:
      return 'bg-primary/20';
  }
};

const RecentActivities = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium flex items-center">
          <Activity className="h-4 w-4 mr-2" />
          Recent Activities
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0 divide-y">
          {activities.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <div key={activity.id} className="p-4 flex items-center">
                <div className={`p-2 rounded-full ${getIconBg(activity.type)} mr-3`}>
                  <IconComponent className={`h-4 w-4 ${getIconColor(activity.type)}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">+{activity.points} pts</p>
                  <p className="text-xs text-green-600">{activity.carbonSaved} kg CO₂ saved</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
