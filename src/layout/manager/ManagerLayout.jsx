//src/layout/manager/ManagerLayout.jsx
import { Outlet } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";
import ManagerSidebar from "./ManagerSidebar";

export default function ManagerLayout() {
  return (
    <DashboardLayout sidebar={<ManagerSidebar />}>
      <Outlet />
    </DashboardLayout>
  );
}
