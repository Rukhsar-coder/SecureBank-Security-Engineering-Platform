import { useEffect, useState } from "react";
import { getTransactions } from "../services/transactionService";

function RecentTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();

        setTransactions(data.slice(0, 5));
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <section className="mt-8 bg-[#111827] border border-[#1F2937] rounded-3xl p-8">
      <h2 className="text-2xl font-semibold tracking-tight">
        Recent Transactions
      </h2>

      <p className="text-[#9CA3AF] mt-2">Latest account activity.</p>

      <div className="mt-6 space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="grid grid-cols-[2fr_1fr_1fr] items-center border-b border-[#1F2937] pb-4"
          >
            <div>
              <p className="font-medium">
                {transaction.sender} → {transaction.receiver}
              </p>

              <p className="text-sm text-[#9CA3AF] mt-1">{transaction.note}</p>
            </div>

            <div className="text-right">
              <p className="font-medium">${transaction.amount}</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-[#9CA3AF]">
                {new Date(transaction.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentTransactions;
