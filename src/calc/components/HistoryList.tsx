
import { DailyEntry } from "@/utils/emissionUtils";

export default function HistoryList({
  history,
  onSelect,
}: {
  history: { date: string; total: number }[];
  onSelect?: (date: string) => void;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 overflow-x-auto">
      <h3 className="font-bold mb-2 text-sm">Recent Entries</h3>
      <table className="text-xs w-full">
        <thead>
          <tr>
            <th className="text-left">Date</th>
            <th className="text-left">Emissions (kg)</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h) => (
            <tr
              key={h.date}
              className={`hover:bg-primary/10 transition cursor-pointer${onSelect ? "" : " pointer-events-none"}`}
              onClick={() => onSelect && onSelect(h.date)}
            >
              <td>{h.date}</td>
              <td>{h.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
