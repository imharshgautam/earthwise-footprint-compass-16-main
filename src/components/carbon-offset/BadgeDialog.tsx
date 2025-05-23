
import React from 'react';
import { Badge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';

interface BadgeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BadgeDialog = ({ open, onOpenChange }: BadgeDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Badge Earned!</DialogTitle>
          <DialogDescription>
            Congratulations on earning the Eco Planter badge!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Badge className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-xl font-bold">Eco Planter</h3>
          <p className="text-center text-muted-foreground mt-2">
            You've successfully contributed to planting a tree and reducing your carbon footprint.
          </p>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button 
            variant="default"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BadgeDialog;
