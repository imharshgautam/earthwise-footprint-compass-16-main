
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#30c48d", "#60a5fa", "#ef4444", "#a3e635", "#fbbf24", "#6366f1", "#fb7185"];

export default function EmissionPieChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <div className="w-full h-[172px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
            label={({ name }) => name}
            stroke="white"
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
