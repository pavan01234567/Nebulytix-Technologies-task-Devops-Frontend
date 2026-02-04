import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAdmins,
  fetchManagers,
  fetchHrs,
  fetchEmployees,
  fetchClients,
} from "../../store/userListsSlice";

import AdminList from "../../components/userLists/AdminList";
import ManagerList from "../../components/userLists/ManagerList";
import HrList from "../../components/userLists/HrList";
import EmployeeList from "../../components/userLists/EmployeeList";
import ClientList from "../../components/userLists/ClientList";

/* =======================
   TABS CONFIG
======================= */
const tabs = [
  { label: "ADMINS", type: "admins" },
  { label: "MANAGERS", type: "managers" },
  { label: "HRS", type: "hrs" },
  { label: "EMPLOYEES", type: "employees" },
  { label: "CLIENTS", type: "clients" },
];

export default function UserLists({ userType: propUserType }) {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const queryUserType = new URLSearchParams(search).get("type");
  const activeType = propUserType || queryUserType || "admins";

  const { loading, error } = useSelector((state) => state.userLists);

  /* =======================
     FETCH USERS
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

  /* =======================
     RENDER LIST
  ======================= */
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
      {/* =======================
          TOP ADMIN NAVBAR
      ======================= */}
      <div
        style={{
          background: "linear-gradient(180deg, #0b1f33, #0d243c)",
          borderBottom: "1px solid #123456",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "44px",
            padding: "0 24px",
            gap: "32px",
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeType === tab.type;

            return (
              <NavLink
                key={tab.type}
                to={`?type=${tab.type}`} // ✅ Fixed
                style={{
                  position: "relative",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: isActive ? "#ffffff" : "#b9c3cf",
                  textDecoration: "none",
                  padding: "4px 0",
                }}
              >
                {tab.label}

                {/* Pink triangle indicator */}
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: "-8px",
                      transform: "translateX(-50%)",
                      width: 0,
                      height: 0,
                      borderLeft: "6px solid transparent",
                      borderRight: "6px solid transparent",
                      borderTop: "6px solid #ec4899",
                    }}
                  />
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* =======================
          STATES
      ======================= */}
      {loading && <p className="text-gray-500 px-6">Loading users...</p>}

      {error && <p className="text-red-600 px-6">{error}</p>}

      {/* =======================
          USER LIST
      ======================= */}
      {!loading && (
        <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderList()}
        </div>
      )}
    </div>
  );
}
