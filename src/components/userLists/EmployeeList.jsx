//src/components/userLists/EmployeeList.jsx
import { useSelector } from "react-redux";
import EmployeeCard from "./cards/EmployeeCard";

export default function EmployeeList() {
  const employees = useSelector((s) => s.userLists.employees);

  if (!employees || employees.length === 0) {
    return <p className="text-gray-500">No employees found</p>;
  }

  return (
    <>
      {employees.map((emp) => (
        <EmployeeCard key={emp.id} employee={emp} />
      ))}
    </>
  );
}
