import { ShieldAlert, UserX, DatabaseZap, Activity } from "lucide-react";

function ThreatActivity() {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
      {/* LEFT PANEL */}

      <div className="xl:col-span-2 bg-[#111827] border border-[#1F2937] rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Threat Activity
            </h2>

            <p className="text-[#9CA3AF] mt-2">
              Real-time security monitoring and detection events.
            </p>
          </div>

          <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 px-4 py-2 rounded-xl text-sm text-[#EF4444]">
            3 Active Threats
          </div>
        </div>

        <div className="space-y-5">
          {/* EVENT */}

          <div className="flex items-start gap-4 border border-[#1F2937] rounded-2xl p-5 bg-[#0B1120]">
            <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 p-3 rounded-2xl">
              <ShieldAlert className="text-[#EF4444]" size={22} />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">SQL Injection Attempt Blocked</h3>

                <span className="text-xs text-[#6B7280]">2 min ago</span>
              </div>

              <p className="text-sm text-[#9CA3AF] mt-2 leading-relaxed">
                Malicious payload detected targeting transaction query
                parameters.
              </p>
            </div>
          </div>

          {/* EVENT */}

          <div className="flex items-start gap-4 border border-[#1F2937] rounded-2xl p-5 bg-[#0B1120]">
            <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 p-3 rounded-2xl">
              <UserX className="text-[#F59E0B]" size={22} />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Multiple Failed Login Attempts</h3>

                <span className="text-xs text-[#6B7280]">14 min ago</span>
              </div>

              <p className="text-sm text-[#9CA3AF] mt-2 leading-relaxed">
                Rate limiting triggered after repeated authentication failures.
              </p>
            </div>
          </div>

          {/* EVENT */}

          <div className="flex items-start gap-4 border border-[#1F2937] rounded-2xl p-5 bg-[#0B1120]">
            <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 p-3 rounded-2xl">
              <DatabaseZap className="text-[#8B5CF6]" size={22} />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Audit Log Integrity Verified</h3>

                <span className="text-xs text-[#6B7280]">32 min ago</span>
              </div>

              <p className="text-sm text-[#9CA3AF] mt-2 leading-relaxed">
                Enterprise monitoring confirmed secure event retention policies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}

      <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-8">
        <div className="flex items-center gap-3">
          <Activity className="text-[#3B82F6]" size={22} />

          <h2 className="text-2xl font-semibold tracking-tight">
            System Status
          </h2>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#9CA3AF]">API Security</span>

              <span className="text-sm text-[#10B981]">Operational</span>
            </div>

            <div className="w-full h-2 rounded-full bg-[#1F2937] overflow-hidden">
              <div className="w-[92%] h-full bg-[#10B981] rounded-full"></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#9CA3AF]">Fraud Monitoring</span>

              <span className="text-sm text-[#10B981]">Active</span>
            </div>

            <div className="w-full h-2 rounded-full bg-[#1F2937] overflow-hidden">
              <div className="w-[88%] h-full bg-[#3B82F6] rounded-full"></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#9CA3AF]">Audit Pipeline</span>

              <span className="text-sm text-[#F59E0B]">Delayed</span>
            </div>

            <div className="w-full h-2 rounded-full bg-[#1F2937] overflow-hidden">
              <div className="w-[61%] h-full bg-[#F59E0B] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThreatActivity;
