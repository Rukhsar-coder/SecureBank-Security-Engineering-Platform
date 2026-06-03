import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";

function AccountOverview() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getCurrentUser();

        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadUser();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6 mt-8">
      <h2 className="text-2xl font-semibold">Account Overview</h2>

      <div className="grid md:grid-cols-4 gap-6 mt-6">
        <div>
          <p className="text-[#9CA3AF] text-sm">Username</p>

          <h3 className="text-xl mt-2">{user.username}</h3>
        </div>

        <div>
          <p className="text-[#9CA3AF] text-sm">Role</p>

          <h3 className="text-xl mt-2 capitalize">{user.role}</h3>
        </div>

        <div>
          <p className="text-[#9CA3AF] text-sm">Account Number</p>

          <h3 className="text-xl mt-2">{user.accountNumber}</h3>
        </div>

        <div>
          <p className="text-[#9CA3AF] text-sm">Balance</p>

          <h3 className="text-xl mt-2 text-green-400">${user.balance}</h3>
        </div>
      </div>
    </div>
  );
}

export default AccountOverview;
