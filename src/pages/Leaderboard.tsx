
import React, { useState } from 'react';
import { 
  Trophy, 
  ArrowUp, 
  ArrowDown, 
  Medal, 
  User,
  UserCircle2,
  Calendar,
  Clock,
  Filter,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface UserRank {
  id: number;
  name: string;
  avatar: string;
  points: number;
  trees: number;
  carbonSaved: number;
  trend: number;
  rank: number;
  level: number;
  isCurrentUser?: boolean;
}

const usersData: UserRank[] = [
  { id: 1, name: "Emma Wilson", avatar: "EW", points: 2450, trees: 28, carbonSaved: 543.2, trend: 3, rank: 1, level: 8 },
  { id: 2, name: "James Chen", avatar: "JC", points: 2310, trees: 25, carbonSaved: 478.5, trend: 0, rank: 2, level: 7 },
  { id: 3, name: "Sophia Garcia", avatar: "SG", points: 2180, trees: 22, carbonSaved: 412.7, trend: 1, rank: 3, level: 7 },
  { id: 4, name: "Liam Johnson", avatar: "LJ", points: 1950, trees: 19, carbonSaved: 386.4, trend: -2, rank: 4, level: 6 },
  { id: 5, name: "Olivia Martinez", avatar: "OM", points: 1820, trees: 18, carbonSaved: 342.8, trend: 2, rank: 5, level: 6 },
  { id: 6, name: "Noah Williams", avatar: "NW", points: 1760, trees: 16, carbonSaved: 312.5, trend: -1, rank: 6, level: 5 },
  { id: 7, name: "Ava Brown", avatar: "AB", points: 1650, trees: 15, carbonSaved: 298.3, trend: 0, rank: 7, level: 5 },
  { id: 8, name: "Ethan Davis", avatar: "ED", points: 1540, trees: 14, carbonSaved: 265.7, trend: 1, rank: 8, level: 5 },
  { id: 9, name: "Mia Rodriguez", avatar: "MR", points: 1480, trees: 12, carbonSaved: 242.9, trend: 3, rank: 9, level: 4 },
  { id: 10, name: "Isabella Lopez", avatar: "IL", points: 1420, trees: 12, carbonSaved: 231.6, trend: -3, rank: 10, level: 4 },
  { id: 11, name: "Alexander Smith", avatar: "AS", points: 1380, trees: 11, carbonSaved: 214.2, trend: 0, rank: 11, level: 4 },
  { id: 12, name: "Charlotte Wilson", avatar: "CW", points: 1320, trees: 10, carbonSaved: 201.8, trend: 2, rank: 12, level: 4 },
  { id: 13, name: "Benjamin Taylor", avatar: "BT", points: 1260, trees: 10, carbonSaved: 187.3, trend: -2, rank: 13, level: 3 },
  { id: 14, name: "John Doe", avatar: "JD", points: 1210, trees: 9, carbonSaved: 176.5, trend: 1, rank: 14, level: 3, isCurrentUser: true },
  { id: 15, name: "Amelia Anderson", avatar: "AA", points: 1150, trees: 8, carbonSaved: 163.2, trend: -1, rank: 15, level: 3 },
];

const getTrendIcon = (trend: number) => {
  if (trend > 0) return <ArrowUp className="h-4 w-4 text-green-500" />;
  if (trend < 0) return <ArrowDown className="h-4 w-4 text-destructive" />;
  return null;
};

const getTrendText = (trend: number) => {
  if (trend === 0) return "No change";
  const prefix = trend > 0 ? "+" : "";
  return `${prefix}${trend} positions`;
};

const getRankBadge = (rank: number) => {
  if (rank === 1) return <Trophy className="h-5 w-5 text-amber-500" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (rank === 3) return <Medal className="h-5 w-5 text-amber-700" />;
  return rank;
};

const Leaderboard = () => {
  const [timeRange, setTimeRange] = useState('all-time');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const currentUserRank = usersData.find(user => user.isCurrentUser)?.rank || 0;

  return (
    <div className="container mx-auto px-4 py-6 md:px-6 md:py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6 text-amber-500" />
            Leaderboard
          </h1>
          <p className="text-muted-foreground">
            See how you stack up against other eco-warriors
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-time">All Time</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Your Rank</p>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold">#{currentUserRank}</p>
                  <p className="text-sm text-muted-foreground ml-2">of {usersData.length}</p>
                </div>
              </div>
              <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Trophy className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Your Points</p>
                <p className="text-3xl font-bold">1,210</p>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Points to Next Rank</p>
                <p className="text-3xl font-bold">51</p>
              </div>
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <ArrowUp className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          className="pl-9" 
          placeholder="Search users by name" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="points" className="mb-6">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="points">Points</TabsTrigger>
          <TabsTrigger value="trees">Trees Planted</TabsTrigger>
          <TabsTrigger value="carbon">Carbon Saved</TabsTrigger>
        </TabsList>
        
        <TabsContent value="points">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground w-16">Rank</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">User</th>
                      <th className="px-4 py-3 text-right font-medium text-muted-foreground">Level</th>
                      <th className="px-4 py-3 text-right font-medium text-muted-foreground">Points</th>
                      <th className="px-4 py-3 text-right font-medium text-muted-foreground">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr 
                        key={user.id} 
                        className={`border-b last:border-0 hover:bg-muted/30 ${user.isCurrentUser ? 'bg-secondary' : ''}`}
                      >
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center items-center">
                            {typeof getRankBadge(user.rank) === 'number' ? (
                              <span className="font-medium">{getRankBadge(user.rank)}</span>
                            ) : (
                              getRankBadge(user.rank)
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mr-3">
                              {user.avatar}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {user.name}
                                {user.isCurrentUser && <span className="ml-2 text-xs text-muted-foreground">(You)</span>}
                              </span>
                              <span className="text-xs text-muted-foreground">{user.trees} trees planted</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Badge variant="outline">Level {user.level}</Badge>
                        </td>
                        <td className="px-4 py-3 text-right font-medium">{user.points.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end">
                            {getTrendIcon(user.trend)}
                            <span className={`text-sm ml-1 ${user.trend > 0 ? 'text-green-500' : user.trend < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                              {getTrendText(user.trend)}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trees">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground w-16">Rank</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">User</th>
                      <th className="px-4 py-3 text-right font-medium text-muted-foreground">Level</th>
                      <th className="px-4 py-3 text-right font-medium text-muted-foreground">Trees</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...filteredUsers].sort((a, b) => b.trees - a.trees).map((user, index) => (
                      <tr 
                        key={user.id} 
                        className={`border-b last:border-0 hover:bg-muted/30 ${user.isCurrentUser ? 'bg-secondary' : ''}`}
                      >
                        <td className="px-4 py-3 text-center font-medium">{index + 1}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mr-3">
                              {user.avatar}
                            </div>
                            <span className="font-medium">
                              {user.name}
                              {user.isCurrentUser && <span className="ml-2 text-xs text-muted-foreground">(You)</span>}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Badge variant="outline">Level {user.level}</Badge>
                        </td>
                        <td className="px-4 py-3 text-right font-medium">{user.trees}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="carbon">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground w-16">Rank</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">User</th>
                      <th className="px-4 py-3 text-right font-medium text-muted-foreground">Level</th>
                      <th className="px-4 py-3 text-right font-medium text-muted-foreground">CO₂ Saved (kg)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...filteredUsers].sort((a, b) => b.carbonSaved - a.carbonSaved).map((user, index) => (
                      <tr 
                        key={user.id} 
                        className={`border-b last:border-0 hover:bg-muted/30 ${user.isCurrentUser ? 'bg-secondary' : ''}`}
                      >
                        <td className="px-4 py-3 text-center font-medium">{index + 1}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mr-3">
                              {user.avatar}
                            </div>
                            <span className="font-medium">
                              {user.name}
                              {user.isCurrentUser && <span className="ml-2 text-xs text-muted-foreground">(You)</span>}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Badge variant="outline">Level {user.level}</Badge>
                        </td>
                        <td className="px-4 py-3 text-right font-medium">{user.carbonSaved.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Upcoming Events & Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 rounded-lg border">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-md flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-700" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Earth Day Challenge</h3>
                <p className="text-sm text-muted-foreground">Double points for all activities logged on Earth Day</p>
                <div className="flex items-center mt-2 text-sm">
                  <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground">April 22, 2025</span>
                </div>
              </div>
              <Button variant="outline" size="sm">Remind Me</Button>
            </div>
            
            <div className="flex items-start gap-4 p-3 rounded-lg border">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center">
                <Trophy className="h-6 w-6 text-blue-700" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Community Cleanup Challenge</h3>
                <p className="text-sm text-muted-foreground">Join your local community for a special cleanup event</p>
                <div className="flex items-center mt-2 text-sm">
                  <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground">June 5, 2025</span>
                </div>
              </div>
              <Button size="sm">Join Challenge</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
