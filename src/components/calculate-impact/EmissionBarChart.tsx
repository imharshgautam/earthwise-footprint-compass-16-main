
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function EmissionBarChart({
  today,
  baseline,
}: {
  today: number;
  baseline: number;
}) {
  const data = [
    { name: "Your Baseline", value: Math.round(baseline * 100) / 100 },
    { name: "Today", value: Math.round(today * 100) / 100 },
  ];
  return (
    <div className="w-full h-40">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis label={{ value: "kg CO₂", angle: -90, position: 'insideLeft', fontSize:12 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
