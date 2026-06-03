import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import { getUsers } from "../services/adminService";

function UserManagement() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();

        setUsers(data);
      } catch {
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading users...</p>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <p className="text-red-400">{error}</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">
          User Management
        </h1>

        <p className="text-[#9CA3AF] mt-3">
          Manage customer accounts and balances.
        </p>
      </div>

      <section className="mt-8 bg-[#111827] border border-[#1F2937] rounded-3xl p-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1F2937]">
                <th className="text-left pb-4">Username</th>
                <th className="text-left pb-4">Role</th>
                <th className="text-left pb-4">Account Number</th>
                <th className="text-left pb-4">Balance</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.username} className="border-b border-[#1F2937]">
                  <td className="py-4">{user.username}</td>

                  <td className="py-4">{user.role}</td>

                  <td className="py-4">{user.account_number}</td>

                  <td className="py-4">${Number(user.balance).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default UserManagement;
