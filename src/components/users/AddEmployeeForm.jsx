// src/components/users/AddEmployeeForm.jsx
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addEmployee, clearStatus } from "../../store/userManagementSlice";

/* ================= ROLE MAPPING ================= */
const getRolesByDesignation = (role) => {
  switch (role.toUpperCase()) {
    case "MANAGER":
      return ["ROLE_MANAGER", "ROLE_HR", "ROLE_EMPLOYEE"];
    case "HR":
      return ["ROLE_HR", "ROLE_EMPLOYEE"];
    default:
      return ["ROLE_EMPLOYEE"];
  }
};

export default function AddEmployeeForm({ role }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success } = useSelector((s) => s.userManagement);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addEmployee({
        userDto: {
          email: e.target.email.value,
          password: e.target.password.value,
          roles: getRolesByDesignation(role), // ✅ ROLE LOGIC
        },
        empReq: {
          firstName: e.target.firstName.value,
          lastName: e.target.lastName.value,
          mobile: e.target.mobile.value,
          cardNumber: e.target.cardNumber.value,
          designation: role,
          department: e.target.department.value,
          gender: e.target.gender.value,
          joiningDate: e.target.joiningDate.value, // yyyy-MM-dd
          salary: Number(e.target.salary.value),
          daysPresent: Number(e.target.daysPresent.value),
          paidLeaves: Number(e.target.paidLeaves.value),
        },
      })
    );
  };

  /* ================= CLOSE DRAWER AFTER SUCCESS ================= */
  useEffect(() => {
    if (success) {
      alert(`${role} added successfully`);
      dispatch(clearStatus());
      navigate("/admin/users");
    }
  }, [success, dispatch, navigate, role]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded shadow space-y-4"
    >
      <h3 className="text-lg font-semibold">Add {role}</h3>

      {/* ================= USER DETAILS ================= */}
      <div>
        <label className="form-label">Email</label>
        <input name="email" type="email" className="input" required />
      </div>

      <div>
        <label className="form-label">Password</label>
        <input name="password" type="password" className="input" required />
      </div>

      {/* ================= EMPLOYEE DETAILS ================= */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">First Name</label>
          <input name="firstName" className="input" />
        </div>

        <div>
          <label className="form-label">Last Name</label>
          <input name="lastName" className="input" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">Mobile</label>
          <input name="mobile" className="input" />
        </div>

        <div>
          <label className="form-label">Card Number</label>
          <input name="cardNumber" className="input" />
        </div>
      </div>

      <div>
        <label className="form-label">Department</label>
        <input
          name="department"
          className="input"
          placeholder="IT, HR, Finance..."
        />
      </div>

      <div>
        <label className="form-label">Gender</label>
        <select name="gender" className="input">
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      <div>
        <label className="form-label">Joining Date</label>
        <input name="joiningDate" type="date" className="input" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="form-label">Salary</label>
          <input name="salary" type="number" className="input" />
        </div>

        <div>
          <label className="form-label">Days Present</label>
          <input
            name="daysPresent"
            type="number"
            className="input"
            defaultValue={0}
          />
        </div>

        <div>
          <label className="form-label">Paid Leaves</label>
          <input
            name="paidLeaves"
            type="number"
            className="input"
            defaultValue={0}
          />
        </div>
      </div>

      <button
        disabled={loading}
        className="btn-primary w-full mt-4 disabled:opacity-60"
      >
        {loading ? "Creating..." : `Create ${role}`}
      </button>
    </form>
  );
}
