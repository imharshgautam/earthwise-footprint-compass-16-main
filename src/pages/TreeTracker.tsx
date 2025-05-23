
import React, { useState } from 'react';
import { 
  TreeDeciduous, 
  Plus, 
  Map, 
  CalendarDays, 
  Info, 
  Clock, 
  Search,
  MapPin,
  Leaf,
  Heart,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface Tree {
  id: number;
  species: string;
  location: string;
  country: string;
  plantDate: string;
  ageMonths: number;
  imageUrl: string;
  status: 'healthy' | 'growing' | 'planted';
  co2Absorbed: number;
}

const trees: Tree[] = [
  {
    id: 1,
    species: "Amazon Rainforest Mahogany",
    location: "Amazon Rainforest",
    country: "Brazil",
    plantDate: "2025-03-15",
    ageMonths: 2,
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=500&h=400",
    status: "growing",
    co2Absorbed: 2.3
  },
  {
    id: 2,
    species: "Borneo Ironwood",
    location: "Borneo",
    country: "Indonesia",
    plantDate: "2025-02-28",
    ageMonths: 3,
    imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&q=80&w=500&h=400",
    status: "healthy",
    co2Absorbed: 3.1
  },
  {
    id: 3,
    species: "Western Ghats Teak",
    location: "Western Ghats",
    country: "India",
    plantDate: "2025-01-12",
    ageMonths: 4,
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=500&h=400",
    status: "healthy",
    co2Absorbed: 4.8
  },
  {
    id: 4,
    species: "Costa Rican Rubber Tree",
    location: "Monteverde Cloud Forest",
    country: "Costa Rica",
    plantDate: "2025-04-05",
    ageMonths: 1,
    imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=500&h=400",
    status: "planted",
    co2Absorbed: 1.1
  },
  {
    id: 5,
    species: "Madagascar Baobab",
    location: "Avenue of the Baobabs",
    country: "Madagascar",
    plantDate: "2025-02-10",
    ageMonths: 3,
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=500&h=400",
    status: "growing",
    co2Absorbed: 2.7
  }
];

const TreeTracker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const totalTrees = trees.length;
  const totalCO2Absorbed = trees.reduce((sum, tree) => sum + tree.co2Absorbed, 0);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'growing':
        return 'bg-amber-100 text-amber-800';
      case 'planted':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusProgress = (status: string, ageMonths: number) => {
    switch (status) {
      case 'healthy':
        return 100;
      case 'growing':
        return Math.min(60 + ageMonths * 5, 90);
      case 'planted':
        return 30;
      default:
        return 0;
    }
  };
  
  const filteredTrees = trees.filter(tree => {
    const matchesSearch = 
      tree.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tree.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tree.country.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesFilter = filterStatus === 'all' || tree.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });
  
  const openTreeDetails = (tree: Tree) => {
    setSelectedTree(tree);
    setDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-6 md:px-6 md:py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <TreeDeciduous className="h-6 w-6 text-green-500" />
            Tree Tracker
          </h1>
          <p className="text-muted-foreground">
            Monitor your tree planting impact around the world
          </p>
        </div>
        
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Plant a Tree
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Your Trees</p>
                <p className="text-3xl font-bold">{totalTrees}</p>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <TreeDeciduous className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">CO₂ Absorbed</p>
                <p className="text-3xl font-bold">{totalCO2Absorbed.toFixed(1)} kg</p>
              </div>
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Leaf className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Countries</p>
                <p className="text-3xl font-bold">{new Set(trees.map(t => t.country)).size}</p>
              </div>
              <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                <MapPin className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-9" 
            placeholder="Search by species, location, or country" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="healthy">Healthy</SelectItem>
              <SelectItem value="growing">Growing</SelectItem>
              <SelectItem value="planted">Recently Planted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredTrees.length > 0 ? (
          filteredTrees.map(tree => (
            <Card key={tree.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow" onClick={() => openTreeDetails(tree)}>
              <div className="aspect-[3/2] overflow-hidden">
                <img 
                  src={tree.imageUrl} 
                  alt={tree.species} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" 
                />
              </div>
              <CardContent className="pt-4">
                <Badge className={getStatusColor(tree.status)}>
                  {tree.status.charAt(0).toUpperCase() + tree.status.slice(1)}
                </Badge>
                <h3 className="font-semibold text-lg mt-2">{tree.species}</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  {tree.location}, {tree.country}
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Growth Progress</span>
                    <span>{getStatusProgress(tree.status, tree.ageMonths)}%</span>
                  </div>
                  <Progress value={getStatusProgress(tree.status, tree.ageMonths)} className="h-1.5" />
                </div>
                <div className="mt-3 flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <CalendarDays className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span>{new Date(tree.plantDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <Leaf className="h-3.5 w-3.5 mr-1" />
                    <span>{tree.co2Absorbed} kg CO₂</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <TreeDeciduous className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No trees found matching your search criteria.</p>
            <Button 
              variant="link" 
              className="mt-2"
              onClick={() => { setSearchTerm(''); setFilterStatus('all'); }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Tree Planting Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-secondary rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Equivalent To</h3>
              <p className="text-2xl font-bold">237 miles</p>
              <p className="text-xs text-muted-foreground mt-1">
                Of not driving a standard vehicle
              </p>
            </div>
            <div className="bg-secondary rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Wildlife Supported</h3>
              <p className="text-2xl font-bold">25+ species</p>
              <p className="text-xs text-muted-foreground mt-1">
                Birds, insects, and small mammals
              </p>
            </div>
            <div className="bg-secondary rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Oxygen Produced</h3>
              <p className="text-2xl font-bold">260 kg</p>
              <p className="text-xs text-muted-foreground mt-1">
                Enough for 1 person for 1 year
              </p>
            </div>
            <div className="bg-secondary rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Water Filtered</h3>
              <p className="text-2xl font-bold">18,500 gal</p>
              <p className="text-xs text-muted-foreground mt-1">
                Of groundwater per year
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {selectedTree && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <TreeDeciduous className="h-5 w-5 text-green-500" />
                {selectedTree.species}
              </DialogTitle>
              <DialogDescription>
                Tree ID: #{selectedTree.id} | Planted on {new Date(selectedTree.plantDate).toLocaleDateString()}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4">
              <div className="aspect-[16/9] overflow-hidden rounded-md">
                <img 
                  src={selectedTree.imageUrl} 
                  alt={selectedTree.species} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                  <p className="font-medium">{selectedTree.location}, {selectedTree.country}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                  <Badge className={getStatusColor(selectedTree.status)}>
                    {selectedTree.status.charAt(0).toUpperCase() + selectedTree.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Age</h4>
                  <p className="font-medium">{selectedTree.ageMonths} months</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">CO₂ Absorbed</h4>
                  <p className="font-medium">{selectedTree.co2Absorbed} kg</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Growth Progress</h4>
                <Progress 
                  value={getStatusProgress(selectedTree.status, selectedTree.ageMonths)} 
                  className="h-2 mb-1" 
                />
                <p className="text-xs text-muted-foreground">
                  This tree is {
                    selectedTree.status === 'planted' 
                      ? 'recently planted and establishing roots'
                      : selectedTree.status === 'growing'
                        ? 'actively growing and developing'
                        : 'healthy and thriving'
                  }
                </p>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" className="gap-2">
                  <Map className="h-4 w-4" />
                  View on Map
                </Button>
                <Button variant="outline" className="gap-2">
                  <Heart className="h-4 w-4" />
                  Favorite
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default TreeTracker;
