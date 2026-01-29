
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import EmployeeCard from "./EmployeeCard";

export default function InactiveEmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/hr/getEmpList?status=inactive")
      .then((res) => setEmployees(res.data?.data || []));
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">
        Inactive Employees
      </h2>

      {employees.map((emp) => (
        <EmployeeCard key={emp.id} employee={emp} />
      ))}
    </div>
  );
}
