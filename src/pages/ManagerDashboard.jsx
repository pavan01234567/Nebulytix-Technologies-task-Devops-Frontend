import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchManagerProfile } from "../store/managerSlice";
import AttendanceCard from "../components/AttendanceCard";

export default function ManagerDashboard() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((s) => s.manager);

  useEffect(() => {
    dispatch(fetchManagerProfile());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold">Manager Dashboard</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {profile && (
        <>
          {/* PROFILE CARD (UNCHANGED) */}
          <div className="mt-4 p-4 bg-white shadow rounded-lg">
            <p>
              <b>Name:</b> {profile.firstName} {profile.lastName}
            </p>
            {/* keep future manager fields here */}
          </div>

          {/* 🔹 ATTENDANCE (ADDED) */}
          <div className="mt-6">
            <AttendanceCard employeeId={profile.id} />
          </div>
        </>
      )}
    </div>
  );
}
