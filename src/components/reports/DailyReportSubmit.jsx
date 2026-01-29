//src\components\reports\DailyReportSubmit.jsx
import { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../api/axiosInstance";

export default function DailyReportSubmit({ onClose }) {
  const { profile } = useSelector((s) => s.employee);
  const employeeId = profile?.id;

  const [reportDetails, setReportDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!employeeId) {
      alert("Employee ID missing. Please log in again.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        employee_id: employeeId,
        reportDate: new Date().toISOString().split("T")[0],
        summary: reportDetails,
      };

      console.log("Submitting daily report payload:", payload);

      await axiosInstance.post("employee/dailyReport/submit", payload);

      alert("Daily report submitted successfully!");
      setReportDetails("");
      onClose?.();
    } catch (err) {
      console.error("Daily report submission error:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to submit daily report");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-6 rounded shadow w-full max-w-md z-10"
      >
        <h2 className="text-lg font-semibold mb-4">Submit Daily Report</h2>

        <textarea
          required
          rows={5}
          className="w-full border rounded p-2"
          placeholder="What did you work on today?"
          value={reportDetails}
          onChange={(e) => setReportDetails(e.target.value)}
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="px-3 py-1 bg-emerald-600 text-white rounded"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}