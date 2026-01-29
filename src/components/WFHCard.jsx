import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Home, Send } from "lucide-react";
import { applyWFH, fetchTodayAttendance } from "../store/attendanceSlice";
import { fetchHRNotifications } from "../store/notificationSlice";



export default function WFHCard({ employeeId }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.attendance);

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [reason, setReason] = useState("");

  if (!employeeId) return null;

  const submitWFH = () => {
  if (!start || !end || !reason.trim()) {
    alert("Please fill all the fields before applying WFH");
    return;
  }

  if (new Date(end) < new Date(start)) {
    alert("End date cannot be before start date");
    return;
  }

  dispatch(applyWFH({ employeeId, start, end, reason }))
    .unwrap()
    .then(() => {
      alert("WFH applied successfully");

      // ✅ RESET FORM
      setStart("");
      setEnd("");
      setReason("");

    })
    .catch((err) => alert(err));
};


  return (
    <div className="bg-white rounded-xl shadow-md border max-w-md w-full">
      <div className="px-6 py-4 border-b flex items-center gap-2">
        <Home size={18} />
        <h3 className="font-semibold text-lg">Apply WFH</h3>
      </div>

      <div className="px-6 py-5 space-y-4">
        <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="w-full border rounded px-3 py-2" />
        <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="w-full border rounded px-3 py-2" />
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason" className="w-full border rounded px-3 py-10" />
      </div>

      <div className="px-6 py-4 border-t">
        <button
          disabled={loading}
        //   onClick={() => {
        //     dispatch(applyWFH({ employeeId, start, end, reason }))
        //         .then(() => {
        //          alert("WFH applied successfully");
        //     })
        //     .catch(err => alert(err));
        //   }}
        onClick={submitWFH}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold flex items-center justify-center gap-2"
        >
          <Send size={16} /> Apply WFH
        </button>
      </div>
    </div>
  );
}
