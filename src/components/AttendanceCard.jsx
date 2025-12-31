import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clockIn, clockOut } from "../store/attendanceSlice";
import {
  Clock,
  LogIn,
  LogOut,
  Timer,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function AttendanceCard({ employeeId }) {
  const dispatch = useDispatch();

  // Attendance record and loading state from Redux
  const { record, loading } = useSelector((s) => s.attendance);

  // Local state for live timer
  const [elapsed, setElapsed] = useState("00:00:00");

  if (!employeeId) return null;

  const isClockedIn = record?.loginTime && !record?.logoutTime;

  // LIVE TIMER
  useEffect(() => {
    if (!isClockedIn || !record?.loginTime) {
      setElapsed("00:00:00");
      return;
    }

    const loginTime = new Date(record.loginTime).getTime();

    const interval = setInterval(() => {
      const diff = Date.now() - loginTime;

      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      setElapsed(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [isClockedIn, record?.loginTime]);

  return (
    <div className="bg-white rounded-xl shadow-md border max-w-md w-full">
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h3 className="text-lg font-semibold text-[#0D243C] flex items-center gap-2">
          <Clock size={18} /> Attendance
        </h3>

        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 ${
            isClockedIn ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {isClockedIn ? (
            <>
              <CheckCircle size={14} /> Clocked In
            </>
          ) : (
            <>
              <XCircle size={14} /> Clocked Out
            </>
          )}
        </span>
      </div>

      {/* BODY */}
      <div className="px-6 py-5 space-y-4 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="flex items-center gap-2">
            <LogIn size={16} /> Login
          </span>
          <span className="font-medium">
            {record?.loginTime
              ? new Date(record.loginTime).toLocaleTimeString()
              : "--"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-2">
            <LogOut size={16} /> Logout
          </span>
          <span className="font-medium">
            {record?.logoutTime
              ? new Date(record.logoutTime).toLocaleTimeString()
              : "--"}
          </span>
        </div>

        {/* LIVE TIMER */}
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-2">
            <Timer size={16} /> Live Duration
          </span>
          <span
            className={`font-mono text-base font-semibold ${
              isClockedIn ? "text-green-600" : "text-gray-500"
            }`}
          >
            {isClockedIn ? elapsed : "--:--:--"}
          </span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4 px-6 py-4 border-t">
        <button
          disabled={loading || isClockedIn}
          onClick={() => dispatch(clockIn(employeeId))}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition ${
            isClockedIn ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          <LogIn size={16} /> Clock In
        </button>

        <button
          disabled={loading || !isClockedIn}
          onClick={() => dispatch(clockOut(employeeId))}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition ${
            !isClockedIn ? "bg-gray-300 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          <LogOut size={16} /> Clock out
        </button>
      </div>
    </div>
  );
}
