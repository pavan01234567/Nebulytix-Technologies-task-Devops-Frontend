
import { Outlet, useNavigate } from "react-router-dom";

export default function UserManagement() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">User Management</h1>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        <button onClick={() => navigate("add-admin")} className="btn">
          Add Admin
        </button>
        <button onClick={() => navigate("add-manager")} className="btn">
          Add Manager
        </button>
        <button onClick={() => navigate("add-hr")} className="btn">
          Add HR
        </button>
        <button onClick={() => navigate("add-employee")} className="btn">
          Add Employee
        </button>
        <button onClick={() => navigate("add-client")} className="btn">
          Add Client
        </button>
      </div>

      {/* NORMAL PAGE CONTENT */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow">
        <Outlet />
      </div>
    </div>
  );
}
