import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EmployeeActionTabs from "../../components/admin/EmployeeActionTabs";
import { fetchEmployeeSalary, clearSalaryState } from "../../store/salarySlice";

export default function EmployeeSalaryDetails() {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { salary, loading, error } = useSelector((s) => s.salary);

  useEffect(() => {
    // Clear previous state when switching employees
    dispatch(clearSalaryState());
    dispatch(fetchEmployeeSalary(employeeId));
  }, [employeeId, dispatch]);

  const handleAddSalary = () => {
    navigate(`/admin/user-lists/employees/${employeeId}/add-salary-details`);
  };

  return (
    <div className="space-y-6">
      <EmployeeActionTabs />

      <div className="p-6 space-y-6">
        <Header title="Salary Details" onBack={() => navigate(-1)} />

        {loading && <p>Loading salary details...</p>}

        {!loading && error && (
          <div className="bg-red-100 p-4 rounded text-red-700">
            <p>{error}</p>
            <button
              onClick={handleAddSalary}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Add Salary Details
            </button>
          </div>
        )}

        {!loading && !salary && !error && (
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="text-gray-600 mb-4">Salary details not added yet</p>
            <button
              onClick={handleAddSalary}
              className="px-5 py-2 bg-indigo-600 text-white rounded"
            >
              Add Salary Details
            </button>
          </div>
        )}

        {salary && (
          <Card>
            <Detail label="Basic Salary">₹ {salary.basicSalary}</Detail>
            <Detail label="HRA">₹ {salary.hra}</Detail>
            <Detail label="Allowance">₹ {salary.allowance}</Detail>
            <Detail label="Deductions">₹ {salary.deductions}</Detail>
            <Detail label="Net Salary">₹ {salary.netSalary}</Detail>
            <Detail label="Effective From">{salary.effectiveFrom}</Detail>
          </Card>
        )}
      </div>
    </div>
  );
}

/* ================= UI Components ================= */

function Header({ title, onBack }) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <button
        onClick={onBack}
        className="text-sm text-blue-600 hover:underline"
      >
        ← Back
      </button>
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 grid grid-cols-2 gap-6">
      {children}
    </div>
  );
}

function Detail({ label, children }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{children}</p>
    </div>
  );
}
