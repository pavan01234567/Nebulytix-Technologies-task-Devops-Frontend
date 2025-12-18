//src/components/userLists/cards/EmployeeCard.jsx
export default function EmployeeCard({ employee }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 border space-y-2">
      <h3 className="text-lg font-semibold">
        {employee.firstName} {employee.lastName}
      </h3>

      <p className="text-sm text-gray-600">
        {employee.designation} · {employee.department}
      </p>

      <div className="flex gap-3 pt-2">
        <button className="text-blue-600 text-sm">View</button>
        <button className="text-green-600 text-sm">Update</button>
        <button className="text-red-600 text-sm">Delete</button>
      </div>
    </div>
  );
}
