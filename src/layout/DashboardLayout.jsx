// src/layout/DashboardLayout.jsx
import { useState, useEffect } from "react";
import Topbar from "./Topbar";

export default function DashboardLayout({ sidebar, children }) {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className={`flex min-h-screen ${dark ? "dark:bg-gray-900" : ""}`}>
      {/* Sidebar */}
      {sidebar}

      {/* Main Area */}
      <div className="flex-1 ml-20 bg-gray-100 dark:bg-gray-900 dark:text-white">
        <Topbar dark={dark} setDark={setDark} />

        {/* IMPORTANT: no padding here */}
        <div>{children}</div>
      </div>
    </div>
  );
}
