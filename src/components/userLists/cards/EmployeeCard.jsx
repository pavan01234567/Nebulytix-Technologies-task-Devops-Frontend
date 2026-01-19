// src/components/userLists/cards/EmployeeCard.jsx
import { useNavigate } from "react-router-dom";

export default function EmployeeCard({ employee }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow p-4 border space-y-2">
      <h3 className="text-lg font-semibold">
        {employee.firstName} {employee.lastName}
      </h3>

      <p className="text-sm text-gray-600">
        {employee.designation} · {employee.department}
      </p>

      <div className="flex gap-3 pt-2">
        <button
          onClick={() =>
            navigate(`/admin/user-lists/employees/${employee.id}`)
          }
          className="text-blue-600 text-sm"
        >
          View
        </button>

        <button className="text-red-600 text-sm">Delete</button>
      </div>
    </div>
  );
}
