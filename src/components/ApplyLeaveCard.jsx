import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CalendarDays, Send } from "lucide-react";
import { applyLeave } from "../store/attendanceSlice";
// import { fetchHRNotifications } from "../store/notificationSlice";
import { fetchTodayAttendance } from "../store/attendanceSlice";


export default function ApplyLeaveCard({ employeeId }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.attendance);

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [reason, setReason] = useState("");
  const [leaveType, setLeaveType] = useState("CASUAL");

  if (!employeeId)  {
  return (
    <div className="bg-white rounded-xl shadow-md border p-6 text-gray-500">
      Loading leave form...
    </div>
  );
 }

  const submitLeave = () => {
    if (!leaveType || !start || !end || !reason.trim()) {
    alert("Please fill all the fields before applying leave");
    return;
    }

    if (new Date(end) < new Date(start)) {
    alert("End date cannot be before start date");
    return;
    }

    dispatch(
      applyLeave({
        employeeId,
        start,
        end,
        reason,
        leaveType,
      })
    )
      .unwrap()
      .then(() => {
        alert("Leave applied successfully");


      // ✅ RESET FORM
      setStart("");
      setEnd("");
      setReason("");
      setLeaveType("CASUAL");
      })
        .catch((err) => {
         alert(err);
         });
  };

  return (
    <div className="bg-white rounded-xl shadow-md border max-w-md w-full">
      <div className="px-6 py-4 border-b flex items-center gap-2">
        <CalendarDays size={18} />
        <h3 className="font-semibold text-lg">Apply Leave</h3>
      </div>

      <div className="px-6 py-5 space-y-4">
        <select
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
          className="w-full border rounded px-3 py-2"
          
        >
          <option>CASUAL</option>
          <option>SICK</option>
          <option>EARNED</option>
          <option>UNPAID</option>
        </select>

        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="px-6 py-4 border-t">
        <button
          disabled={loading}
          onClick={submitLeave}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold flex items-center justify-center gap-2"
        >
          <Send size={16} /> Apply Leave
        </button>
      </div>
    </div>
  );
}
