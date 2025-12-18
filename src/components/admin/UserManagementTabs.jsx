import { NavLink } from "react-router-dom";

const tabs = [
  { label: "ADD ADMIN", path: "add-admin" },
  { label: "ADD MANAGER", path: "add-manager" },
  { label: "ADD HR", path: "add-hr" },
  { label: "ADD EMPLOYEE", path: "add-employee" },
  { label: "ADD CLIENT", path: "add-client" },
];

export default function UserManagementTabs() {
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
