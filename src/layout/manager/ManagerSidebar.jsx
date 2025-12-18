import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users } from "lucide-react";

export default function ManagerSidebar() {
  return (
    <aside className="fixed left-0 top-0 w-20 h-screen bg-[#0D243C] text-white flex flex-col items-center z-30">
      <div className="h-16 flex items-center justify-center font-bold">NXT</div>

      <nav className="flex-1 mt-6 flex flex-col items-center gap-4">
        <NavLink to="/manager" className="sidebar-icon">
          <LayoutDashboard size={20} />
        </NavLink>

        <NavLink to="/manager/team" className="sidebar-icon">
          <Users size={20} />
        </NavLink>
      </nav>
    </aside>
  );
}
