//src/pages/admin/UserLists.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import {
  fetchAdmins,
  fetchManagers,
  fetchHrs,
  fetchEmployees,
  fetchClients,
} from "../../store/userListsSlice";

import AdminList from "../../components/userLists/AdminList";
import EmployeeList from "../../components/userLists/EmployeeList";
import ManagerList from "../../components/userLists/ManagerList";
import HrList from "../../components/userLists/HrList";
import ClientList from "../../components/userLists/ClientList";

const tabs = [
  { label: "Admins", value: "admins" },
  { label: "Managers", value: "managers" },
  { label: "HRs", value: "hrs" },
  { label: "Employees", value: "employees" },
  { label: "Clients", value: "clients" },
];

export default function UserLists() {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const activeType = params.get("type") || "admins";

  const { loading, error } = useSelector((s) => s.userLists);

  /* =======================
     FETCH BASED ON TAB
  ======================= */
  useEffect(() => {
    switch (activeType) {
      case "managers":
        dispatch(fetchManagers());
        break;
      case "hrs":
        dispatch(fetchHrs());
        break;
      case "employees":
        dispatch(fetchEmployees());
        break;
      case "clients":
        dispatch(fetchClients());
        break;
      default:
        dispatch(fetchAdmins());
    }
  }, [activeType, dispatch]);

  const renderList = () => {
    switch (activeType) {
      case "managers":
        return <ManagerList />;
      case "hrs":
        return <HrList />;
      case "employees":
        return <EmployeeList />;
      case "clients":
        return <ClientList />;
      default:
        return <AdminList />;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">User Lists</h1>

      {/* TABS */}
      <div className="flex gap-3 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setParams({ type: t.value })}
            className={`px-4 py-2 rounded text-sm font-medium border ${
              activeType === t.value
                ? "bg-[#0D243C] text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* LOADING */}
      {loading && <p className="text-gray-500">Loading users...</p>}

      {/* ERROR */}
      {error && <p className="text-red-600">{error}</p>}

      {/* LIST */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderList()}
        </div>
      )}
    </div>
  );
}
