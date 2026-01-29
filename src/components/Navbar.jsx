// src/components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import logo from "../assets/images/nebulytixLogo.jpg";

export default function Navbar() {
  const navigate = useNavigate();
  const notifications = useSelector((s) => s.notification.list);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/career", label: "Career" },
    { to: "/contacts", label: "Contact" },
    { to: "/about", label: "About" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-md sticky top-0 z-40"
    >
      <div className="w-full px-6 lg:px-10 py-2 flex items-center justify-between">
        {/* LOGO */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 220 }}
        >
          <img
            src={logo}
            alt="Nebulytix Logo"
            className="h-12 w-auto object-contain"
          />
        </motion.div>

        {/* NAV LINKS */}
        <div className="hidden md:flex gap-8 text-[15px] font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative group ${
                  isActive ? "text-[#0D243C] font-semibold" : "text-gray-600"
                }`
              }
            >
              {link.label}
              <span
                className="absolute left-0 bottom-0 w-full h-[2px] bg-[#0D243C]
                scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              ></span>
            </NavLink>
          ))}
        </div>

        {/* SINGLE LOGIN BUTTON */}
        <button
          onClick={() => navigate("/login")}
          className="inline-flex items-center gap-2 px-4 py-1.5
            bg-[#0D243C] text-white text-sm font-medium rounded-md
            hover:bg-[#17395C] transition shadow-sm"
        >
          <LogIn size={16} />
          Login
        </button>

        <div className="relative">
          <Bell />
          {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
                {notifications.length}
              </span>
          )}
        </div>

      </div>
    </motion.nav>
  );
}
