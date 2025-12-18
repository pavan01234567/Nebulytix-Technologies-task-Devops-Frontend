// src/layout/AdminSidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, UserPlus, Users, FileText } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AdminSidebar() {
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

  return (
    <aside
      ref={sidebarRef}
      className="fixed left-0 top-0 w-20 h-screen bg-[#0D243C] text-white flex flex-col items-center z-30"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center font-bold">NXT</div>

      <nav className="flex-1 mt-6 flex flex-col items-center gap-3">
        {/* ADMIN HOME */}
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

        {/* USERS LIST (UPDATED ROUTES ✅) */}
        <SidebarFlyout
          icon={<Users size={20} />}
          open={openMenu === "users"}
          onToggle={() => setOpenMenu(openMenu === "users" ? null : "users")}
          items={[
            { label: "Admins", path: "/admin/user-lists?type=admins" },
            { label: "Managers", path: "/admin/user-lists?type=managers" },
            { label: "HRs", path: "/admin/user-lists?type=hrs" },
            { label: "Employees", path: "/admin/user-lists?type=employees" },
            { label: "Clients", path: "/admin/user-lists?type=clients" },
          ]}
          onSelect={(path) => {
            navigate(path);
            setOpenMenu(null);
          }}
        />

        {/* REPORTS */}
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
