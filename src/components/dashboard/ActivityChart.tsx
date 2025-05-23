
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const generateData = () => {
  const now = new Date();
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    data.push({
      name: day,
      carbon: Math.floor(Math.random() * 15) + 10,
      trees: Math.floor(Math.random() * 3),
    });
  }
  return data;
};

const data = generateData();

const ActivityChart = () => {
  return (
    <Card className="col-span-2 lg:col-span-3 overflow-hidden border-border/40 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-primary/5 to-transparent border-b border-border/30">
        <CardTitle className="text-md font-medium">Weekly Activity</CardTitle>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-primary mr-1"></div>
            <span className="text-sm text-muted-foreground">Carbon Saved</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-accent mr-1"></div>
            <span className="text-sm text-muted-foreground">Trees Planted</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-4">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTrees" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} opacity={0.5} />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))" 
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))', strokeWidth: 1 }}
              dy={10}
            />
            <YAxis 
              yAxisId="left" 
              orientation="left" 
              stroke="hsl(var(--muted-foreground))" 
              domain={[0, 'auto']} 
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}kg`}
              width={40}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="hsl(var(--muted-foreground))" 
              domain={[0, 'auto']} 
              hide 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                padding: '0.75rem',
              }}
              cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1, strokeDasharray: '3 3' }}
              wrapperStyle={{ outline: 'none' }}
            />
            <Area
              type="monotone"
              dataKey="carbon"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCarbon)"
              stackId="1"
              name="Carbon (kg)"
              yAxisId="left"
              animationDuration={1500}
              activeDot={{ r: 6, strokeWidth: 0, fill: "hsl(var(--primary-foreground))" }}
            />
            <Area
              type="monotone"
              dataKey="trees"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTrees)"
              stackId="2"
              name="Trees"
              yAxisId="right"
              animationDuration={1500}
              activeDot={{ r: 6, strokeWidth: 0, fill: "hsl(var(--accent-foreground))" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
