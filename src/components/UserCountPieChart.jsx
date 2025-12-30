import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = [
  "#1F3A8A", // Dark corporate blue (Admins)
  "#2563EB", // Blue (Managers)
  "#64748B", // Slate (HRs)
  "#CBD5E1", // Light gray (Employees)
];

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
    <div className="bg-white rounded-md border p-4">
      {/* Title */}
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-700">
          User Distribution
        </h3>
        <p className="text-xs text-gray-500">
          Current active users by role
        </p>
      </div>

      <div className="flex items-center">
        {/* Donut Chart */}
        <PieChart width={220} height={220}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            dataKey="value"
            stroke="none"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* Right-side Breakdown */}
        <div className="ml-6 text-sm">
          <p className="text-xs text-gray-500 mb-2">
            Total Users
          </p>
          <p className="text-2xl font-semibold text-gray-800 mb-4">
            {total}
          </p>

          {data.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center justify-between mb-2"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-gray-600">
                  {item.name}
                </span>
              </div>
              <span className="font-medium text-gray-800">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
