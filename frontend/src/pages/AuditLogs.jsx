import DashboardLayout from "../layouts/DashboardLayout";

import { ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";

function AuditLogs() {
  return (
    <DashboardLayout>
      {/* PAGE HEADER */}

      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Audit Logs</h1>

        <p className="text-[#9CA3AF] mt-3">
          Track authentication events, API activity, and security operations.
        </p>
      </div>

      {/* AUDIT TABLE */}

      <section className="mt-10 bg-[#111827] border border-[#1F2937] rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Security Audit Trail
            </h2>

            <p className="text-[#9CA3AF] mt-2">
              Enterprise event monitoring and operational visibility.
            </p>
          </div>

          <button className="bg-[#3B82F6] hover:bg-[#2563EB] transition px-5 py-3 rounded-2xl text-sm font-medium">
            Export Logs
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#1F2937] text-left">
                <th className="pb-4 text-sm font-medium text-[#9CA3AF]">
                  Event
                </th>

                <th className="pb-4 text-sm font-medium text-[#9CA3AF]">
                  Severity
                </th>

                <th className="pb-4 text-sm font-medium text-[#9CA3AF]">
                  Source
                </th>

                <th className="pb-4 text-sm font-medium text-[#9CA3AF]">
                  Status
                </th>

                <th className="pb-4 text-sm font-medium text-[#9CA3AF]">
                  Timestamp
                </th>
              </tr>
            </thead>

            <tbody>
              {/* EVENT */}

              <tr className="border-b border-[#1F2937] hover:bg-[#0B1120] transition">
                <td className="py-5">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 p-3 rounded-2xl">
                      <ShieldAlert size={18} className="text-[#EF4444]" />
                    </div>

                    <div>
                      <p className="font-medium">SQL Injection Attempt</p>

                      <p className="text-sm text-[#9CA3AF] mt-1">
                        Malicious query payload blocked
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-5">
                  <span className="bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] text-xs px-3 py-1 rounded-full">
                    Critical
                  </span>
                </td>

                <td className="py-5 text-sm">API Gateway</td>

                <td className="py-5">
                  <span className="bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-xs px-3 py-1 rounded-full">
                    Blocked
                  </span>
                </td>

                <td className="py-5 text-sm text-[#9CA3AF]">2 min ago</td>
              </tr>

              {/* EVENT */}

              <tr className="border-b border-[#1F2937] hover:bg-[#0B1120] transition">
                <td className="py-5">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 p-3 rounded-2xl">
                      <AlertTriangle size={18} className="text-[#F59E0B]" />
                    </div>

                    <div>
                      <p className="font-medium">
                        Failed Authentication Attempts
                      </p>

                      <p className="text-sm text-[#9CA3AF] mt-1">
                        Rate limiting protection triggered
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-5">
                  <span className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] text-xs px-3 py-1 rounded-full">
                    Warning
                  </span>
                </td>

                <td className="py-5 text-sm">Auth Service</td>

                <td className="py-5">
                  <span className="bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-xs px-3 py-1 rounded-full">
                    Mitigated
                  </span>
                </td>

                <td className="py-5 text-sm text-[#9CA3AF]">14 min ago</td>
              </tr>

              {/* EVENT */}

              <tr className="hover:bg-[#0B1120] transition">
                <td className="py-5">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#10B981]/10 border border-[#10B981]/20 p-3 rounded-2xl">
                      <ShieldCheck size={18} className="text-[#10B981]" />
                    </div>

                    <div>
                      <p className="font-medium">
                        JWT Authorization Enforcement
                      </p>

                      <p className="text-sm text-[#9CA3AF] mt-1">
                        Protected route validation successful
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-5">
                  <span className="bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-xs px-3 py-1 rounded-full">
                    Informational
                  </span>
                </td>

                <td className="py-5 text-sm">Auth Middleware</td>

                <td className="py-5">
                  <span className="bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-xs px-3 py-1 rounded-full">
                    Verified
                  </span>
                </td>

                <td className="py-5 text-sm text-[#9CA3AF]">32 min ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default AuditLogs;
