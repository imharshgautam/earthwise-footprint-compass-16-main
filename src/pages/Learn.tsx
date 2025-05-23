import React, { useState } from 'react';
import { 
  BookOpen, 
  Play, 
  ExternalLink, 
  FileText, 
  Search, 
  BookmarkIcon, 
  TreeDeciduous
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'article' | 'video' | 'guide';
  imageUrl: string;
  link: string;
  readTime?: string;
  tags: string[];
}

const resources: Resource[] = [
  {
    id: 1,
    title: "Understanding Your Carbon Footprint",
    description: "Learn how daily activities contribute to your carbon footprint and simple ways to reduce it.",
    type: "article",
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    link: "#",
    readTime: "5 min read",
    tags: ["basics", "carbon footprint"]
  },
  {
    id: 2,
    title: "Plant-Based Diet Impact",
    description: "Discover how switching to a plant-based diet can dramatically reduce your environmental impact.",
    type: "article",
    imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
    link: "#",
    readTime: "8 min read",
    tags: ["food", "lifestyle"]
  },
  {
    id: 3,
    title: "Sustainable Transportation Guide",
    description: "A comprehensive guide to choosing eco-friendly transportation options for everyday travel.",
    type: "guide",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    link: "#",
    readTime: "12 min read",
    tags: ["transportation", "sustainable living"]
  },
  {
    id: 4,
    title: "How Trees Fight Climate Change",
    description: "An in-depth look at how trees act as natural carbon sinks and help combat global warming.",
    type: "video",
    imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    link: "#",
    tags: ["trees", "climate science"]
  },
  {
    id: 5,
    title: "Zero Waste Home: Beginner's Guide",
    description: "Start your journey to a zero-waste lifestyle with these simple home modifications.",
    type: "guide",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    link: "#",
    readTime: "15 min read",
    tags: ["zero waste", "lifestyle"]
  },
  {
    id: 6,
    title: "Renewable Energy Explained",
    description: "Understand different forms of renewable energy and their benefits for the environment.",
    type: "video",
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    link: "#",
    tags: ["energy", "climate science"]
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'article':
      return <FileText className="h-5 w-5" />;
    case 'video':
      return <Play className="h-5 w-5" />;
    case 'guide':
      return <BookmarkIcon className="h-5 w-5" />;
    default:
      return <BookmarkIcon className="h-5 w-5" />;
  }
};

const getTypeBadgeColor = (type: string) => {
  switch (type) {
    case 'article':
      return 'bg-blue-100 text-blue-800';
    case 'video':
      return 'bg-red-100 text-red-800';
    case 'guide':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Learn = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-6 md:px-6 md:py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Learn More
          </h1>
          <p className="text-muted-foreground">
            Educational resources to help you make informed eco-friendly choices
          </p>
        </div>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          className="pl-9" 
          placeholder="Search for topics, tags, or keywords" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="article">Articles</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="guide">Guides</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length > 0 ? (
              filteredResources.map(resource => (
                <Card key={resource.id} className="overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={`${resource.imageUrl}?auto=format&fit=crop&q=80&w=300&h=180`} 
                      alt={resource.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className={getTypeBadgeColor(resource.type)}>
                        <div className="flex items-center">
                          {getTypeIcon(resource.type)}
                          <span className="ml-1 capitalize">{resource.type}</span>
                        </div>
                      </Badge>
                      {resource.readTime && (
                        <span className="text-xs text-muted-foreground">{resource.readTime}</span>
                      )}
                    </div>
                    <CardTitle className="text-xl mt-2">{resource.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex gap-2 flex-wrap">
                      {resource.tags.map((tag, i) => (
                        <Badge key={i} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full gap-2" asChild>
                      <a href={resource.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Read More
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No resources found matching your search criteria.</p>
                <Button 
                  variant="link" 
                  className="mt-2"
                  onClick={() => setSearchTerm('')}
                >
                  Clear search
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        {['article', 'video', 'guide'].map(type => (
          <TabsContent key={type} value={type} className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.filter(r => r.type === type).length > 0 ? (
                filteredResources
                  .filter(r => r.type === type)
                  .map(resource => (
                    <Card key={resource.id} className="overflow-hidden">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={`${resource.imageUrl}?auto=format&fit=crop&q=80&w=300&h=180`} 
                          alt={resource.title} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge className={getTypeBadgeColor(resource.type)}>
                            <div className="flex items-center">
                              {getTypeIcon(resource.type)}
                              <span className="ml-1 capitalize">{resource.type}</span>
                            </div>
                          </Badge>
                          {resource.readTime && (
                            <span className="text-xs text-muted-foreground">{resource.readTime}</span>
                          )}
                        </div>
                        <CardTitle className="text-xl mt-2">{resource.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex gap-2 flex-wrap">
                          {resource.tags.map((tag, i) => (
                            <Badge key={i} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full gap-2" asChild>
                          <a href={resource.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            {type === 'video' ? 'Watch Now' : 'Read More'}
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No {type}s found matching your search criteria.</p>
                  <Button 
                    variant="link" 
                    className="mt-2"
                    onClick={() => setSearchTerm('')}
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Learning Tracks</CardTitle>
          <CardDescription>Follow these curated series to deepen your knowledge</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-md flex items-center justify-center">
                <TreeDeciduous className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <h3 className="font-medium">Climate Science Basics</h3>
                <p className="text-sm text-muted-foreground mt-1">Understand the fundamentals of climate change and its impacts</p>
                <Button variant="link" className="pl-0" size="sm">
                  Start learning
                </Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center">
                <Play className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h3 className="font-medium">Sustainable Living 101</h3>
                <p className="text-sm text-muted-foreground mt-1">Practical tips for reducing your environmental footprint at home</p>
                <Button variant="link" className="pl-0" size="sm">
                  Start learning
                </Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-md flex items-center justify-center">
                <BookmarkIcon className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <h3 className="font-medium">Advanced Carbon Reduction</h3>
                <p className="text-sm text-muted-foreground mt-1">Next-level strategies for minimizing your carbon footprint</p>
                <Button variant="link" className="pl-0" size="sm">
                  Start learning
                </Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-md flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-700" />
              </div>
              <div>
                <h3 className="font-medium">Eco-Advocacy & Community Action</h3>
                <p className="text-sm text-muted-foreground mt-1">Learn how to drive change in your community and beyond</p>
                <Button variant="link" className="pl-0" size="sm">
                  Start learning
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Learn;
