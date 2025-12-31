import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeProfile } from "../store/employeeSlice";
import AttendanceCard from "../components/AttendanceCard";

export default function EmployeeDashboard() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((s) => s.employee);

  useEffect(() => {
    dispatch(fetchEmployeeProfile());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Employee Dashboard</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {profile && (
        <>
          {/* PROFILE */}
          <div className="p-4 bg-white shadow rounded-lg grid grid-cols-2 gap-4">
            <p><b>Name:</b> {profile.firstName} {profile.lastName}</p>
            <p><b>Email:</b> {profile.email}</p>
            <p><b>Designation:</b> {profile.designation}</p>
            <p><b>Department:</b> {profile.department}</p>
            <p><b>Phone:</b> {profile.mobile}</p>
          </div>

          {/* ATTENDANCE */}
          <div className="mt-6">
            <AttendanceCard employeeId={profile.id} />
          </div>
        </>
      )}
    </div>
  );
}
