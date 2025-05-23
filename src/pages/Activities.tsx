
import React, { useState } from 'react';
import { 
  Car, 
  Bike, 
  Train, 
  Utensils, 
  Lightbulb, 
  ShoppingBag, 
  PlusCircle,
  Leaf,
  User,
  Trash
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface Activity {
  id: number;
  type: string;
  description: string;
  date: string;
  carbonSaved: number;
  points: number;
}

const ACTIVITY_TYPES = [
  { value: 'transport', label: 'Transportation', icon: Car },
  { value: 'food', label: 'Food', icon: Utensils },
  { value: 'energy', label: 'Energy', icon: Lightbulb },
  { value: 'shopping', label: 'Shopping', icon: ShoppingBag },
];

const mockActivities: Activity[] = [
  { id: 1, type: 'transport', description: 'Commuted by bike instead of car', date: '2025-05-20', carbonSaved: 3.2, points: 25 },
  { id: 2, type: 'food', description: 'Chose plant-based lunch', date: '2025-05-20', carbonSaved: 1.8, points: 15 },
  { id: 3, type: 'transport', description: 'Used public transit for shopping trip', date: '2025-05-19', carbonSaved: 2.7, points: 20 },
  { id: 4, type: 'energy', description: 'Air-dried laundry instead of using dryer', date: '2025-05-18', carbonSaved: 1.5, points: 10 },
  { id: 5, type: 'shopping', description: 'Purchased second-hand furniture', date: '2025-05-17', carbonSaved: 4.5, points: 30 },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'transport':
      return <Car className="h-5 w-5" />;
    case 'food':
      return <Utensils className="h-5 w-5" />;
    case 'energy':
      return <Lightbulb className="h-5 w-5" />;
    case 'shopping':
      return <ShoppingBag className="h-5 w-5" />;
    default:
      return <Leaf className="h-5 w-5" />;
  }
};

