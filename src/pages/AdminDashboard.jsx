//src/pages/AdminDashboard.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProfile } from "../store/adminSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((s) => s.admin);

  useEffect(() => {
    dispatch(fetchAdminProfile());
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {profile && (
        <div className="mt-4 p-4 bg-white shadow rounded-lg">
          <p>
            <b>Email:</b> {profile.email}
          </p>
          <p>
            <b>Enabled:</b> {profile.enabled ? "Yes" : "No"}
          </p>
        </div>
      )}
    </>
  );
}
