import { ShieldCheck, ShieldAlert, CreditCard, Activity } from "lucide-react";

function SecurityMetrics() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
      {/* SECURITY SCORE */}

      <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[#9CA3AF]">Security Score</p>

            <h2 className="text-4xl font-semibold mt-4">92%</h2>
          </div>

          <div className="bg-[#10B981]/10 border border-[#10B981]/20 p-3 rounded-2xl">
            <ShieldCheck className="text-[#10B981]" size={28} />
          </div>
        </div>

        <p className="text-sm text-[#10B981] mt-6">+4% from last audit cycle</p>
      </div>

      {/* ACTIVE THREATS */}

      <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[#9CA3AF]">Active Threats</p>

            <h2 className="text-4xl font-semibold mt-4">3</h2>
          </div>

          <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 p-3 rounded-2xl">
            <ShieldAlert className="text-[#EF4444]" size={28} />
          </div>
        </div>

        <p className="text-sm text-[#EF4444] mt-6">
          SQL injection attempts detected
        </p>
      </div>

      {/* TRANSACTIONS */}

      <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[#9CA3AF]">Transactions</p>

            <h2 className="text-4xl font-semibold mt-4">1,284</h2>
          </div>

          <div className="bg-[#3B82F6]/10 border border-[#3B82F6]/20 p-3 rounded-2xl">
            <CreditCard className="text-[#3B82F6]" size={28} />
          </div>
        </div>

        <p className="text-sm text-[#9CA3AF] mt-6">
          Secure processing operational
        </p>
      </div>

      {/* AUDIT EVENTS */}

      <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[#9CA3AF]">Audit Events</p>

            <h2 className="text-4xl font-semibold mt-4">842</h2>
          </div>

          <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 p-3 rounded-2xl">
            <Activity className="text-[#8B5CF6]" size={28} />
          </div>
        </div>

        <p className="text-sm text-[#9CA3AF] mt-6">
          Monitoring active across all systems
        </p>
      </div>
    </section>
  );
}

export default SecurityMetrics;