const Activities = () => {
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [open, setOpen] = useState(false);
  const [activityType, setActivityType] = useState('');
  const [description, setDescription] = useState('');

  const handleAddActivity = () => {
    if (!activityType || !description) return;
    
    const newActivity: Activity = {
      id: Date.now(),
      type: activityType,
      description,
      date: new Date().toISOString().split('T')[0],
      carbonSaved: Math.round(Math.random() * 30 + 10) / 10,
      points: Math.round(Math.random() * 20 + 5),
    };
    
    setActivities([newActivity, ...activities]);
    setOpen(false);
    setActivityType('');
    setDescription('');
  };

  const handleDeleteActivity = (id: number) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const groupedActivities = activities.reduce<Record<string, Activity[]>>((acc, activity) => {
    if (!acc[activity.date]) {
      acc[activity.date] = [];
    }
    acc[activity.date].push(activity);
    return acc;
  }, {});

  const dates = Object.keys(groupedActivities).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div className="container mx-auto px-4 py-6 md:px-6 md:py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Log Activities</h1>
          <p className="text-muted-foreground">
            Track your eco-friendly actions and earn rewards
          </p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Log New Activity
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log a New Activity</DialogTitle>
              <DialogDescription>
                Record your eco-friendly activity to earn points and track your impact.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="activity-type">Activity Type</Label>
                <Select value={activityType} onValueChange={setActivityType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ACTIVITY_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <type.icon className="h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Describe your eco-friendly activity"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleAddActivity}>Save Activity</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Activities</TabsTrigger>
          <TabsTrigger value="transport">Transportation</TabsTrigger>
          <TabsTrigger value="food">Food</TabsTrigger>
          <TabsTrigger value="energy">Energy</TabsTrigger>
          <TabsTrigger value="shopping">Shopping</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardContent className="p-0">
              {dates.length > 0 ? (
                <div>
                  {dates.map((date) => (
                    <div key={date}>
                      <div className="px-6 py-3 bg-muted/30">
                        <h3 className="font-medium text-sm">
                          {new Date(date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </h3>
                      </div>
                      <div>
                        {groupedActivities[date].map((activity) => (
                          <div key={activity.id} className="flex items-center p-4 hover:bg-muted/20 border-b">
                            <div className="flex-shrink-0 mr-4">
                              <div className="p-2 bg-secondary rounded-full">
                                {getActivityIcon(activity.type)}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium">{activity.description}</p>
                              <div className="flex mt-1 gap-4">
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Leaf className="h-3.5 w-3.5 mr-1 text-green-500" />
                                  {activity.carbonSaved} kg CO₂ saved
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <User className="h-3.5 w-3.5 mr-1 text-primary" />
                                  {activity.points} points earned
                                </div>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="ml-2 text-muted-foreground hover:text-destructive"
                              onClick={() => handleDeleteActivity(activity.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">No activities logged yet.</p>
                  <Button 
                    variant="link" 
                    className="mt-2"
                    onClick={() => setOpen(true)}
                  >
                    Log your first activity
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {ACTIVITY_TYPES.map((type) => (
          <TabsContent key={type.value} value={type.value} className="mt-4">
            <Card>
              <CardContent className="p-0">
                {activities.filter(a => a.type === type.value).length > 0 ? (
                  <div>
                    {dates
                      .filter(date => groupedActivities[date].some(a => a.type === type.value))
                      .map((date) => (
                        <div key={date}>
                          <div className="px-6 py-3 bg-muted/30">
                            <h3 className="font-medium text-sm">
                              {new Date(date).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </h3>
                          </div>
                          <div>
                            {groupedActivities[date]
                              .filter(a => a.type === type.value)
                              .map((activity) => (
                                <div key={activity.id} className="flex items-center p-4 hover:bg-muted/20 border-b">
                                  <div className="flex-shrink-0 mr-4">
                                    <div className="p-2 bg-secondary rounded-full">
                                      {getActivityIcon(activity.type)}
                                    </div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium">{activity.description}</p>
                                    <div className="flex mt-1 gap-4">
                                      <div className="flex items-center text-sm text-muted-foreground">
                                        <Leaf className="h-3.5 w-3.5 mr-1 text-green-500" />
                                        {activity.carbonSaved} kg CO₂ saved
                                      </div>
                                      <div className="flex items-center text-sm text-muted-foreground">
                                        <User className="h-3.5 w-3.5 mr-1 text-primary" />
                                        {activity.points} points earned
                                      </div>
                                    </div>
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="ml-2 text-muted-foreground hover:text-destructive"
                                    onClick={() => handleDeleteActivity(activity.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">No {type.label.toLowerCase()} activities logged yet.</p>
                    <Button 
                      variant="link" 
                      className="mt-2"
                      onClick={() => setOpen(true)}
                    >
                      Log a {type.label.toLowerCase()} activity
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-md font-medium">Tips for Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-secondary p-4 rounded-lg">
              <div className="mb-2 flex items-center gap-2">
                <Car className="h-5 w-5 text-sky-600" />
                <h3 className="font-medium">Transportation</h3>
              </div>
              <p className="text-sm text-muted-foreground">Try biking, using public transit, or carpooling to reduce emissions.</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <div className="mb-2 flex items-center gap-2">
                <Utensils className="h-5 w-5 text-green-600" />
                <h3 className="font-medium">Food</h3>
              </div>
              <p className="text-sm text-muted-foreground">Choose plant-based meals and locally sourced foods to reduce your carbon footprint.</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <div className="mb-2 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                <h3 className="font-medium">Energy</h3>
              </div>
              <p className="text-sm text-muted-foreground">Turn off appliances, use LED bulbs, and opt for air-drying clothes when possible.</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <div className="mb-2 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-purple-600" />
                <h3 className="font-medium">Shopping</h3>
              </div>
              <p className="text-sm text-muted-foreground">Buy second-hand items, choose products with less packaging, and opt for durable goods.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Activities;
