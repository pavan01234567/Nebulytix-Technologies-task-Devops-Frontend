import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { addEmployee } from "../../store/userManagementSlice";
import { hrAddEmployee } from "../../store/hrEmployeeSlice";
import SuccessModal from "../common/SuccessModal";

/* ================= INPUT RESTRICTIONS ================= */
const onlyLetters = (e) => {
  e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
};

const onlyNumbers = (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
};

/* ================= ROLE → BACKEND ROLE MAP ================= */
const ROLE_MAP = {
  Employee: ["ROLE_EMPLOYEE"],
  Manager: ["ROLE_MANAGER", "ROLE_EMPLOYEE"],
  HR: ["ROLE_HR", "ROLE_EMPLOYEE"],
};

export default function AddEmployeeForm({ role, mode = "ADMIN" }) {
  const dispatch = useDispatch();

  // ✅ SAFE SELECTOR
  const loading = useSelector((s) =>
    mode === "HR" ? s.hrEmployee?.loading : s.userManagement?.loading
  );

  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userDto: {
        email: e.target.email.value,
        password: e.target.password.value,
        roles: ROLE_MAP[role] || ["ROLE_EMPLOYEE"],
      },
      empReq: {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        mobile: e.target.mobile.value,
        cardNumber: e.target.cardNumber.value,
        designation: role,
        department: e.target.department.value,
        gender: e.target.gender.value,
        joiningDate: e.target.joiningDate.value,
        salary: Number(e.target.salary.value),
        daysPresent: Number(e.target.daysPresent.value),
        paidLeaves: Number(e.target.paidLeaves.value),
      },
    };

    try {
      const action =
        mode === "HR" ? hrAddEmployee(payload) : addEmployee(payload);

      await dispatch(action).unwrap();
      setShowSuccess(true);
    } catch {
      alert("Failed to add employee");
    }
  };

  const handleOk = () => {
    setShowSuccess(false);
    formRef.current.reset();
    emailRef.current.focus();
  };

  return (
    <>
      <div className="max-w-[980px] mx-auto">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          autoComplete="off"
          className="space-y-10"
        >
          {/* ================= ACCOUNT DETAILS ================= */}
          <Section title="Account Details">
            <div className="grid grid-cols-2 gap-6">
              <Input label="Email *">
                <input
                  ref={emailRef}
                  name="email"
                  type="email"
                  required
                  autoComplete="off"
                  className="input-base"
                />
              </Input>

              <Input label="Password *">
                <input
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="input-base"
                />
              </Input>
            </div>
          </Section>

          {/* ================= PERSONAL DETAILS ================= */}
          <Section title="Personal Information">
            <div className="grid grid-cols-2 gap-6">
              <Input label="First Name">
                <input
                  name="firstName"
                  onInput={onlyLetters}
                  className="input-base"
                />
              </Input>

              <Input label="Last Name">
                <input
                  name="lastName"
                  onInput={onlyLetters}
                  className="input-base"
                />
              </Input>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <Input label="Mobile">
                <input
                  name="mobile"
                  onInput={onlyNumbers}
                  maxLength={10}
                  className="input-base"
                />
              </Input>

              <Input label="Card Number">
                <input name="cardNumber" className="input-base" />
              </Input>
            </div>
          </Section>

          {/* ================= WORK DETAILS ================= */}
          <Section title="Work Information">
            <div className="grid grid-cols-3 gap-6">
              <Input label="Department">
                <input name="department" className="input-base" />
              </Input>

              <Input label="Gender">
                <select name="gender" className="input-base">
                  <option value="">Select</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </Input>

              <Input label="Joining Date">
                <input name="joiningDate" type="date" className="input-base" />
              </Input>
            </div>
          </Section>

          {/* ================= PAYROLL ================= */}
          <Section title="Payroll Information">
            <div className="grid grid-cols-3 gap-6">
              <Input label="Salary">
                <input name="salary" type="number" className="input-base" />
              </Input>

              <Input label="Days Present">
                <input
                  name="daysPresent"
                  type="number"
                  defaultValue={0}
                  className="input-base"
                />
              </Input>

              <Input label="Paid Leaves">
                <input
                  name="paidLeaves"
                  type="number"
                  defaultValue={0}
                  className="input-base"
                />
              </Input>
            </div>
          </Section>

          {/* ================= ACTION ================= */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              disabled={loading}
              className="px-8 py-2.5 bg-pink-600 text-white text-sm font-medium
                         rounded hover:bg-pink-700 disabled:opacity-60"
            >
              {loading ? "Creating..." : `Create ${role}`}
            </button>
          </div>
        </form>
      </div>

      {/* ================= SUCCESS MODAL ================= */}
      <SuccessModal
        open={showSuccess}
        message={`${role} added successfully`}
        onOk={handleOk}
      />
    </>
  );
}

/* ================= REUSABLE UI ================= */

function Section({ title, children }) {
  return (
    <div>
      <h4 className="text-[13px] font-semibold text-gray-800 tracking-wide uppercase">
        {title}
      </h4>
      <div className="border-b border-gray-200 mt-2 mb-6" />
      {children}
    </div>
  );
}

function Input({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}
