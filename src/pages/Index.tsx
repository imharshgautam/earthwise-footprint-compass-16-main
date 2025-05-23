
import React from 'react';
import { TreeDeciduous, Activity, Zap, Users } from 'lucide-react';

import CarbonSavingCard from '@/components/dashboard/CarbonSavingCard';
import ActivityChart from '@/components/dashboard/ActivityChart';
import RecentActivities from '@/components/dashboard/RecentActivities';
import TreesPlanted from '@/components/dashboard/TreesPlanted';
import EcoTips from '@/components/dashboard/EcoTips';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-6 md:px-6 md:py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Welcome back, Jane!</h1>
        <p className="text-muted-foreground">
          Your eco-journey is making an impact. Keep up the good work!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <CarbonSavingCard
          title="Carbon Saved"
          value="154.2"
          subValue="kg CO₂"
          progress={68}
          icon={<Zap className="h-5 w-5 text-green-500" />}
          trend={{ value: "12%", positive: true }}
        />
        <CarbonSavingCard
          title="Trees Planted"
          value="12"
          progress={40}
          icon={<TreeDeciduous className="h-5 w-5 text-green-500" />}
        />
        <CarbonSavingCard
          title="Activities Logged"
          value="47"
          progress={78}
          icon={<Activity className="h-5 w-5 text-green-500" />}
          trend={{ value: "8%", positive: true }}
        />
        <CarbonSavingCard
          title="Leaderboard Position"
          value="#14"
          subValue="of 128"
          progress={89}
          icon={<Users className="h-5 w-5 text-green-500" />}
          trend={{ value: "5 positions", positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <ActivityChart />
        <div className="lg:col-span-1 space-y-5">
          <TreesPlanted />
          <EcoTips />
        </div>
      </div>

      <div className="mt-6">
        <RecentActivities />
      </div>
    </div>
  );
};

export default Dashboard;
