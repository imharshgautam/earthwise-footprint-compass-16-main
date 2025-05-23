
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  Award, 
  TreeDeciduous, 
  BarChart, 
  Menu, 
  X,
  BookOpen,
  User,
  Bell,
  CircleDollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Activity, label: 'Log Activities', path: '/activities' },
  { icon: Award, label: 'Challenges', path: '/challenges' },
  { icon: TreeDeciduous, label: 'Tree Tracker', path: '/tree-tracker' },
  { icon: BarChart, label: 'Leaderboard', path: '/leaderboard' },
  { icon: BookOpen, label: 'Learn More', path: '/learn' },
  { icon: CircleDollarSign, label: 'Carbon Offset', path: '/carbon-offset' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Track scroll position to add/remove shadow/backdrop on navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled 
          ? "bg-white/90 dark:bg-sidebar-background/90 backdrop-blur-md shadow-md" 
          : "bg-white dark:bg-sidebar-background"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink 
              to="/" 
              className="flex items-center space-x-2 font-bold text-xl"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="relative">
                <TreeDeciduous className="h-6 w-6 text-primary animate-pulse" />
                <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-accent rounded-full"></span>
              </div>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold">
                GreenMiles
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors relative',
                  isActive
                    ? 'text-primary after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-t-md'
                    : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
                )}
              >
                <item.icon className="mr-1.5 h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* User Profile & Notifications */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="relative hidden md:flex">
              <Bell className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full"></span>
            </Button>
            
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary ring-2 ring-primary/20">
                JD
              </div>
            </Button>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="bg-white dark:bg-sidebar-background border-b shadow-lg animate-fade-in">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  'flex items-center px-5 py-3 text-base font-medium border-l-4',
                  isActive
                    ? 'border-l-primary bg-primary/5 text-primary'
                    : 'border-l-transparent text-foreground/80 hover:bg-secondary/50'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
            <div className="flex items-center px-5 py-4 border-t">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mr-3 ring-2 ring-primary/20">
                JD
              </div>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mr-1.5"></span>
                  Level 3 · 345 pts
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
