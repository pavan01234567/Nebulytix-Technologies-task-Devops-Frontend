import { useEffect,useRef,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // ✅ NEW
import { fetchAdminProfile } from "../store/adminSlice";
import {
  fetchAdmins,
  fetchManagers,
  fetchHrs,
  fetchEmployees,
  fetchClients,
} from "../store/userListsSlice";
import { fetchAllProjects } from "../store/projectSlice";
import { fetchAllJobs } from "../store/jobSlice";
import { uploadToCloudinary } from "../api/cloudinary";
import axiosInstance from "../api/axiosInstance";

export default function AdminDashboard() {
  const dispatch = useDispatch();
const navigate = useNavigate(); // ✅ NEW

  const { profile, loading: adminLoading, error: adminError } =
    useSelector((s) => s.admin);

  const {
    admins,
    managers,
    hrs,
    employees,
    clients,
    loading: usersLoading,
    error: usersError,
  } = useSelector((s) => s.userLists);

  const {
    allProjects,
    loading: projectsLoading,
    error: projectsError,
  } = useSelector((s) => s.project);
  const { jobs } = useSelector((s) => s.jobs); // ✅ NEW


  useEffect(() => {
    dispatch(fetchAdminProfile());
    dispatch(fetchAdmins());
    dispatch(fetchManagers());
    dispatch(fetchHrs());
    dispatch(fetchEmployees());
    dispatch(fetchClients());
    dispatch(fetchAllProjects());
    dispatch(fetchAllJobs()); // ✅ NEW
  }, [dispatch]);

  // ----------------------cloudinary----------------------//
  const [uploadLoading, setUploadLoading] = useState(false);
  const fileInputRef = useRef(null);
  const DEFAULT_AVATAR = "https://ui-avatars.com";

  // ================= USER COUNTS =================
  const adminCount = admins.length;
  const managerCount = managers.length;
  const hrCount = hrs.length;
  const employeeCount = employees.length;

    // ================= JOBS (REAL DATA) =================
  const jobsPosted = jobs.length; // ✅ UPDATED
    const clientsCount = clients.length; // ✅ NEW

  // ================= ATTENDANCE (DEMO NUMBERS) =================
  const officeCount = 25;
  const wfhCount = 7;
  const onLeaveCount = 3;
  const totalAttendance = officeCount + wfhCount;

  // ================= PROJECT COUNTS =================
  const plannedCount = allProjects.filter(
    (p) => p.status === "PLANNED"
  ).length;

  const inProgressCount = allProjects.filter(
    (p) => p.status === "IN_PROGRESS"
  ).length;

  const completedCount = allProjects.filter(
    (p) => p.status === "COMPLETED"
  ).length;

  const totalProjects =
    plannedCount + inProgressCount + completedCount;

  // Small helper for avatar initials
  const initials = profile?.email ? profile.email.split("@")[0].slice(0, 2).toUpperCase() : "A";


  // ================= cloudinary upload handler =================
const handleFileChange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  if (!profile?.id) {
    alert("Admin profile not loaded yet");
    return;
  }

  setUploadLoading(true);

  try {
    const formData = new FormData();
    formData.append("file", file); // 🔴 MUST be "file"

    await axiosInstance.put(
      `/admin/${profile.id}/profile-picture`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // dispatch(fetchAdminProfile());
    // 🔥 Force refresh with updated data
    await dispatch(fetchAdminProfile()).unwrap();

     // ✅ SUCCESS MESSAGE
    alert("Profile picture uploaded successfully ✅");
  } catch (err) {
    console.error("Profile picture upload failed:", err);
    alert("Failed to upload profile picture");
  } finally {
    setUploadLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }
};

useEffect(() => {
  console.log("ADMIN PROFILE FROM API:", profile);
}, [profile]);   

  return (
    <div className="min-h-screen bg-gray-100 px-3 sm:px-5 lg:px-8 py-4 space-y-5">

      {/* ================= HEADER ================= */}
      <div className="bg-white rounded-xl shadow-sm border p-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">HRM Admin Dashboard</h1>
          <p className="text-xs text-gray-500">Corporate Human Resource Management</p>
        </div>

        {profile && (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-semibold text-gray-800">{profile.name || profile.email}</span>
              <span className={`${profile.enabled ? "text-green-600" : "text-red-600"} text-xs`}>{profile.enabled ? "Active" : "Disabled"}</span>
            </div>

     {/* CLOUDINARY AVATAR SECTION */}
      <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
        {profile.profilePictureUrl ? (
          <img 
            src={`${profile.profilePictureUrl}?v=${Date.now()}`} 
            className="h-10 w-10 rounded-full object-cover border shadow-sm" 
            alt="Admin" 
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
            {initials}
          </div>
        )}  

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <span className="text-[10px] text-white font-bold">{uploadLoading ? "..." : "EDIT"}</span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
    )}
  </div>
      

      {/* ================= LOADING & ERROR ================= */}
      {(adminLoading || usersLoading || projectsLoading) && (
        <p className="text-sm text-gray-500">Loading dashboard...</p>
      )}

      {(adminError || usersError || projectsError) && (
        <p className="text-sm text-red-600">
          {adminError || usersError || projectsError}
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <DashboardCard
          title="Admins"
          value={adminCount}
          bg="#CFEAFC"
          onClick={() => navigate("/admin/admins")}
          icon={(
            <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" strokeWidth="1.5" />
              <path d="M6 20c0-3.31 2.69-6 6-6s6 2.69 6 6" strokeWidth="1.5" />
            </svg>
          )}
        />

        <DashboardCard
          title="Managers"
          value={managerCount}
          bg="#D1D6FD"
          onClick={() => navigate("/admin/managers")}
          icon={(
            <svg className="w-6 h-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" strokeWidth="1.5" />
              <path d="M4 20v-1a4 4 0 014-4h8a4 4 0 014 4v1" strokeWidth="1.5" />
            </svg>
          )}
        />

        <DashboardCard
          title="HRs"
          value={hrCount}
          bg="#E2FAD4"
          onClick={() => navigate("/admin/hrs")}
          icon={(
            <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="4" width="18" height="14" rx="2" strokeWidth="1.5" />
              <path d="M8 10h8" strokeWidth="1.5" />
            </svg>
          )}
        />

        <DashboardCard
          title="Employees"
          value={employeeCount}
          bg="#F8FAD4"
          onClick={() => navigate("/admin/employees")}
          icon={(
            <svg className="w-6 h-6 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M17 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" strokeWidth="1.5" />
              <circle cx="12" cy="7" r="4" strokeWidth="1.5" />
            </svg>
          )}
        />

        <DashboardCard
          title="Clients"
          value={clientsCount}
          bg="#FAD4D5"
          onClick={() => navigate("/admin/clients")}
          icon={(
            <svg className="w-6 h-6 text-pink-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 10v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6" strokeWidth="1.5" />
              <path d="M7 10V6a5 5 0 0110 0v4" strokeWidth="1.5" />
            </svg>
          )}
        />
      </div>

      {/* ================= ANALYTICS GRID ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* ================= ATTENDANCE PANEL ================= */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">

          {/* Header */}
          <div className="px-4 py-3 border-b">
            <h3 className="text-sm font-bold text-gray-800">
              Attendance Overview
            </h3>
            <p className="text-xs text-gray-500">
              Today's workforce availability
            </p>
          </div>

          {/* KPI Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4">
            <AttendanceTile label="Office" value={officeCount} />
            <AttendanceTile label="WFH" value={wfhCount} />
            <AttendanceTile label="On Leave" value={onLeaveCount} />
            <AttendanceTile label="Present" value={totalAttendance} />
          </div>

          {/* Progress Bars */}
          <div className="px-4 pb-4 space-y-3">
            <AttendanceProgress label="Office" value={officeCount} total={totalAttendance} />
            <AttendanceProgress label="WFH" value={wfhCount} total={totalAttendance} />
            <AttendanceProgress label="On Leave" value={onLeaveCount} total={totalAttendance} />
          </div>
        </div>

        {/* ================= JOBS POSTED ================= */}
        <div className="bg-white rounded-xl shadow-sm p-4 xl:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800">Jobs Posted</h3>
            <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-bold">
              Total: {jobsPosted}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm text-gray-500">Recent openings</div>

            <ul className="space-y-2 max-h-56 overflow-auto mt-2">
              {jobs && jobs.length ? (
                jobs.slice(0, 5).map((j) => {
                  const title = j.jobTitle || j.title || j.position || "Untitled";
                  const location = j.location || j.city || j.place || j.address || "—";
                  const posted = j.postedDate || j.postedOn || j.createdAt || null;

                  return (
                    <li key={j.id || j._id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-md border border-gray-100">
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-9 w-9 rounded-md bg-white flex items-center justify-center border">
                          <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 2v6" strokeWidth="1.5" />
                            <path d="M5 12h14" strokeWidth="1.5" />
                            <path d="M12 22v-6" strokeWidth="1.5" />
                          </svg>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-gray-800">{title}</div>
                          <div className="text-xs text-gray-500">{posted ? formatDate(posted) : ""}</div>
                        </div>

                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-xs text-gray-500">{location}</span>
                          <span className="ml-auto text-xs">
                            <button onClick={() => navigate(`/admin/jobs`)} className="text-blue-600 text-xs font-semibold">View</button>
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : (
                <li className="text-sm text-gray-500">No jobs available</li>
              )}
            </ul>

            <div className="mt-2 flex justify-end">
              <button
                onClick={() => navigate("/admin/jobs")}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all font-semibold text-sm"
              >
                View all
              </button>
            </div>
          </div>
        </div>

        {/* ================= PROJECT STATUS ================= */}
        <div className="bg-white rounded-xl shadow-sm p-4 xl:p-5 border">

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800">
              Project Status Summary
            </h3>

            <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-bold">
              Total: {totalProjects}
            </div>
          </div>

          {/* Highlight Counters */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <StatusPill
              label="Planned"
              value={plannedCount}
              bg="bg-gray-100"
              text="text-gray-900"
            />

            <StatusPill
              label="In Progress"
              value={inProgressCount}
              bg="bg-yellow-100"
              text="text-yellow-900"
            />

            <StatusPill
              label="Completed"
              value={completedCount}
              bg="bg-green-100"
              text="text-green-900"
            />
          </div>

          {/* Progress Bars */}
          <div className="space-y-4">
            <ProgressRow label="Planned" value={plannedCount} total={totalProjects} />
            <ProgressRow label="In Progress" value={inProgressCount} total={totalProjects} />
            <ProgressRow label="Completed" value={completedCount} total={totalProjects} />
          </div>
        </div>
      </div>

      {/* admin profile moved to header (top-right) */}
    </div>
  );
}

/* ================= KPI CARD ================= */
function DashboardCard({ title, value, bg, onClick, icon }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-lg shadow-md p-5 xl:p-6 transition-all duration-300 text-gray-800 relative overflow-hidden group
        ${onClick ? "cursor-pointer hover:shadow-xl hover:scale-105" : ""}`}
      style={{ backgroundColor: bg }}
    >
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br from-blue-600 to-purple-600 transition-opacity duration-300" />
      
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />
      
      {/* Content Container */}
      <div className="relative z-10 flex justify-between items-start">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 opacity-75">
            {title}
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-gray-800">
            {value}
          </h2>
        </div>

        {/* Icon/Badge */}
        <div className="h-12 w-12 rounded-lg bg-white bg-opacity-40 flex items-center justify-center ml-4">
          {icon ? icon : (
            <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5M13 1.5v4M16.5 4.5h-7" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          )}
        </div>
      </div>

      {/* View Button - Bottom Right */}
      {onClick && (
        <div className="absolute bottom-5 right-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={onClick}
            className="px-4 py-2 text-sm font-semibold bg-white text-gray-800 rounded-md hover:bg-gray-50 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <span>View</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Stats Indicator */}
      <div className="mt-4 pt-4 border-t border-gray-200 border-opacity-30">
        <p className="text-xs text-gray-600 font-medium">Active Records</p>
      </div>
    </div>
  );
}

/* ================= PROGRESS BAR ================= */
function ProgressRow({ label, value, total }) {
  const percent = total ? Math.round((value / total) * 100) : 0;

  return (
    <div>
      <div className="flex justify-between text-xs mb-1 text-gray-600">
        <span>{label}</span>
        <span>{percent}% ({value})</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

/* ================= ATTENDANCE TILE ================= */
function AttendanceTile({ label, value }) {
  return (
    <div className="rounded-lg border bg-gray-50 px-3 py-2">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-800 mt-1">
        {value}
      </p>
    </div>
  );
}

/* ================= ATTENDANCE PROGRESS ================= */
function AttendanceProgress({ label, value, total }) {
  const percent = total ? Math.round((value / total) * 100) : 0;

  return (
    <div>
      <div className="flex justify-between mb-1 text-xs text-gray-600">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>

      <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-indigo-600 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

/* ================= DATE HELPERS ================= */
function formatDate(input) {
  try {
    // accept LocalDate-like strings (YYYY-MM-DD) or ISO timestamps
    const d = new Date(input);
    if (isNaN(d)) return "";
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  } catch (e) {
    return "";
  }
}

/* ================= STATUS PILL ================= */
function StatusPill({ label, value, bg, text }) {
  return (
    <div className={`rounded-lg px-3 py-2 flex justify-between items-center ${bg}`}>
      <span className="text-sm font-medium text-gray-700">
        {label}
      </span>

      <span className={`text-lg font-bold ${text}`}>
        {value}
      </span>
    </div>
  );
}
