import DashboardLayout from "../layouts/DashboardLayout";

import SecurityMetrics from "../components/SecurityMetrics";
import ThreatActivity from "../components/ThreatActivity";
import AccountOverview from "../components/AccountOverview";
import RecentTransactions from "../components/RecentTransactions";

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
      <AccountOverview />

      {/* SECURITY METRICS */}

      <SecurityMetrics />

      {/* THREAT ACTIVITY */}

      <ThreatActivity />

      {/* TRANSACTIONS */}
      <RecentTransactions />
    </DashboardLayout>
  );
}

export default Dashboard;
