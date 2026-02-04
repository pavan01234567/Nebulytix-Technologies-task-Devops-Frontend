import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UserPlus,
  Users,
  FolderKanban,
} from "lucide-react";
import { useRef, useState } from "react";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);
  const hoverTimer = useRef(null);

  const openWithDelay = (menu) => {
    hoverTimer.current = setTimeout(() => setOpenMenu(menu), 100);
  };

  const closeMenu = () => {
    clearTimeout(hoverTimer.current);
    setOpenMenu(null);
  };

  return (
    <aside className="fixed left-0 top-0 w-24 h-screen bg-[#071a2d] border-r border-white/10 z-30 flex flex-col items-center">
      {/* LOGO */}
      <div className="h-16 flex items-center justify-center text-white font-semibold tracking-wide">
        NXT
      </div>

      <nav className="flex flex-col w-full">
        <IconItem to="/admin" icon={<LayoutDashboard size={24} />} label="Home" />

        <HoverFlyout
          label="Add"
          icon={<UserPlus size={24} />}
          open={openMenu === "add"}
          onEnter={() => openWithDelay("add")}
          onLeave={closeMenu}
          defaultPath="/admin/users/add-admin"
          location={location}
          items={[
            { label: "Add Admin", path: "/admin/users/add-admin" },
            { label: "Add Manager", path: "/admin/users/add-manager" },
            { label: "Add HR", path: "/admin/users/add-hr" },
            { label: "Add Employee", path: "/admin/users/add-employee" },
            { label: "Add Client", path: "/admin/users/add-client" },
          ]}
          onSelect={(path) => {
            navigate(path);
            closeMenu();
          }}
        />

        <HoverFlyout
          label="Users"
          icon={<Users size={24} />}
          open={openMenu === "users"}
          onEnter={() => openWithDelay("users")}
          onLeave={closeMenu}
          defaultPath="/admin/user-lists?type=employees"
          location={location}
          items={[
            { label: "Admins", path: "/admin/user-lists?type=admins" },
            { label: "Managers", path: "/admin/user-lists?type=managers" },
            { label: "HRs", path: "/admin/user-lists?type=hrs" },
            { label: "Employees", path: "/admin/user-lists?type=employees" },
            { label: "Clients", path: "/admin/user-lists?type=clients" },
          ]}
          onSelect={(path) => {
            navigate(path);
            closeMenu();
          }}
        />

        <HoverFlyout
          label="Projects"
          icon={<FolderKanban size={24} />}
          open={openMenu === "projects"}
          onEnter={() => openWithDelay("projects")}
          onLeave={closeMenu}
          defaultPath="/admin/projects"
          location={location}
          items={[{ label: "All Projects", path: "/admin/projects" }]}
          onSelect={(path) => {
            navigate(path);
            closeMenu();
          }}
        />
      </nav>
    </aside>
  );
}

/* ================= ICON ITEM ================= */

function IconItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `
        relative h-16 w-full flex flex-col items-center justify-center gap-2
        text-[12px] font-medium
        transition-colors duration-150
        ${isActive ? "bg-[#0b2239] text-white" : "text-[#8fa3bf] hover:text-[#e4efff]"}
      `
      }
    >
      {icon}
      <span>{label}</span>

      {/* ACTIVE INDICATOR */}
      <span
        className={`
          absolute left-0 top-0 h-full w-[3px]
          transition-opacity
          ${location.pathname === to ? "bg-pink-500" : "opacity-0"}
        `}
      />
    </NavLink>
  );
}

/* ================= HOVER FLYOUT ================= */

function HoverFlyout({
  icon,
  label,
  items,
  open,
  onEnter,
  onLeave,
  onSelect,
  location,
  defaultPath,
}) {
  return (
    <div
      className="relative w-full"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* ICON BUTTON */}
      <button
        onClick={() => onSelect(defaultPath)}
        className="
          h-16 w-full flex flex-col items-center justify-center gap-2
          text-[12px] font-medium
          text-[#8fa3bf] hover:text-[#e4efff]
          transition-colors duration-150
          focus:outline-none
        "
      >
        {icon}
        <span>{label}</span>
      </button>

      {/* FLYOUT PANEL */}
      <div
        className={`
          absolute left-24 top-0 w-64
          bg-[#0b2239] border border-white/10 rounded-md shadow-xl
          transition-all duration-150 ease-out
          ${open ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-2 pointer-events-none"}
        `}
      >
        {items.map((item) => {
          const active = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => onSelect(item.path)}
              className={`
                w-full px-4 py-3 text-left
                text-[13px] font-medium
                transition-colors
                ${active ? "bg-[#133b5c] text-white" : "text-[#9fb3cc] hover:bg-[#0f2f4d] hover:text-white"}
              `}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}