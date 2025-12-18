// src/layout/Topbar.jsx
import { useDispatch } from "react-redux";
import { Bell, Moon, Sun, User, LogOut, Settings } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { logoutUser } from "../store/authSlice";

export default function Topbar({ dark, setDark }) {
  const dispatch = useDispatch();

  const [openUser, setOpenUser] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    window.location.href = "/login";
  };

  const fakeNotifications = [
    "New employee registered",
    "Leave request pending approval",
    "Your report is due today",
  ];

  return (
    <div className="h-16 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-6 sticky top-0 z-20">
      <h2 className="text-xl font-semibold text-[#0D243C] dark:text-white">
        Dashboard
      </h2>

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
                className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-700 shadow-lg rounded-lg p-3 z-50"
              >
                <h3 className="font-semibold mb-2">Notifications</h3>
                {fakeNotifications.map((n, i) => (
                  <p key={i} className="text-sm py-1 border-b last:border-b-0">
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
          className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setOpenUser(!openUser);
              setOpenNoti(false);
            }}
            className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
          >
            <User size={20} />
          </button>

          <AnimatePresence>
            {openUser && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded shadow-md z-50"
              >
                <button className="w-full px-3 py-2 flex gap-2 hover:bg-gray-100">
                  <Settings size={16} /> Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-3 py-2 flex gap-2 text-red-600 hover:bg-red-50"
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
