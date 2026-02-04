import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProfile } from "../store/adminSlice";
import {
  fetchAdmins,
  fetchManagers,
  fetchHrs,
  fetchEmployees,
} from "../store/userListsSlice";
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

  useEffect(() => {
    dispatch(fetchAdminProfile());

    // fetch lists ONLY for counts
    dispatch(fetchAdmins());
    dispatch(fetchManagers());
    dispatch(fetchHrs());
    dispatch(fetchEmployees());
  }, [dispatch]);

  const adminCount = admins.length;
  const managerCount = managers.length;
  const hrCount = hrs.length;
  const employeeCount = employees.length;

  return (
    <>
      {(adminLoading || usersLoading) && <p>Loading...</p>}
      {(adminError || usersError) && (
        <p className="text-red-600">{adminError || usersError}</p>
      )}

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

      {/* USER COUNT PIE CHART */}
      <UserCountPieChart
        adminCount={adminCount}
        managerCount={managerCount}
        hrCount={hrCount}
        employeeCount={employeeCount}
      />
    </>
  );
}



