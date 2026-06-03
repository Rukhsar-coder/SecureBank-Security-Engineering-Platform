import { useState } from "react";
import { transferFunds } from "../services/transactionService";

function TransferForm() {
  const [formData, setFormData] = useState({
    receiver: "",
    amount: "",
    note: "",
  });

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      setLoading(true);

      const response = await transferFunds(formData);

      setMessage(response.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);

      setFormData({
        receiver: "",
        amount: "",
        note: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-8 bg-[#111827] border border-[#1F2937] rounded-3xl p-8">
      <h2 className="text-2xl font-semibold tracking-tight">Transfer Funds</h2>

      <p className="text-[#9CA3AF] mt-2">
        Send funds securely between accounts.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <input
          type="text"
          name="receiver"
          placeholder="Receiver username"
          value={formData.receiver}
          onChange={handleChange}
          className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl px-4 py-3"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl px-4 py-3"
        />

        <input
          type="text"
          name="note"
          placeholder="Note"
          value={formData.note}
          onChange={handleChange}
          className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl px-4 py-3"
        />

        {message && (
          <div className="bg-green-900 border border-green-700 text-green-300 rounded-xl px-4 py-3">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-300 rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#3B82F6] hover:bg-[#2563EB] transition px-6 py-3 rounded-xl font-medium"
        >
          {loading ? "Processing..." : "Transfer Funds"}
        </button>
      </form>
    </section>
  );
}

export default TransferForm;
