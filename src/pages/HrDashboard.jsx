import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HrInfo from "../components/hr/HrInfo";
import AddHrForm from "../components/admin/AddHrForm";
import AddJobForm from "../components/hr/AddJobForm";
import JobList from "../components/hr/JobList";
import EmployeeList from "../components/hr/EmployeeList";

export default function HrDashboard() {
  const navigate = useNavigate();
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showAddJob, setShowAddJob] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  function triggerRefresh() {
    setRefreshKey((k) => k + 1);
  }

  function handleLogout() {
    localStorage.removeItem("neb_hr_info");
    localStorage.removeItem("neb_token");
    localStorage.removeItem("neb_role");
    navigate("/");
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold text-center text-sky-700 mb-4">
        HR Dashboard
      </h1>

      {/* Top Section */}
      <div className="bg-sky-100 rounded-lg p-6 shadow space-y-4">
        <HrInfo role="hr" refreshKey={refreshKey} />

        <div className="flex flex-col md:flex-row gap-3 justify-center">
          <button
            onClick={() => setShowAddEmployee(true)}
            className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded hover:bg-emerald-700 transition"
          >
            + Add Employee
          </button>
          <button
            onClick={() => setShowAddJob(true)}
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition"
          >
            + Add Job
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Employee List Section */}
      <div className="bg-green-50 rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          Employee List
        </h2>
        <EmployeeList
          refreshKey={refreshKey}
          onActionComplete={triggerRefresh}
        />
      </div>

      {/* Job List Section */}
      <div className="bg-purple-50 rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">
          Posted Job List
        </h2>
        <JobList refreshKey={refreshKey} />
      </div>

      {/* Add Employee Modal */}
      {showAddEmployee && (
        <AddHrForm
          mode="hr"
          onClose={() => setShowAddEmployee(false)}
          onAdded={() => {
            setShowAddEmployee(false);
            triggerRefresh();
          }}
        />
      )}

      {/* Add Job Modal */}
      {showAddJob && (
        <AddJobForm
          onClose={() => setShowAddJob(false)}
          onAdded={() => {
            setShowAddJob(false);
            triggerRefresh();
          }}
        />
      )}
    </div>
  );
}
