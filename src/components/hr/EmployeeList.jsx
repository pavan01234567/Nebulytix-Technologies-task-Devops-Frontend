// src/components/hr/EmployeeList.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
// import { BACKEND_BASE_URL } from "../../api/config";
import EmployeeCard from "./EmployeeCard";
import { Search } from "lucide-react";

export default function EmployeeList({ refreshKey = 0, onActionComplete, roleFilter }) {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("active"); // 👈 NEW

  
  //----- FETCH EMPLOYEES (active /inactive) -----
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/hr/getEmpList");
      const list = res.data?.data || [];

      setEmployees(list);
      setFilteredEmployees(list);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
      setEmployees([]);
      setFilteredEmployees([]);
    } finally {
      setLoading(false);
    }
  };
/* --------- filtering by status (active/inactive) --------- */
  useEffect(() => {
  const filtered = employees.filter(
    (emp) => emp.empStatus?.toLowerCase() === statusFilter
  );
  setFilteredEmployees(filtered);
}, [employees, statusFilter]);


// ✅ INITIAL + REFRESH FETCH
  useEffect(() => {
    fetchEmployees();
  }, [refreshKey, statusFilter]);



  // 🔎 Search Logic
  useEffect(() => {
    const s = search.toLowerCase();
    const result = employees
    .filter((emp) => emp.empStatus?.toLowerCase() === statusFilter)
    .filter(
      (emp) =>
        emp.firstName?.toLowerCase().includes(s) ||
        emp.lastName?.toLowerCase().includes(s) ||
        emp.email?.toLowerCase().includes(s) ||
        emp.cardNumber?.toString().includes(s)
    );
    setFilteredEmployees(result);
  }, [search, employees, statusFilter]);

  return (
    <div className="space-y-6">

      {/* HEADER ROW */}
      <div className="flex items-center justify-between">

        {/* ⭐ Employee List heading with HR dashboard color */}
        <h2
          className="ml-2 text-2xl font-bold tracking-wide
            text-sky-700     /* Matches HR Dashboard */"
        >
          Employee List
        </h2>


        {/*----------- CENTER: GLASS TOGGLE ------------*/}

        <div className="flex gap-3 p-2 w-fit rounded-full bg-white/40 backdrop-blur-xl border border-white/50 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_8px_20px_rgba(0,0,0,0.08)] mt-4">
          <button
            onClick={() => setStatusFilter("active")}
            className={`
              px-6 py-2 rounded-full text-sm font-semibold
              transition-all duration-300
              ${
                statusFilter === "active"
                 ? "bg-white/70 text-teal-600 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_6px_16px_rgba(0,0,0,0.12)] backdrop-blur-xl"
                 : "bg-transparent text-gray-400 hover:text-gray-600"
              }
            `}
          >
            Active 
          </button>

           <button
              onClick={() => setStatusFilter("inactive")}
              className={`
                px-6 py-2 rounded-full text-sm font-semibold
                transition-all duration-300
                ${
                  statusFilter === "inactive"
                    ? "bg-white/70 text-teal-600 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_6px_16px_rgba(0,0,0,0.12)] backdrop-blur-xl"
                    : "bg-transparent text-gray-400 hover:text-gray-600"
                }
              `}
            >
              Inactive 
            </button>
        </div>

        {/* ⭐ Search Input with Icon */}
        <div className="relative mr-10 mt-3">
          <Search
            className="
              w-5 h-5 absolute left-4 top-1/2 
              -translate-y-1/2 text-blue-900
            "
          />

          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-80 pl-10 pr-1 py-3 px-30
              rounded-xl border border-gray-300
              bg-white shadow-sm
              text-gray-700 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-sky-500
              transition-all duration-200
            "
          />
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="p-4 border rounded-lg text-gray-600 shadow-sm bg-gray-50">
          Loading employees...
        </div>
      )}

      {/* EMPTY */}
      {!loading && filteredEmployees.length === 0 && (
        <div className="p-4 border rounded-lg text-gray-500 shadow-sm bg-gray-50">
          No employees found.
        </div>
      )}

      {console.log("Filtered employees:", filteredEmployees)}


      {/* EMPLOYEE CARDS */}
      {/* <div className="space-y-4 max-w-2xl mx-auto px-2"> */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-2">
        {filteredEmployees.map((emp) => (
          <EmployeeCard
            key={emp.id}
            employee={emp}
            onActionComplete={fetchEmployees}
          />
        ))}
      </div>
    </div>
  );
}
