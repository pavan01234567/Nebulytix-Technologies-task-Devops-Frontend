import { NavLink, useParams } from "react-router-dom";

export default function ClientActionTabs() {
  const { clientId } = useParams();

  const tabs = [
    { label: "ADD PROJECT", path: `/clients/${clientId}/add-project` },
    { label: "PROJECT LIST", path: `/clients/${clientId}/projects` },
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
