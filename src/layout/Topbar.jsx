import { useDispatch } from "react-redux";
import { Bell, Moon, Sun, User, LogOut, Settings } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { logoutUser } from "../store/authSlice";
import { useLocation } from "react-router-dom";

export default function Topbar({ dark, setDark }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const [openUser, setOpenUser] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    await dispatch(logoutUser());
    window.location.href = "/login";
  };

  /* ================= DASHBOARD TITLE (ONLY 5) ================= */
  const getDashboardTitle = () => {
    const base = location.pathname.split("/")[1];

    switch (base) {
      case "admin":
        return "Admin Dashboard";
      case "hr":
        return "HR Dashboard";
      case "manager":
        return "Manager Dashboard";
      case "employee":
        return "Employee Dashboard";
      case "client":
        return "Client Dashboard";
      default:
        return "Dashboard";
    }
  };

  const fakeNotifications = [
    "New employee registered",
    "Leave request pending approval",
    "Your report is due today",
  ];

  return (
    <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 sticky top-0 z-20">
      {/* ================= TITLE ================= */}
      <h2 className="text-lg font-semibold text-[#0D243C] dark:text-white">
        {getDashboardTitle()}
      </h2>

      {/* ================= RIGHT ACTIONS ================= */}
      <div className="flex items-center gap-5">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setOpenNoti(!openNoti);
              setOpenUser(false);
            }}
          >
            <Bell className="text-gray-600 dark:text-gray-200" size={22} />
          </button>

          <AnimatePresence>
            {openNoti && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-700 shadow-lg rounded-md p-3 z-50"
              >
                <h3 className="font-semibold mb-2 text-sm">Notifications</h3>
                {fakeNotifications.map((n, i) => (
                  <p
                    key={i}
                    className="text-sm py-1 border-b border-gray-200 dark:border-gray-600 last:border-b-0"
                  >
                    {n}
                  </p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setOpenUser(!openUser);
              setOpenNoti(false);
            }}
            className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
          >
            <User size={18} />
          </button>

          <AnimatePresence>
            {openUser && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded-md shadow-md z-50"
              >
                <button className="w-full px-3 py-2 flex gap-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                  <Settings size={16} /> Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-3 py-2 flex gap-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut size={16} /> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
