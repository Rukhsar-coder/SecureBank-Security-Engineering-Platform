import { Bell, Search, ShieldCheck, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TopNavbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const role = localStorage.getItem("role");
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };
  return (
    <header className="w-full border border-[#1F2937] bg-[#111827] rounded-3xl px-8 py-5 flex items-center justify-between">
      {/* LEFT */}

      <div className="flex items-center gap-4">
        {/* SEARCH */}

        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
          />

          <input
            type="text"
            placeholder="Search transactions, threats, audit logs..."
            className="w-105 bg-[#0B1120] border border-[#1F2937] rounded-2xl pl-11 pr-4 py-3 text-sm outline-none focus:border-[#3B82F6] transition"
          />
        </div>
      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-5">
        {/* SECURITY STATUS */}

        <div className="flex items-center gap-3 bg-[#10B981]/10 border border-[#10B981]/20 px-4 py-2 rounded-2xl">
          <ShieldCheck size={18} className="text-[#10B981]" />

          <span className="text-sm text-[#10B981] font-medium">
            Systems Secure
          </span>
        </div>

        {/* NOTIFICATIONS */}

        <button className="relative bg-[#0B1120] border border-[#1F2937] p-3 rounded-2xl hover:border-[#374151] transition">
          <Bell size={20} className="text-[#D1D5DB]" />

          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#EF4444]"></div>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 bg-[#0B1120] border border-[#1F2937] hover:border-[#374151] transition px-4 py-3 rounded-2xl"
        >
          <LogOut size={18} className="text-[#D1D5DB]" />

          <span className="text-sm text-[#D1D5DB]">Logout</span>
        </button>
        {/* USER PROFILE */}

        <div className="flex items-center gap-4 bg-[#0B1120] border border-[#1F2937] rounded-2xl px-4 py-2">
          <div className="w-11 h-11 rounded-full bg-[#3B82F6] flex items-center justify-center font-semibold">
            {username
              ?.split("_")
              .map((part) => part[0].toUpperCase())
              .join("")}
          </div>

          <div>
            <p className="text-sm font-medium">{username}</p>

            <p className="text-xs text-[#9CA3AF] mt-1">
              {role === "admin" ? "Security Administrator" : "Customer"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;
