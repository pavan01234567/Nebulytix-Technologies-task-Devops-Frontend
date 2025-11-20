// src/pages/EmployeeDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HrInfo from "../components/hr/HrInfo";
import TaskList from "../components/admin/TaskList";
import ViewTasksModal from "../components/admin/ViewTasksModal";
import axios from "axios";
import { BACKEND_BASE_URL } from "../api/config";

export default function EmployeeDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTaskAllowSubmit, setSelectedTaskAllowSubmit] = useState(false);
  const [employee, setEmployee] = useState(null);

  // ----------------- NEW STATES -----------------
  const [showReportBox, setShowReportBox] = useState(false);
  const [reportText, setReportText] = useState("");

  // Default date = today
  const [reportDate, setReportDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  // ------------------------------------------------

  const navigate = useNavigate();

  useEffect(() => {
    const stored =
      localStorage.getItem("neb_employee_info") ||
      localStorage.getItem("neb_user_info") ||
      localStorage.getItem("neb_user") ||
      null;

    if (stored) {
      try {
        setEmployee(JSON.parse(stored));
      } catch {
        setEmployee(null);
      }
    }
  }, []);

  function handleViewTask(task, options) {
    setSelectedTask(task);
    setSelectedTaskAllowSubmit(!!options?.allowSubmit);
  }

  function closeTaskModal() {
    setSelectedTask(null);
    setSelectedTaskAllowSubmit(false);
  }

  // ----------------- DATE CHANGE FUNCTION -----------------
  function handleDateChange(e) {
    const newDate = e.target.value;
    setReportDate(newDate);
    // Removed auto-insert into reportText
  }

// ----------------- SUBMIT REPORT -----------------
async function handleSubmitTodayReport() {
  if (!reportText.trim()) {
    alert("Please write your report before submitting.");
    return;
  }

  if (!employee || !employee.id) {
    alert("Employee information not found!");
    return;
  }

  try {
    const payload = {
      employee_id: employee.id,              // or employee._id if using _id
      reportDate: reportDate,                // must be in YYYY-MM-DD format
      summary: reportText.trim(),
    };

    const response = await axios.post(
      `${BACKEND_BASE_URL}/employee/dailyReport/submit`, // Replace with your backend URL
      payload
    );

    if (response?.data?.data) {
      alert(response.data.data); // backend returns "Report submitted successfully!"
    } else {
      alert("Report submitted successfully!");
    }

    // Clear textarea & close box
    setReportText("");
    setShowReportBox(false);

    // Optionally refresh tasks if needed
    setRefreshKey((k) => k + 1);

  } catch (error) {
    console.error("Error submitting report:", error);
    alert(
      error.response?.data?.message || 
      "Failed to submit report. Please try again."
    );
  }



    alert("Report submitted:\n\n" + reportText);

    setReportText("");       // Clear textarea after submit
    setShowReportBox(false); // Close the report box
  }
  // --------------------------------------------------

  function handleLogout() {
    localStorage.removeItem("neb_employee_info");
    localStorage.removeItem("neb_user_info");
    localStorage.removeItem("neb_user");
    navigate("/login/employee");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Employee Dashboard
      </h1>

      {/* Employee Profile + Logout Section */}
      <div className="bg-blue-50 shadow rounded-lg p-6 w-full">
        <HrInfo role="employee" refreshKey={refreshKey} />

        {/* Buttons */}
        <div className="flex justify-end mt-4 gap-3">
          <button
            onClick={() => setShowReportBox(!showReportBox)}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Today’s Report
          </button>

          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Report Box */}
        {showReportBox && (
          <div className="mt-5 bg-white p-5 rounded-lg shadow">

            {/* Date Selector */}
            <label className="text-lg font-semibold text-gray-700">
              Select Date:
            </label>
            <input
              type="date"
              value={reportDate}
              onChange={handleDateChange}
              className="block mt-1 mb-4 p-2 border rounded-lg"
            />

            {/* Report Textarea */}
            <textarea
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              placeholder="Write your daily report..."
              className="w-full h-40 p-4 border rounded-lg"
            />

            {/* Submit Button */}
            <button
              onClick={handleSubmitTodayReport}
              className="mt-3 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit Report
            </button>
          </div>
        )}
      </div>

      {/* Task List Section */}
      <div className="mt-10 bg-gray-100 rounded-lg shadow p-6 w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Task List
        </h2>
        <TaskList
          key={refreshKey}
          employeeId={employee?.id ?? employee?._id ?? undefined}
          onViewTask={handleViewTask}
          onError={(msg) => console.error("TaskList onError:", msg)}
        />
      </div>

      {/* Task Modal */}
      {selectedTask && (
        <ViewTasksModal
          task={selectedTask}
          onClose={closeTaskModal}
          allowSubmit={selectedTaskAllowSubmit}
          onReportSubmitted={() => setRefreshKey((k) => k + 1)}
        />
      )}
    </div>
  );
}
