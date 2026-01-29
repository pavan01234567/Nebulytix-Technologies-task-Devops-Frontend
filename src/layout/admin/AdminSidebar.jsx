import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UserPlus,
  Users,
  FileText,
  FolderKanban,     // ✅ NEW
} from "lucide-react";

import { useRef, useState } from "react";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);
  const hoverTimer = useRef(null);

  const openWithDelay = (menu) => {
    hoverTimer.current = setTimeout(() => {
      setOpenMenu(menu);
    }, 80);
  };

  const closeMenu = () => {
    clearTimeout(hoverTimer.current);
    setOpenMenu(null);
  };

  return (
    <aside className="fixed left-0 top-0 w-20 h-screen bg-[#071a2d] z-30 flex flex-col items-center">
      {/* LOGO */}
      <div className="h-16 flex items-center justify-center text-white font-semibold">
        NXT
      </div>

      <nav className="flex flex-col w-full">
        <IconItem
          to="/admin"
          label="Home"
          icon={<LayoutDashboard size={20} />}
        />

        {/* ADD USERS */}
        <HoverFlyout
          label="Add"
          icon={<UserPlus size={20} />}
          defaultPath="/admin/users/add-admin" // ✅ NEW
          open={openMenu === "add"}
          onEnter={() => openWithDelay("add")}
          onLeave={closeMenu}
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

        {/* USERS LIST */}
        <HoverFlyout
          label="Users"
          icon={<Users size={20} />}
          defaultPath="/admin/user-lists?type=employees" // ✅ NEW
          open={openMenu === "users"}
          onEnter={() => openWithDelay("users")}
          onLeave={closeMenu}
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



        {/* PROJECTS */}
        <HoverFlyout
          label="Projects"
          icon={<FolderKanban size={20} />}
          defaultPath="/admin/projects"
          open={openMenu === "projects"}
          onEnter={() => openWithDelay("projects")}
          onLeave={closeMenu}
          location={location}
          items={[
            { label: "View All Projects", path: "/admin/projects" },
          ]}
          onSelect={(path) => {
            navigate(path);
            closeMenu();
          }}
        />

        <IconItem
          to="/admin/view-report"
          label="Reports"
          icon={<FileText size={20} />}
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
        relative h-14 w-full flex flex-col items-center justify-center gap-1
        text-[11px] font-medium leading-tight
        transition-colors duration-150
        ${
          isActive
            ? "bg-[#0b2239] text-[#e5f0ff]"
            : "text-[#8fa3bf] hover:text-[#c7d5ea]"
        }
        focus:outline-none focus:bg-[#0f2f4d] focus:text-white
        `
      }
    >
      {icon}
      <span>{label}</span>
      <span className="absolute left-0 top-0 h-full w-[3px] bg-pink-500" />
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
  defaultPath, // ✅ NEW
}) {
  return (
    <div
      className="relative w-full"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* ICON (NOW CLICKABLE) */}
      <button
        onClick={() => onSelect(defaultPath)} // ✅ NEW
        className="
          h-14 w-full flex flex-col items-center justify-center gap-1
          text-[11px] font-medium leading-tight
          text-[#8fa3bf] hover:text-[#c7d5ea]
          transition-colors duration-150
          focus:outline-none
        "
      >
        {icon}
        <span>{label}</span>
      </button>

      {/* FLYOUT */}
      <div
        className={`
          absolute left-20 top-0 w-56
          bg-[#0b2239] border-l border-white/10
          transition-all duration-150 ease-out
          ${
            open
              ? "opacity-100 translate-x-0 pointer-events-auto"
              : "opacity-0 translate-x-1 pointer-events-none"
          }
        `}
      >
        {items.map((i) => {
          const isActive = location.pathname === i.path;

          return (
            <button
              key={i.path}
              onClick={() => onSelect(i.path)}
              className={`
                w-full px-4 py-2 text-left
                text-[12.5px] font-medium leading-[1.3]
                transition-colors duration-100
                ${
                  isActive
                    ? "bg-[#133b5c] text-white"
                    : "text-[#9fb3cc] hover:bg-[#0f2f4d] hover:text-white"
                }
                focus:outline-none focus:bg-[#0f2f4d] focus:text-white
              `}
            >
              {i.label}
            </button>
          );
        })}
      </div>
    </div>
    
  );
}
