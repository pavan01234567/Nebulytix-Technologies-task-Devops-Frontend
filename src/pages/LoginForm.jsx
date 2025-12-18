import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import { login as apiLogin } from "../api/auth";
import { setAuthData } from "../store/authSlice";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { accessToken, userDashboard } = useSelector((s) => s.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (accessToken && userDashboard) {
      redirectToDashboard(userDashboard);
    }
  }, []);

  function redirectToDashboard(dashboard) {
    const routes = {
      ADMIN_DASHBOARD: "/admin",
      HR_DASHBOARD: "/hr",
      EMPLOYEE_DASHBOARD: "/employee",
      MANAGER_DASHBOARD: "/manager",
      CLIENT_DASHBOARD: "/client",
    };
    navigate(routes[dashboard] || "/");
  }

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!form.email || !form.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const data = await apiLogin(form);

      dispatch(
        setAuthData({
          accessToken: data.accessToken,
          dashboard: data.dashboard,
          roles: data.roles,
        })
      );

      redirectToDashboard(data.dashboard);
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* LEFT IMAGE */}
      <div
        className="hidden lg:block lg:w-2/3 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        }}
      />

      {/* RIGHT LOGIN */}
      <div className="w-full lg:w-1/3 flex items-center justify-center px-8">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-6">
            Login to{" "}
            <span className="text-purple-600">Nebulytix Technologies</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleInput}
              className="w-full border rounded px-4 py-3 focus:outline-none"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleInput}
                className="w-full border rounded px-4 py-3 pr-10 focus:outline-none"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Error */}
            {error && <p className="text-red-600 text-sm">{error}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-xs text-gray-500 mt-6">
            By logging in, you agree to Nebulytix Technologies Terms of Use and
            Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
