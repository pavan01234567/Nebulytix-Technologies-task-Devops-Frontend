import { useState } from "react";

export default function AddClientForm() {
  const [form, setForm] = useState({
    companyName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          type="submit"
          className="px-6 py-2 bg-pink-600 text-white text-sm font-medium
                     rounded hover:bg-pink-700 transition"
        >
          Create Client
        </button>
      </div>
    </form>
  );
}
