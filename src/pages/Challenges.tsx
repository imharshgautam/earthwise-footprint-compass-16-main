
import React, { useState } from 'react';
import { 
  Award, 
  Trophy, 
  CheckCircle, 
  Clock, 
  Users, 
  BarChart2, 
  Filter,
  ExternalLink 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Challenge {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  participants: number;
  completed: number;
  status: 'active' | 'completed' | 'not-started';
  progress: number;
  reward: number;
  carbonSaved: number;
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: "Plastic-Free Week",
    description: "Avoid single-use plastics for a full week. Track your progress and alternatives used.",
    category: "Waste",
    difficulty: "medium",
    duration: "7 days",
    participants: 1236,
    completed: 894,
    status: "active",
    progress: 71,
    reward: 120,
    carbonSaved: 12.5
  },
  {
    id: 2,
    title: "Meatless May",
    description: "Skip meat products for the month of May to reduce your carbon footprint from food.",
    category: "Food",
    difficulty: "hard",
    duration: "31 days",
    participants: 3540,
    completed: 1895,
    status: "not-started",
    progress: 0,
    reward: 300,
    carbonSaved: 56.2
  },
  {
    id: 3,
    title: "Public Transit Hero",
    description: "Use public transportation exclusively for at least 10 trips this month.",
    category: "Transportation",
    difficulty: "medium",
    duration: "30 days",
    participants: 2451,
    completed: 1652,
    status: "active",
    progress: 40,
    reward: 150,
    carbonSaved: 32.8
  },
  {
    id: 4,
    title: "Energy Saver",
    description: "Reduce your home energy consumption by 15% compared to last month.",
    category: "Energy",
    difficulty: "easy",
    duration: "30 days",
    participants: 5231,
    completed: 3782,
    status: "not-started",
    progress: 0,
    reward: 100,
    carbonSaved: 25.0
  },
  {
    id: 5,
    title: "Zero Waste Weekend",
    description: "Generate zero landfill waste for an entire weekend.",
    category: "Waste",
    difficulty: "medium",
    duration: "2 days",
    participants: 2189,
    completed: 1655,
    status: "completed",
    progress: 100,
    reward: 75,
    carbonSaved: 8.3
  },
  {
    id: 6,
    title: "Digital Detox Day",
    description: "Reduce electronic device usage to essential tasks only for 24 hours.",
    category: "Energy",
    difficulty: "easy",
    duration: "1 day",
    participants: 4120,
    completed: 3560,
    status: "completed",
    progress: 100,
    reward: 50,
    carbonSaved: 3.1
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-amber-100 text-amber-800';
    case 'hard':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Waste':
      return "🗑️";
    case 'Food':
      return "🍎";
    case 'Transportation':
      return "🚌";
    case 'Energy':
      return "⚡";
    default:
      return "🌿";
  }
};

const Challenges = () => {
  const [filter, setFilter] = useState('all');
  
  const filteredChallenges = challenges.filter(challenge => {
    if (filter === 'all') return true;
    return challenge.status === filter;
  });

  const startChallenge = (id: number) => {
    // In a real app, this would update the database
    console.log(`Starting challenge ${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-6 md:px-6 md:py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            Eco Challenges
          </h1>
          <p className="text-muted-foreground">
            Complete challenges to earn rewards and reduce your carbon footprint
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Challenges</SelectItem>
              <SelectItem value="active">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="not-started">Not Started</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredChallenges.map((challenge) => (
          <Card key={challenge.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getCategoryIcon(challenge.category)}</span>
                  <Badge className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                  </Badge>
                </div>
                {challenge.status === 'completed' && (
                  <Trophy className="h-5 w-5 text-amber-500" />
                )}
              </div>
              <CardTitle className="text-xl mt-2">{challenge.title}</CardTitle>
              <CardDescription className="line-clamp-2">{challenge.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex justify-between text-sm mb-1">
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {challenge.duration}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  {challenge.participants.toLocaleString()} participants
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span className="font-medium">{challenge.progress}%</span>
                </div>
                <Progress value={challenge.progress} className="h-2" />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="bg-secondary p-2 rounded-md">
                  <p className="text-muted-foreground text-xs">Rewards</p>
                  <p className="font-medium">{challenge.reward} points</p>
                </div>
                <div className="bg-secondary p-2 rounded-md">
                  <p className="text-muted-foreground text-xs">CO₂ Savings</p>
                  <p className="font-medium">{challenge.carbonSaved} kg</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              {challenge.status === 'not-started' ? (
                <Button className="w-full" onClick={() => startChallenge(challenge.id)}>
                  Join Challenge
                </Button>
              ) : challenge.status === 'active' ? (
                <Button variant="outline" className="w-full">
                  Continue Challenge
                </Button>
              ) : (
                <Button variant="secondary" className="w-full" disabled>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Completed
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredChallenges.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No challenges match your filter.</p>
          <Button 
            variant="link" 
            className="mt-2"
            onClick={() => setFilter('all')}
          >
            View all challenges
          </Button>
        </div>
      )}
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-primary" />
            Challenge Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-secondary rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Challenges Completed</h3>
              <p className="text-2xl font-bold">{challenges.filter(c => c.status === 'completed').length}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Out of {challenges.length} available challenges
              </p>
            </div>
            <div className="bg-secondary rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">CO₂ Saved Through Challenges</h3>
              <p className="text-2xl font-bold">
                {challenges
                  .filter(c => c.status === 'completed')
                  .reduce((acc, curr) => acc + curr.carbonSaved, 0).toFixed(1)} kg
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Equivalent to planting 2 trees
              </p>
            </div>
            <div className="bg-secondary rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Points Earned</h3>
              <p className="text-2xl font-bold">
                {challenges
                  .filter(c => c.status === 'completed')
                  .reduce((acc, curr) => acc + curr.reward, 0)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Exchange points for rewards or tree planting
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenges;
