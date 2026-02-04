import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#1F3A8A", "#2563EB", "#64748B", "#CBD5E1"];

export default function UserCountPieChart({
  adminCount,
  managerCount,
  hrCount,
  employeeCount,
}) {
  const data = [
    { name: "Admins", value: adminCount },
    { name: "Managers", value: managerCount },
    { name: "HRs", value: hrCount },
    { name: "Employees", value: employeeCount },
  ];

  const total =
    adminCount + managerCount + hrCount + employeeCount;

  return (
    <div className="bg-white border rounded-lg p-4 w-full flex flex-col items-center">

      {/* Chart Container */}
      <div className="w-full h-[240px] flex justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={95}
              dataKey="value"
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Total */}
      <p className="text-xs text-gray-500 -mt-1">Total Users</p>
      <p className="text-2xl font-semibold text-gray-800 mb-3">
        {total}
      </p>

      {/* Breakdown */}
      <div className="w-full text-sm grid grid-cols-2 gap-x-6 gap-y-2">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex justify-between items-center"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              />
              <span className="text-gray-700">
                {item.name}
              </span>
            </div>
            <span className="font-semibold text-gray-800">
              {item.value}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
