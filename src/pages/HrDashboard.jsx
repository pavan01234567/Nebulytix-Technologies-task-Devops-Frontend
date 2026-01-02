import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHrProfile } from "../store/hrSlice";
import AttendanceCard from "../components/AttendanceCard";

export default function HrDashboard() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((s) => s.hr);

  useEffect(() => {
    dispatch(fetchHrProfile());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#0D243C]">HR Dashboard</h1>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-gray-600 text-lg">
          Loading HR Profile...
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="text-red-600 text-md bg-red-50 p-3 rounded border border-red-200">
          {error}
        </div>
      )}

      {/* PROFILE CARD */}
      {profile && (
        <>
          <div className="bg-white shadow-md rounded-lg p-6 border">
            <h2 className="text-xl font-semibold text-[#0D243C] mb-4">
              Profile Overview
            </h2>

            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {profile.firstName} {profile.lastName}
              </p>

              <p>
                <span className="font-semibold">Email:</span> {profile.email}
              </p>

              <p>
                <span className="font-semibold">Mobile:</span> {profile.mobile}
              </p>

              <p>
                <span className="font-semibold">Department:</span>{" "}
                {profile.department}
              </p>

              <p>
                <span className="font-semibold">Designation:</span>{" "}
                {profile.designation}
              </p>

              <p>
                <span className="font-semibold">Gender:</span>{" "}
                {profile.gender}
              </p>
            </div>
          </div>

          {/* 🔹 ATTENDANCE (ADDED – NO CHANGE TO EXISTING UI) */}
          <div className="mt-6">
            <AttendanceCard employeeId={profile.id} />
          </div>
        </>
      )}

      {/* FUTURE MODULE CARDS (UNCHANGED) */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white p-6 shadow rounded-lg hover:shadow-lg cursor-pointer transition border">
          <h3 className="text-lg font-semibold text-[#0D243C]">Employees</h3>
          <p className="text-gray-500 text-sm mt-2">
            Manage employees, profiles & attendance.
          </p>
        </div>

        <div className="bg-white p-6 shadow rounded-lg hover:shadow-lg cursor-pointer transition border">
          <h3 className="text-lg font-semibold text-[#0D243C]">
            Recruitment
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            Track job posts, applicants & selection.
          </p>
        </div>

        <div className="bg-white p-6 shadow rounded-lg hover:shadow-lg cursor-pointer transition border">
          <h3 className="text-lg font-semibold text-[#0D243C]">Reports</h3>
          <p className="text-gray-500 text-sm mt-2">
            View attendance, payroll & activity reports.
          </p>
        </div>
      </div>
    </div>
  );
}
