// App.jsx
import { Routes, Route } from "react-router-dom";

// Public
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import Career from "./pages/Career";
import JobDetails from "./pages/JobDetails";
import Contacts from "./pages/contacts";
import About from "./pages/About";

// Admin
import AdminLayout from "./layout/admin/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import UserLists from "./pages/admin/UserLists";
import ClientDetails from "./pages/admin/ClientDetails";
import EmployeeDetails from "./pages/admin/EmployeeDetails";
import HrDetails from "./pages/admin/HrDetails";
import ManagerDetails from "./pages/admin/ManagerDetails";
import ClientProjectList from "./pages/admin/ClientProjectList";
import ProjectDetails from "./pages/admin/projects/ProjectDetails";
import AddEmployeeBankDetails from "./pages/admin/AddEmployeeBankDetails";
import AddEmployeeSalaryDetails from "./pages/admin/AddEmployeeSalaryDetails";
import EmployeeSalaryDetails from "./pages/admin/EmployeeSalaryDetails";
import EmployeeBankDetails from "./pages/admin/EmployeeBankDetails";
import EmployeeProjects from "./pages/admin/EmployeeProjects";
import EmployeeLeaves from "./pages/admin/EmployeeLeaves";

// ✅ NEW (GLOBAL PROJECT LIST)
import ProjectList from "./pages/admin/projects/ProjectList";

// Admin forms
import AddAdminForm from "./components/users/AddAdminForm";
import AddClientForm from "./components/users/AddClientForm";
import AddEmployeeForm from "./components/users/AddEmployeeForm";
import AddProjectForm from "./pages/admin/AddProjectForm";

import HrLayout from "./layout/hr/HrLayout";
import HrDashboard from "./pages/HrDashboard";

// Manager
import ManagerLayout from "./layout/manager/ManagerLayout";
import ManagerDashboard from "./pages/ManagerDashboard";

// Employee
import EmployeeLayout from "./layout/employee/EmployeeLayout";
import EmployeeDashboard from "./pages/EmployeeDashboard";

// Client
import ClientLayout from "./layout/client/ClientLayout";
import ClientDashboard from "./pages/ClientDashboard";
import EmployeeList from "./components/hr/EmployeeList";


// Protected
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/career" element={<Career />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/about" element={<About />} />
      <Route path="/career/job/:id" element={<JobDetails />} />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="ADMIN_DASHBOARD">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="user-lists" element={<UserLists />} />
        <Route
          path="user-lists/clients/:clientId"
          element={<ClientDetails />}
        />
        <Route
          path="user-lists/employees/:employeeId"
          element={<EmployeeDetails />}
        />
        <Route path="user-lists/hrs/:hrId" element={<HrDetails />} />
        <Route
          path="user-lists/managers/:managerId"
          element={<ManagerDetails />}
        />
        <Route
          path="user-lists/clients/:clientId/add-project"
          element={<AddProjectForm />}
        />
        <Route
          path="user-lists/clients/:clientId/projects"
          element={<ClientProjectList />}
        />
        <Route
          path="user-lists/clients/:clientId/projects/:projectId"
          element={<ProjectDetails />}
        />
        <Route
          path="user-lists/employees/:employeeId/add-bank-details"
          element={<AddEmployeeBankDetails />}
        />
        <Route
          path="user-lists/employees/:employeeId/update-bank-details"
          element={<AddEmployeeBankDetails />}
        />
        <Route
          path="user-lists/employees/:employeeId/add-salary-details"
          element={<AddEmployeeSalaryDetails />}
        />
        <Route
          path="user-lists/employees/:employeeId/projects"
          element={<EmployeeProjects />}
        />
        <Route
          path="/admin/user-lists/employees/:employeeId/leaves"
          element={<EmployeeLeaves />}
        />

        {/* EMPLOYEE TABS */}
        <Route
          path="user-lists/employees/:employeeId/salary"
          element={<EmployeeSalaryDetails />}
        />
        <Route
          path="user-lists/employees/:employeeId/bank"
          element={<EmployeeBankDetails />}
        />


        {/* HR TABS */}
        <Route
          path="user-lists/hrs/:hrId/salary"
          element={<EmployeeSalaryDetails />}
        />
        <Route
          path="user-lists/hrs/:hrId/bank"
          element={<EmployeeBankDetails />}
        />
        

        {/* MANAGER TABS */}
        <Route
          path="user-lists/managers/:managerId/salary"
          element={<EmployeeSalaryDetails />}
        />
        <Route
          path="user-lists/managers/:managerId/bank"
          element={<EmployeeBankDetails />}
        />

        {/* USERS */}
        <Route path="users" element={<UserManagement />}>
          <Route path="add-admin" element={<AddAdminForm />} />
          <Route
            path="add-manager"
            element={<AddEmployeeForm role="Manager" mode="ADMIN" />}
          />
          <Route
            path="add-hr"
            element={<AddEmployeeForm role="HR" mode="ADMIN" />}
          />
          <Route
            path="add-employee"
            element={<AddEmployeeForm role="Employee" mode="ADMIN" />}
          />
          <Route path="add-client" element={<AddClientForm />} />
        </Route>
{/* ================= ADMIN PROJECTS (GLOBAL) ================= */}
<Route path="projects" element={<ProjectList />} /> {/* Full-page project list */}
<Route path="projects/:projectId" element={<ProjectDetails />} /> {/* Details page */}

      </Route>

      {/* ================= HR ================= */}
      <Route
        path="/hr"
        element={
          <ProtectedRoute allowedRole="HR_DASHBOARD">
            <HrLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HrDashboard />} />

        <Route 
          path="/hr/employees" 
          element={<EmployeeList />} 
        />

        {/* HR EMPLOYEE ACTIONS */}
        <Route
          path="employees/add"
          element={<AddEmployeeForm role="Employee" mode="HR" />}
        />
      </Route>



      {/* ================= MANAGER ================= */}
      <Route
        path="/manager"
        element={
          <ProtectedRoute allowedRole="MANAGER_DASHBOARD">
            <ManagerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ManagerDashboard />} />
      </Route>

      {/* ================= EMPLOYEE ================= */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRole="EMPLOYEE_DASHBOARD">
            <EmployeeLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<EmployeeDashboard />} />
      </Route>

      {/* ================= CLIENT ================= */}
      <Route
        path="/client"
        element={
          <ProtectedRoute allowedRole="CLIENT_DASHBOARD">
            <ClientLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ClientDashboard />} />
      </Route>
    </Routes>
  );
}
