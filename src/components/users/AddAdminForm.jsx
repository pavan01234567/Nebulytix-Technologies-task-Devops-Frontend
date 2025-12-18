import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { addAdmin } from "../../store/userManagementSlice";
import SuccessModal from "../common/SuccessModal";

export default function AddAdminForm() {
  const dispatch = useDispatch();

  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: e.target.email.value,
      password: e.target.password.value,
      roles: ["ROLE_ADMIN"],
    };

    try {
      await dispatch(addAdmin(payload)).unwrap();
      setShowSuccess(true); // ✅ show success popup
    } catch (err) {
      alert("Failed to add admin");
    }
  };

  const handleOk = () => {
    setShowSuccess(false);     // close popup
    formRef.current.reset();  // clear form
  };

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        autoComplete="off"
        className="space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="input-base"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            className="input-base"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button className="px-6 py-2 bg-pink-600 text-white rounded">
            Create Admin
          </button>
        </div>
      </form>

      {/* SUCCESS POPUP */}
      <SuccessModal
        open={showSuccess}
        message="Admin added successfully"
        onOk={handleOk}
      />
    </>
  );
}
