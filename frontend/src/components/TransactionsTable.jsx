import { useEffect, useState } from "react";

import { getTransactions } from "../services/transactionService";

function TransactionsTable() {
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  // Fetch live transaction data on initial component mount
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const data = await getTransactions();

        setTransactions(data);
      } catch {
        setError("Failed to load transaction data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, []);
  //  Prevent empty-state rendering during async transaction loading
  if (loading) {
    return (
      <section className="mt-8 bg-[#111827] border border-[#1F2937] rounded-3xl p-8">
        <p className="text-[#9CA3AF]">Loading transaction monitoring...</p>
      </section>
    );
  }
  // Gracefully handle backend or network failures
  if (error) {
    return (
      <section className="mt-8 bg-[#111827] border border-[#1F2937] rounded-3xl p-8">
        <p className="text-[#EF4444]">{error}</p>
      </section>
    );
  }

  return (
    <section className="mt-8 bg-[#111827] border border-[#1F2937] rounded-3xl p-8">
      {/* HEADER */}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Transaction Monitoring
          </h2>

          <p className="text-[#9CA3AF] mt-2">
            Live enterprise financial activity.
          </p>
        </div>

        <button className="bg-[#3B82F6] hover:bg-[#2563EB] transition px-5 py-3 rounded-2xl text-sm font-medium">
          Export Report
        </button>
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#1F2937] text-left">
              <th className="pb-4 text-sm font-medium text-[#9CA3AF]">ID</th>

              <th className="pb-4 text-sm font-medium text-[#9CA3AF]">
                Sender
              </th>

              <th className="pb-4 text-sm font-medium text-[#9CA3AF]">
                Receiver
              </th>

              <th className="pb-4 text-sm font-medium text-[#9CA3AF]">
                Amount
              </th>

              <th className="pb-4 text-sm font-medium text-[#9CA3AF]">Note</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="hover:bg-[#0B1120] transition border-b border-[#1F2937]"
              >
                <td className="py-5 text-sm">{transaction.id}</td>

                <td className="py-5 text-sm">{transaction.sender}</td>

                <td className="py-5 text-sm">{transaction.receiver}</td>

                <td className="py-5 text-sm font-medium">
                  ${transaction.amount}
                </td>

                <td className="py-5 text-sm text-[#9CA3AF]">
                  {transaction.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TransactionsTable;
