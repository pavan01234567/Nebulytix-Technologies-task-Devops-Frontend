import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import EmployeeActionTabs from "../../components/admin/EmployeeActionTabs";
import { updateEmployee } from "../../store/userListsSlice"; // ✅ CORRECT IMPORT

export default function EmployeeDetails() {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const employee = useSelector((state) =>
    state.userLists.employees.find(
      (e) => String(e.id) === String(employeeId)
    )
  );

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);

  /* ================= SYNC FORM WITH REDUX ================= */
  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  if (!employee || !formData) {
    return <div className="p-6">Loading employee...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    try {
      await dispatch(
        updateEmployee({
          id: employee.id,
          data: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            mobile: formData.mobile,
            gender: formData.gender,
            department: formData.department,
          },
        })
      ).unwrap();

      setEditMode(false);
    } catch (err) {
      alert("Failed to update employee");
    }
  };

  const handleCancel = () => {
    setFormData(employee); // reset changes
    setEditMode(false);
  };

  return (
    <div className="space-y-6">
      <EmployeeActionTabs />

      <div className="p-6 space-y-6">
        <Header title="Employee Profile" onBack={() => navigate(-1)} />

        <Card>
          {editMode ? (
            <>
              <Input label="First Name">
                <input
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleChange}
                  className="input-base"
                />
              </Input>

              <Input label="Last Name">
                <input
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={handleChange}
                  className="input-base"
                />
              </Input>

              <Input label="Email">
                <input
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="input-base"
                />
              </Input>

              <Input label="Mobile">
                <input
                  name="mobile"
                  value={formData.mobile || ""}
                  onChange={handleChange}
                  className="input-base"
                />
              </Input>

              <Input label="Gender">
                <select
                  name="gender"
                  value={formData.gender || ""}
                  onChange={handleChange}
                  className="input-base"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </Input>

              <Input label="Department">
                <input
                  name="department"
                  value={formData.department || ""}
                  onChange={handleChange}
                  className="input-base"
                />
              </Input>
            </>
          ) : (
            <>
              <Detail label="Name">
                {employee.firstName} {employee.lastName}
              </Detail>
              <Detail label="Email">{employee.email}</Detail>
              <Detail label="Mobile">{employee.mobile}</Detail>
              <Detail label="Gender">{employee.gender}</Detail>
              <Detail label="Designation">{employee.designation}</Detail>
              <Detail label="Department">{employee.department}</Detail>
              <Detail label="Joining Date">{employee.joiningDate}</Detail>
            </>
          )}
        </Card>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="flex justify-end gap-3">
          {editMode ? (
            <>
              <button
                onClick={handleCancel}
                className="px-5 py-2 text-sm border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-5 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-5 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= UI HELPERS ================= */

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

function Input({ label, children }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      {children}
    </div>
  );
}
