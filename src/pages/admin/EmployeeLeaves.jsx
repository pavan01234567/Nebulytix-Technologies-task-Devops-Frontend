//src/pages/admin/EmployeeLeaves.jsx
import { useParams } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import EmployeeActionTabs from "../../components/admin/EmployeeActionTabs";

const LEAVE_TYPES = [
  "CASUAL",
  "SICK",
  "EARNED",
  "UNPAID",
  "WFH",
  "COMPOFF",
];

export default function EmployeeLeaves() {
  const { employeeId } = useParams();

  const [year, setYear] = useState(new Date().getFullYear());
  const [leaveAllocation, setLeaveAllocation] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (type, value) => {
    setLeaveAllocation((prev) => ({
      ...prev,
      [type]: Number(value),
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        employeeId: Number(employeeId),
        year,
        leaveAllocation,
      };

      await axiosInstance.post("/hr/assign-leave-balance", payload);
      setSuccess(true);
    } catch (err) {
      alert("Failed to assign leave balance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ✅ EMPLOYEE NAVBAR */}
      <EmployeeActionTabs />

      {/* ✅ CONTENT CARD */}
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-6">
          Assign Leave Balance
        </h2>

        {/* ✅ Year */}
        <div className="mb-8 max-w-xs flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">
            Year
          </label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="input-base"
          />
        </div>

        {/* ✅ Leave Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LEAVE_TYPES.map((type) => (
            <div key={type} className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                {type} Allowance
              </label>

              <input
                type="number"
                min="0"
                placeholder={`Enter ${type} days`}
                className="input-base"
                onChange={(e) =>
                  handleChange(type, e.target.value)
                }
              />
            </div>
          ))}
        </div>

        {/* ✅ Actions */}
        <div className="flex justify-end mt-10">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Assign Leaves"}
          </button>
        </div>

        {/* ✅ Success Message */}
        {success && (
          <p className="text-green-600 mt-4">
            Leave balance assigned successfully.
          </p>
        )}
      </div>
    </div>
  );
  
}
