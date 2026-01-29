import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProfile } from "../store/adminSlice";
import {
  fetchAdmins,
  fetchManagers,
  fetchHrs,
  fetchEmployees,
} from "../store/userListsSlice";
import { fetchAllProjects } from "../store/projectSlice";
import UserCountPieChart from "../components/UserCountPieChart";

export default function AdminDashboard() {
  const dispatch = useDispatch();

  const { profile, loading: adminLoading, error: adminError } =
    useSelector((s) => s.admin);

  const {
    admins,
    managers,
    hrs,
    employees,
    loading: usersLoading,
    error: usersError,
  } = useSelector((s) => s.userLists);

  const {
    allProjects,
    loading: projectsLoading,
    error: projectsError,
  } = useSelector((s) => s.project);

  useEffect(() => {
    dispatch(fetchAdminProfile());
    dispatch(fetchAdmins());
    dispatch(fetchManagers());
    dispatch(fetchHrs());
    dispatch(fetchEmployees());
    dispatch(fetchAllProjects());
  }, [dispatch]);

  // ================= USER COUNTS =================
  const adminCount = admins.length;
  const managerCount = managers.length;
  const hrCount = hrs.length;
  const employeeCount = employees.length;

  // ================= JOBS (TEMP STATIC VALUE) =================
  const jobsPosted = 12; // API later

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

  return (
    <div className="min-h-screen bg-gray-100 px-3 sm:px-5 lg:px-8 py-4 space-y-5">

      {/* ================= HEADER ================= */}
      <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">
            HRM Admin Dashboard
          </h1>
          <p className="text-xs text-gray-500">
            Corporate Human Resource Management
          </p>
        </div>

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

      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <DashboardCard title="Admins" value={adminCount} />
        <DashboardCard title="Managers" value={managerCount} />
        <DashboardCard title="HRs" value={hrCount} />
        <DashboardCard title="Employees" value={employeeCount} />
        <DashboardCard title="Jobs Posted" value={jobsPosted} />
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

        {/* ================= USER DISTRIBUTION ================= */}
        <div className="bg-white rounded-xl shadow-sm p-4 xl:p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">
            User Distribution Overview
          </h3>

          <UserCountPieChart
            adminCount={adminCount}
            managerCount={managerCount}
            hrCount={hrCount}
            employeeCount={employeeCount}
          />
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

      {/* ================= ADMIN PROFILE ================= */}
      {profile && (
        <div className="bg-white rounded-xl shadow-sm p-4 xl:p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Admin Profile
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <p>
              <span className="text-gray-500">Email:</span>{" "}
              <span className="font-medium">{profile.email}</span>
            </p>

            <p>
              <span className="text-gray-500">Account Status:</span>{" "}
              <span
                className={`font-medium ${
                  profile.enabled ? "text-green-600" : "text-red-600"
                }`}
              >
                {profile.enabled ? "Active" : "Disabled"}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= KPI CARD ================= */
function DashboardCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 xl:p-5 hover:shadow-md transition">
      <p className="text-xs uppercase tracking-wide text-gray-500">
        {title}
      </p>
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mt-1">
        {value}
      </h2>
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
