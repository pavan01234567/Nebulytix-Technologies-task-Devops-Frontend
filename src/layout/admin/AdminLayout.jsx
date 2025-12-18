//src/layout/admin/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <DashboardLayout sidebar={<AdminSidebar />}>
      <Outlet />
    </DashboardLayout>
  );
}
