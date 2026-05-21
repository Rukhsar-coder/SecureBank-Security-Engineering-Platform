import DashboardLayout from "../layouts/DashboardLayout";

import SecurityMetrics from "../components/SecurityMetrics";
import ThreatActivity from "../components/ThreatActivity";
import TransactionsTable from "../components/TransactionsTable";

function Dashboard() {
  return (
    <DashboardLayout>
      {/* PAGE HEADER */}

      <div>
        <h1 className="text-4xl font-semibold tracking-tight">
          Security Dashboard
        </h1>

        <p className="text-[#9CA3AF] mt-3">
          Monitor threats, transactions, and enterprise banking activity.
        </p>
      </div>

      {/* SECURITY METRICS */}

      <SecurityMetrics />

      {/* THREAT ACTIVITY */}

      <ThreatActivity />

      {/* TRANSACTIONS */}

      <TransactionsTable />
    </DashboardLayout>
  );
}

export default Dashboard;
