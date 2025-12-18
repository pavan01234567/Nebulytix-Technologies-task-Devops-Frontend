//src/layout/hr/HrLayout.jsx
import { Outlet } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";
import HrSidebar from "./HrSidebar";

export default function HrLayout() {
  return (
    <DashboardLayout sidebar={<HrSidebar />}>
      <Outlet />
    </DashboardLayout>
  );
}
