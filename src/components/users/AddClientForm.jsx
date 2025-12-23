// src/components/users/AddClientForm.jsx
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { addClient, clearStatus } from "../../store/userManagementSlice";
import SuccessModal from "../common/SuccessModal";
import { useNavigate } from "react-router-dom";

/* ================= INPUT RESTRICTIONS ================= */
const onlyNumbers = (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
};

export default function AddClientForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((s) => s.userManagement);

  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userDto: {
        email: e.target.email.value,
        password: e.target.password.value,
        roles: ["ROLE_CLIENT"],
      },
      clientReq: {
        companyName: e.target.companyName.value,
        contactPerson: e.target.contactPerson.value,
        contactEmail: e.target.contactEmail.value,
        phone: e.target.phone.value,
        alternatePhone: e.target.alternatePhone.value,
        industryType: e.target.industryType.value,
        website: e.target.website.value,
        gstNumber: e.target.gstNumber.value,
        address: e.target.address.value,
      },
    };

    try {
      await dispatch(addClient(payload)).unwrap();
      setShowSuccess(true);
    } catch {
      alert("Failed to add client");
    }
  };

  const handleOk = () => {
    setShowSuccess(false);
    dispatch(clearStatus());
    formRef.current.reset();
    emailRef.current.focus();
    navigate("/admin/user-lists?type=clients");
  };

  return (
    <>
      {/* ================= CONTAINER ================= */}
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
                  className="input-base"
                />
              </Input>

              <Input label="Password *">
                <input
                  name="password"
                  type="password"
                  minLength={8}
                  required
                  autoComplete="new-password"
                  className="input-base"
                />
              </Input>
            </div>
          </Section>

          {/* ================= CLIENT INFORMATION ================= */}
          <Section title="Client Information">
            <div className="grid grid-cols-2 gap-6">
              <Input label="Company Name *">
                <input
                  name="companyName"
                  required
                  className="input-base"
                />
              </Input>

              <Input label="Contact Person">
                <input
                  name="contactPerson"
                  className="input-base"
                />
              </Input>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <Input label="Contact Email">
                <input
                  name="contactEmail"
                  type="email"
                  className="input-base"
                />
              </Input>

              <Input label="Phone">
                <input
                  name="phone"
                  onInput={onlyNumbers}
                  maxLength={10}
                  className="input-base"
                />
              </Input>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <Input label="Alternate Phone">
                <input
                  name="alternatePhone"
                  onInput={onlyNumbers}
                  maxLength={10}
                  className="input-base"
                />
              </Input>

              <Input label="Industry Type">
                <input
                  name="industryType"
                  placeholder="IT, Finance, Construction..."
                  className="input-base"
                />
              </Input>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <Input label="Website">
                <input
                  name="website"
                  className="input-base"
                />
              </Input>

              <Input label="GST Number">
                <input
                  name="gstNumber"
                  className="input-base"
                />
              </Input>
            </div>

            <div className="mt-6">
              <Input label="Address">
                <textarea
                  name="address"
                  rows={3}
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
              {loading ? "Creating..." : "Create Client"}
            </button>
          </div>
        </form>
      </div>

      {/* ================= SUCCESS MODAL ================= */}
      <SuccessModal
        open={showSuccess}
        message="Client added successfully"
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
