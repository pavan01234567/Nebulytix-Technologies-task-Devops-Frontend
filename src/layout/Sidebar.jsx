//src/layout/Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LayoutDashboard, UserPlus, Users, FileText } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Sidebar() {
  const { userDashboard } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(null);
  const sidebarRef = useRef(null);

  // Close flyout on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (userDashboard !== "ADMIN_DASHBOARD") return null;

  return (
    <aside
      ref={sidebarRef}
      className="fixed left-0 top-0 w-20 h-screen bg-[#0D243C] text-white flex flex-col items-center z-30"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center font-bold">NXT</div>

      <nav className="flex-1 mt-6 flex flex-col items-center gap-3">
        {/* Dashboard */}
        <NavLink to="/admin" className="sidebar-icon">
          <LayoutDashboard size={20} />
        </NavLink>

        {/* ADD USER */}
        <SidebarFlyout
          icon={<UserPlus size={20} />}
          open={openMenu === "add"}
          onToggle={() => setOpenMenu(openMenu === "add" ? null : "add")}
          items={[
            { label: "Add Admin", path: "/admin/users/add-admin" },
            { label: "Add Manager", path: "/admin/users/add-manager" },
            { label: "Add HR", path: "/admin/users/add-hr" },
            { label: "Add Employee", path: "/admin/users/add-employee" },
            { label: "Add Client", path: "/admin/users/add-client" },
          ]}
          onSelect={(path) => {
            navigate(path);
            setOpenMenu(null);
          }}
        />

        {/* USERS LIST */}
        <SidebarFlyout
          icon={<Users size={20} />}
          open={openMenu === "users"}
          onToggle={() => setOpenMenu(openMenu === "users" ? null : "users")}
          items={[
            { label: "Admins", path: "/admin/users/list-admin" },
            { label: "Managers", path: "/admin/users/list-manager" },
            { label: "HRs", path: "/admin/users/list-hr" },
            { label: "Employees", path: "/admin/users/list-employee" },
            { label: "Clients", path: "/admin/users/list-client" },
          ]}
          onSelect={(path) => {
            navigate(path);
            setOpenMenu(null);
          }}
        />

        {/* Reports */}
        <NavLink to="/admin/view-report" className="sidebar-icon">
          <FileText size={20} />
        </NavLink>
      </nav>
    </aside>
  );
}

/* ================= FLYOUT ================= */

function SidebarFlyout({ icon, items, open, onToggle, onSelect }) {
  return (
    <div className="relative">
      <button onClick={onToggle} className="sidebar-icon">
        {icon}
      </button>

      {open && (
        <div className="absolute left-14 top-0 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-50">
          {items.map((i) => (
            <button
              key={i.path}
              onClick={() => onSelect(i.path)}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              {i.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
