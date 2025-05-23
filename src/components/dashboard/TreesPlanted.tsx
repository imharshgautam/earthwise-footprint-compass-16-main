
import { TreeDeciduous } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Tree {
  id: number;
  location: string;
  date: string;
  imageUrl: string;
}

const trees: Tree[] = [
  {
    id: 1,
    location: 'Amazon Rainforest, Brazil',
    date: 'Mar 15, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=200&h=120',
  },
  {
    id: 2,
    location: 'Borneo, Indonesia',
    date: 'Feb 28, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&q=80&w=200&h=120',
  },
  {
    id: 3,
    location: 'Western Ghats, India',
    date: 'Jan 12, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=200&h=120',
  },
];

const TreesPlanted = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium flex items-center">
          <TreeDeciduous className="h-4 w-4 mr-2 text-green-500" />
          Your Trees
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trees.map((tree) => (
            <div key={tree.id} className="flex gap-3">
              <img 
                src={tree.imageUrl} 
                alt={tree.location} 
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="text-sm font-medium">{tree.location}</p>
                <p className="text-xs text-muted-foreground">Planted on {tree.date}</p>
                <div className="mt-1 flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></div>
                  <span className="text-xs text-green-600">Healthy</span>
                </div>
              </div>
            </div>
          ))}
          <div className="pt-2">
            <a href="/tree-tracker" className="text-sm text-primary hover:text-primary/80 hover:underline font-medium">
              View all trees →
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TreesPlanted;
