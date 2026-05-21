import {
  LayoutDashboard,
  CreditCard,
  ShieldAlert,
  ClipboardList,
  Settings,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Sidebar() {
  const token = localStorage.getItem("token");

  let role = null;

  if (token) {
    const decoded = jwtDecode(token);

    role = decoded.role;
  }

  const location = useLocation();
  return (
    <aside className="w-72 min-h-screen bg-[#0F172A] border-r border-[#1F2937] flex flex-col justify-between">
      {/* TOP */}

      <div>
        {/* LOGO */}

        <div className="px-8 py-8 border-b border-[#1F2937]">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            SecureBank
          </h1>

          <p className="text-sm text-[#9CA3AF] mt-2">
            Enterprise Security Platform
          </p>
        </div>

        {/* NAVIGATION */}

        <nav className="mt-8 px-4 space-y-2">
          <Link
            to="/dashboard"
            className={`w-full flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition border ${
              location.pathname === "/dashboard"
                ? "bg-[#111827] border-[#374151]"
                : "border-transparent hover:bg-[#111827]"
            }`}
          >
            <LayoutDashboard
              size={20}
              className={
                location.pathname === "/dashboard"
                  ? "text-[#3B82F6]"
                  : "text-[#9CA3AF]"
              }
            />

            <span className="text-sm font-medium text-white">Dashboard</span>
          </Link>
          {role === "admin" && (
            <Link
              to="/security"
              className={`w-full flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition border ${
                location.pathname === "/security"
                  ? "bg-[#111827] border-[#374151]"
                  : "border-transparent hover:bg-[#111827]"
              }`}
            >
              <ShieldAlert
                size={20}
                className={
                  location.pathname === "/security"
                    ? "text-[#3B82F6]"
                    : "text-[#9CA3AF]"
                }
              />

              <span className="text-sm text-[#D1D5DB]">Security Center</span>
            </Link>
          )}
          <Link
            to="/transactions"
            className={`w-full flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition border ${
              location.pathname === "/transactions"
                ? "bg-[#111827] border-[#374151]"
                : "border-transparent hover:bg-[#111827]"
            }`}
          >
            <CreditCard
              size={20}
              className={
                location.pathname === "/transactions"
                  ? "text-[#3B82F6]"
                  : "text-[#9CA3AF]"
              }
            />

            <span className="text-sm text-[#D1D5DB]">Transactions</span>
          </Link>

          <Link
            to="/audit-logs"
            className={`w-full flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition border ${
              location.pathname === "/audit-logs"
                ? "bg-[#111827] border-[#374151]"
                : "border-transparent hover:bg-[#111827]"
            }`}
          >
            <ClipboardList
              size={20}
              className={
                location.pathname === "/audit-logs"
                  ? "text-[#3B82F6]"
                  : "text-[#9CA3AF]"
              }
            />

            <span className="text-sm text-[#D1D5DB]">Audit Logs</span>
          </Link>
        </nav>
      </div>

      {/* BOTTOM */}

      <div className="p-4 border-t border-[#1F2937]">
        <button className="w-full flex items-center gap-4 hover:bg-[#111827] transition rounded-2xl px-5 py-4 text-left">
          <Settings size={20} className="text-[#9CA3AF]" />

          <span className="text-sm text-[#D1D5DB]">Settings</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
