import DashboardLayout from "../layouts/DashboardLayout";

function Profile() {
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  const accountNumber = localStorage.getItem("accountNumber");
  const balance = localStorage.getItem("balance");

  const accountStatus = "Active";

  const accountType = role === "admin" ? "Administrator" : "Customer";

  const securityLevel = role === "admin" ? "High Privilege" : "Standard";

  const memberSince = "2026";

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Profile</h1>

        <p className="text-[#9CA3AF] mt-3">View your account information.</p>
      </div>

      <section className="mt-8 bg-[#111827] border border-[#1F2937] rounded-3xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-[#9CA3AF]">Username</p>
            <p className="mt-2 text-lg font-medium">{username}</p>
          </div>

          <div>
            <p className="text-sm text-[#9CA3AF]">Role</p>
            <p className="mt-2 text-lg font-medium">{role}</p>
          </div>

          <div>
            <p className="text-sm text-[#9CA3AF]">Account Number</p>
            <p className="mt-2 text-lg font-medium">{accountNumber}</p>
          </div>

          <div>
            <p className="text-sm text-[#9CA3AF]">Balance</p>
            <p className="mt-2 text-lg font-medium text-green-400">
              ${balance}
            </p>
          </div>

          <div>
            <p className="text-sm text-[#9CA3AF]">Account Status</p>

            <p className="mt-2 text-lg font-medium text-green-400">
              {accountStatus}
            </p>
          </div>

          <div>
            <p className="text-sm text-[#9CA3AF]">Account Type</p>

            <p className="mt-2 text-lg font-medium">{accountType}</p>
          </div>

          <div>
            <p className="text-sm text-[#9CA3AF]">Security Level</p>

            <p className="mt-2 text-lg font-medium">{securityLevel}</p>
          </div>

          <div>
            <p className="text-sm text-[#9CA3AF]">Member Since</p>

            <p className="mt-2 text-lg font-medium">{memberSince}</p>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default Profile;
