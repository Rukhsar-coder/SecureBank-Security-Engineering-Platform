import DashboardLayout from "../layouts/DashboardLayout";
import TransactionsTable from "../components/TransactionsTable";
import TransferForm from "../components/TransferForm";

function Transactions() {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Transactions</h1>

        <p className="text-[#9CA3AF] mt-3">
          Review transaction history and manage account activity.
        </p>
      </div>
      <TransferForm />
      <TransactionsTable />
    </DashboardLayout>
  );
}

export default Transactions;
