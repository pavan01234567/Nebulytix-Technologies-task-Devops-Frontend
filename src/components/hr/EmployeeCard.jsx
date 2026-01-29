import { useState, useRef, useEffect } from "react";
import ViewEmployeeModal from "./ViewEmployeeModal";
import AttendanceForm from "./AttendanceForm";
import PayslipListModal from "./PayslipListModal";
import GeneratePayslipModal from "./GeneratePayslipModal";
import axiosInstance from "../../api/axiosInstance";
import { BACKEND_BASE_URL } from "../../api/config";
import { useDispatch } from "react-redux";
import {
  enableEmployee,
  disableEmployee,
} from "../../store/hrEmployeeSlice";

// Lucide Icons
import { MoreVertical, Eye, FileEdit, Trash2, ClipboardList, CalendarCheck, FilePlus2, X } from "lucide-react";

export default function EmployeeCard({ employee, onActionComplete }) {
  const empId = employee.id;
  const profileImage =
  employee.profileImage
    ? `${BACKEND_BASE_URL}${employee.profileImage}`
    : `https://i.pravatar.cc/150?u=${employee.id}`;

  const [showView, setShowView] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showPayslips, setShowPayslips] = useState(false);
  const [showPayslipGenerator, setShowPayslipGenerator] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [status, setStatus] = useState(employee.empStatus);


  const menuRef = useRef();
  const dispatch = useDispatch();

//   const toggleEmployeeStatus = async () => {
//   const isActive = employee.empStatus?.toLowerCase() === "active";
  
//    const confirm = window.confirm(
//      isActive
//        ? "Are you sure you want to enable this employee?"
//        : "Are you sure you want to disable this employee?"
//    );

//   if (!confirm) return;

//   try {
//     if (isActive) {
//       // 👈 ACTIVE → DISABLE
//       await dispatch(disableEmployee(empId)).unwrap();
//       setStatus("inactive"); // ✅ local update
//       alert("Employee disabled successfully");
//     } else {
//        // 👈 INACTIVE → ENABLE
//       await dispatch(enableEmployee(empId)).unwrap();
//       setStatus("active"); // ✅ local update
//       alert("Employee enabled successfully");
//     }

//     onActionComplete?.(); // refresh active list
//   } catch (err) {
//     alert(err);
//   }
// };

const toggleEmployeeStatus = async () => {
 const isActive = employee.empStatus?.toLowerCase() === "active";
  
    // 🔍 BEFORE IF — CURRENT STATUS
  console.log("🔍 BEFORE ACTION");
  console.log("FULL EMPLOYEE OBJECT:", employee);
  console.log("Employee ID:", empId);
  console.log("Employee enabled:", employee.empStatus);
  console.log("Is Active?:", isActive);

  const confirm = window.confirm(
    `Are you sure you want to ${isActive ? "disable" : "enable"} this employee?`
  );

  if (!confirm) return;

  try {
    if (isActive) {
      console.log("🚫 DISABLING employee...");
      setStatus("inactive"); // 👈 THIS is what matters
      await dispatch(disableEmployee(empId)).unwrap();
      alert("Employee disabled successfully");

      // 🔍 AFTER DISABLE
      console.log("✅ AFTER DISABLE");
      console.log("Expected status: inactive");
    } else {
      console.log("✅ ENABLING employee...");
      setStatus("active"); // 👈 THIS is what matters
      await dispatch(enableEmployee(empId)).unwrap();
      alert("Employee enabled successfully");

      // 🔍 AFTER ENABLE
      console.log("✅ AFTER ENABLE");
      console.log("Expected status: active");
    }

    onActionComplete?.(); // refetch list
  } catch (err) {
    console.error("❌ ERROR toggling employee status:", err);
    alert(err);
  }
};


  // ✅ Close menu if clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    setDeleting(true);

    try {
      await axiosInstance.delete(`/hr/employee/delete/${empId}`);
      onActionComplete?.();
    } catch (err) {
      console.error(err);
      alert("Failed to delete employee.");
    } finally {
      setDeleting(false);
   }
  }


  return (
    <>
      <div className="p-4 border rounded-xl bg-white flex flex-row md:flex-row md:items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-200">

        <div className="flex items-center gap-4">
          {/* PROFILE IMAGE */}
          <img
            src={profileImage}
            alt="Employee"
            className="w-14 h-14 rounded-full object-cover border shadow-sm"
          />

        {/* Employee Info */}
        <div className="flex flex-col">
          <div className="font-semibold text-lg text-gray-900">
            {employee.firstName} {employee.lastName}
          </div>
          <div className="text-sm text-gray-600">mail:{employee.email}</div>
          <div className="text-sm text-gray-500">Card No: {employee.cardNumber}</div>
        </div>
      </div>

            {/* ENABLE / DISABLE BUTTON */}
        <button
        onClick={toggleEmployeeStatus}
        className={`
          px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200
          ${
            status?.toLowerCase() === "active"
            ? "bg-green-100 text-green-700 hover:bg-green-200"
            : "bg-red-200 text-red-700 hover:bg-red-300"
        }`}
        
      >
        {employee.empStatus === "active" ? "ACTIVE" : "INACTIVE"}


      </button>
       


        {/* Modern Icon Button */}
        <div className="relative mt-3 md:mt-0" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition shadow-sm"
          >
            <MoreVertical className="w-5 h-5 text-gray-700" />
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 mt-3 w-60 bg-white border border-gray-200 shadow-xl rounded-xl py-2 z-50 animate-fade-in">
              {/* VIEW DETAILS */}
              <button
                onClick={() => { setShowView(true); setMenuOpen(false); }}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-800 w-full text-left"
              >
                <Eye className="w-5 h-5 text-sky-600" />
                View Details
              </button>

              {/* ADD ATTENDANCE */}
              <button
                onClick={() => { setShowAttendance(true); setMenuOpen(false); }}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-800 w-full text-left"
              >
                <CalendarCheck className="w-5 h-5 text-emerald-600" />
                Add Attendance
              </button>

              {/* PAYSLIPS LIST */}
              <button
                onClick={() => { setShowPayslips(true); setMenuOpen(false); }}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-800 w-full text-left"
              >
                <ClipboardList className="w-5 h-5 text-gray-700" />
                Payslips
              </button>

              {/* GENERATE PAYSLIP */}
              <button
                onClick={() => { setShowPayslipGenerator(true); setMenuOpen(false); }}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-800 w-full text-left"
              >
                <FilePlus2 className="w-5 h-5 text-orange-500" />
                Generate Payslip
              </button>

              {/* DELETE EMPLOYEE */}
              {status?.toLowerCase() === "inactive" &&(  
              <button
                onClick={handleDelete}
                className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 w-full text-left"
              >
                <Trash2 className="w-5 h-5" />
                
                {deleting ? "Deleting..." : "Delete"}
              </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
      {showView && (
        <ViewEmployeeModal
          employee={employee}
          onClose={() => setShowView(false)}
          onUpdated={onActionComplete}
        />
      )}

      {showAttendance && (
        <AttendanceForm
          employee={employee}
          onClose={() => setShowAttendance(false)}
          onAdded={onActionComplete}
        />
      )}

      {showPayslips && (
        <PayslipListModal
          employee={employee}
          onClose={() => setShowPayslips(false)}
        />
      )}

      {showPayslipGenerator && (
        <GeneratePayslipModal
          employeeId={employee.id}
          onClose={() => setShowPayslipGenerator(false)}
          onGenerated={onActionComplete}
        />
      )}
    </>
  );
}
