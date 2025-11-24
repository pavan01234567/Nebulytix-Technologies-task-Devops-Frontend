import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HrInfo from "../components/hr/HrInfo";
import AddHrForm from "../components/admin/AddHrForm";
import AddJobForm from "../components/hr/AddJobForm";
import JobList from "../components/hr/JobList";
import EmployeeList from "../components/hr/EmployeeList";
import axios from "axios";
import { BACKEND_BASE_URL } from "../api/config";

import {
  Menu,
  UserPlus,
  Briefcase,
  LogOut,
  FilePlus,
  FileText,
  Loader2,
  FileStack
} from "lucide-react";

export default function HrDashboard() {
  const navigate = useNavigate();
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showAddJob, setShowAddJob] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dailyReportOpen, setDailyReportOpen] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  function triggerRefresh() {
    setRefreshKey((k) => k + 1);
  }

  function handleLogout() {
    localStorage.removeItem("neb_hr_info");
    localStorage.removeItem("neb_token");
    localStorage.removeItem("neb_role");
    navigate("/");
  }

  // ⭐ NEW: Generate Daily Report API Call
  async function handleGenerateDailyReport() {
    setLoadingReport(true);
    try {
      const res = await axios.post(`${BACKEND_BASE_URL}/hr/dailyReport/generate`);

      if (res.data?.data) {
        alert("Daily report generated successfully!");
      } else {
        alert(res.data.message || "Failed to generate report.");
      }
    } catch (err) {
      alert("Error while generating report: " + err.message);
    }
    setLoadingReport(false);
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold text-center text-sky-700 mb-4">
        HR Dashboard
      </h1>

      {/* Top Section */}
      <div className="bg-sky-100 rounded-lg p-6 shadow relative">
        <div className="flex items-start justify-between w-full">
          {/* HR Info */}
          <div className="flex-1 whitespace-pre-line">
            <HrInfo role="hr" refreshKey={refreshKey} />
          </div>

          {/* Hamburger menu */}
          <div className="relative ml-4">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="p-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition shadow"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Dropdown */}
            {menuOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 shadow-xl rounded-xl p-2 z-50">

                {/* Add Employee */}
                <button
                  onClick={() => setShowAddEmployee(true)}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-sky-50 rounded-lg transition"
                >
                  <UserPlus size={18} className="text-sky-700" />
                  Add Employee
                </button>

                {/* Add Job */}
                <button
                  onClick={() => setShowAddJob(true)}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-sky-50 rounded-lg transition"
                >
                  <Briefcase size={18} className="text-purple-700" />
                  Add Job
                </button>

                {/* ------------------------------------ */}
                {/* ⭐ DAILY REPORT DROPDOWN ADDED HERE */}
                {/* ------------------------------------ */}

                {/* Daily Report Main Button */}
                <button
                  onClick={() => setDailyReportOpen((prev) => !prev)}
                  className="flex items-center justify-between gap-3 w-full px-4 py-3 text-left hover:bg-gray-100 rounded-lg transition"
                >
                  <span className="flex items-center gap-3">
                    <FileStack size={18} className="text-blue-700" />
                    Daily Report
                  </span>
                  <span>{dailyReportOpen ? "▲" : "▼"}</span>
                </button>

                {/* Submenu for Daily Report */}
                {dailyReportOpen && (
                  <div className="ml-6 mt-2 space-y-2">

                    {/* Generate Report */}
                    <button
                      onClick={handleGenerateDailyReport}
                      disabled={loadingReport}
                      className="flex items-center gap-3 w-full px-3 py-2 text-left rounded-lg hover:bg-gray-50 transition text-sm"
                    >
                      {loadingReport ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <FilePlus size={16} className="text-green-600" />
                      )}
                      {loadingReport ? "Generating..." : "Generate Report"}
                    </button>

                    {/* View Report */}
                    <button
                      onClick={() => navigate("/view-daily-report")}
                      className="flex items-center gap-3 w-full px-3 py-2 text-left rounded-lg hover:bg-gray-50 transition text-sm"
                    >
                      <FileText size={16} className="text-purple-600" />
                      View Reports
                    </button>
                  </div>
                )}

                {/* ------------------------------------ */}

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-3 text-left hover:bg-red-50 rounded-lg text-red-600 transition mt-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
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
