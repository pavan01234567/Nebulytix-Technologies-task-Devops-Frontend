import { useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../api/config";

export default function OTPVerification({ appId, email, onSuccess, onClose }) {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await axios.post(`${BACKEND_BASE_URL}/jobs/verify-otp`, {
        applicationId: appId,
        email,
        otp,
      });
      if (res.data?.status === "OK") {
        onSuccess();
      } else {
        setMessage({ type: "error", text: "Invalid or expired OTP." });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to verify OTP." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-3">Verify Your Email</h2>
        <p className="text-sm text-gray-600 mb-3">
          Enter the OTP sent to <strong>{email}</strong>. It expires in 5
          minutes.
        </p>
        {message && (
          <div
            className={`p-2 mb-2 rounded ${
              message.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}
        <form onSubmit={verifyOtp} className="space-y-3">
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
            className="w-full border p-2 rounded text-center tracking-widest"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
