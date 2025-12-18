//src/layout/employee/EmployeeLayout.jsx
import { Outlet } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";
import EmployeeSidebar from "./EmployeeSidebar";

export default function EmployeeLayout() {
  return (
    <DashboardLayout sidebar={<EmployeeSidebar />}>
      <Outlet />
    </DashboardLayout>
  );
}
