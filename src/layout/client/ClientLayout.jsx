//src/layout/client/ClientLayout.jsx
import { Outlet } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";
import ClientSidebar from "./ClientSidebar";

export default function ClientLayout() {
  return (
    <DashboardLayout sidebar={<ClientSidebar />}>
      <Outlet />
    </DashboardLayout>
  );
}
