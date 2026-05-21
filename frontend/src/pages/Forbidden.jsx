import { ShieldAlert } from "lucide-react";

import { Link } from "react-router-dom";

function Forbidden() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center px-6">
      <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-12 max-w-lg w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 p-5 rounded-3xl">
            <ShieldAlert size={42} className="text-[#EF4444]" />
          </div>
        </div>

        <h1 className="text-4xl font-semibold tracking-tight">
          Access Forbidden
        </h1>

        <p className="text-[#9CA3AF] mt-5 leading-relaxed">
          Your account does not have sufficient permissions to access this
          operational security module.
        </p>

        <Link
          to="/dashboard"
          className="inline-flex mt-8 bg-[#3B82F6] hover:bg-[#2563EB] transition px-6 py-3 rounded-2xl text-sm font-medium"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Forbidden;
