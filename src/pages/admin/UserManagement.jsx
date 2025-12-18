import { Outlet } from "react-router-dom";
import UserManagementTabs from "../../components/admin/UserManagementTabs";

export default function UserManagement() {
  return (
    <>
      {/* MODULE NAV (flush under Topbar) */}
      <UserManagementTabs />

      {/* PAGE AREA */}
      <div className="bg-[#f4f6f8] min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-6">
          {/* CONTENT CONTAINER */}
          <div className="bg-white border border-gray-200 rounded-sm">
            <div className="p-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
