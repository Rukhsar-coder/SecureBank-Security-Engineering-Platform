import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";

import {
  getSecurityMetrics,
  getSecurityEvents,
} from "../services/securityService";

import { ShieldAlert, Bug, ShieldCheck, AlertTriangle } from "lucide-react";

function SecurityCenter() {
  const [metrics, setMetrics] = useState(null);

  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await getSecurityMetrics();

        setMetrics(data);

        const securityEvents = await getSecurityEvents();

        setEvents(securityEvents);
      } catch {
        setError("Failed to load security telemetry.");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-[#9CA3AF]">Loading security telemetry...</p>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <p className="text-[#EF4444]">{error}</p>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      {/* PAGE HEADER */}

      <div>
        <h1 className="text-4xl font-semibold tracking-tight">
          Security Center
        </h1>

        <p className="text-[#9CA3AF] mt-3">
          Monitor OWASP threats, suspicious activity, and security posture.
        </p>
      </div>

      {/* SECURITY ALERTS */}

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
        {/* CARD */}

        <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#9CA3AF]">SQL Injection Attempts</p>

              <h2 className="text-4xl font-semibold mt-4"></h2>
            </div>

            <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 p-3 rounded-2xl">
              <Bug className="text-[#EF4444]" size={28} />
            </div>
          </div>

          <p className="text-sm text-[#EF4444] mt-6">
            High severity threat activity detected
          </p>
        </div>

        {/* CARD */}

        <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#9CA3AF]">Failed Logins</p>
              <h2 className="text-4xl font-semibold mt-4">
                {metrics.failedLogins}
              </h2>
            </div>

            <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 p-3 rounded-2xl">
              <AlertTriangle className="text-[#F59E0B]" size={28} />
            </div>
          </div>

          <p className="text-sm text-[#F59E0B] mt-6">
            Rate limiting protections active
          </p>
        </div>

        {/* SECURITY EVENTS */}

        <section className="mt-12">
          <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Security Event Feed</h2>

                <p className="text-[#9CA3AF] mt-2">
                  Suspicious activity and operational telemetry.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {events.length === 0 ? (
                <p className="text-[#9CA3AF]">No security events detected.</p>
              ) : (
                events.map((event) => (
                  <div
                    key={event.id}
                    className="border border-[#1F2937] rounded-2xl p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{event.type}</p>

                        <p className="text-sm text-[#9CA3AF] mt-1">
                          {event.description}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-[#EF4444] uppercase">
                          {event.severity}
                        </p>

                        <p className="text-xs text-[#9CA3AF] mt-1">
                          {new Date(event.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-[#9CA3AF]">
                      User: {event.user} • Endpoint: {event.endpoint}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* CARD */}

        <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#9CA3AF]">Secure API Requests</p>

              <h2 className="text-4xl font-semibold mt-4">98%</h2>
            </div>

            <div className="bg-[#10B981]/10 border border-[#10B981]/20 p-3 rounded-2xl">
              <ShieldCheck className="text-[#10B981]" size={28} />
            </div>
          </div>

          <p className="text-sm text-[#10B981] mt-6">
            Authorization enforcement operational
          </p>
        </div>

        {/* CARD */}

        <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#9CA3AF]">Active Threats</p>

              <h2 className="text-4xl font-semibold mt-4">3</h2>
            </div>

            <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 p-3 rounded-2xl">
              <ShieldAlert className="text-[#8B5CF6]" size={28} />
            </div>
          </div>

          <p className="text-sm text-[#9CA3AF] mt-6">
            Monitoring active across all systems
          </p>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default SecurityCenter;
