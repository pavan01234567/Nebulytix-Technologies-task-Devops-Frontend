// src/components/admin/EmployeeActionTabs.jsx
import { NavLink, useParams } from "react-router-dom";

export default function EmployeeActionTabs() {
  const { employeeId } = useParams();

  const tabs = [
    {
      label: "PROFILE",
      path: `/admin/user-lists/employees/${employeeId}`,
    },
    {
      label: "SALARY",
      path: `/admin/user-lists/employees/${employeeId}/salary`,
    },
    {
      label: "BANK",
      path: `/admin/user-lists/employees/${employeeId}/bank`,
    },
    {
      label: "PROJECTS",
      path: `/admin/user-lists/employees/${employeeId}/projects`,
    },
    {
      label: "LEAVES", // ✅ Added
      path: `/admin/user-lists/employees/${employeeId}/leaves`,
    },
  ];

  return (
    <div className="keka-nav">
      <div className="keka-nav-inner">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `keka-nav-item ${isActive ? "active" : ""}`
            }
          >
            {tab.label}
            <span className="keka-indicator" />
          </NavLink>
        ))}
      </div>
    </div>
  );
}
