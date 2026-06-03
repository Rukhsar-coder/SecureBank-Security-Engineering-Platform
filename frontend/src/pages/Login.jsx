import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, LockKeyhole } from "lucide-react";

import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);

      localStorage.setItem("username", data.username);

      localStorage.setItem("role", data.role);

      localStorage.setItem("accountNumber", data.accountNumber);

      localStorage.setItem("balance", data.balance);

      navigate("/dashboard");
    } catch {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white flex">
      {/* LEFT PANEL */}

      <div className="hidden lg:flex w-1/2 border-r border-[#1F2937] flex-col justify-between p-16 bg-[#0F172A]">
        <div>
          <div className="flex items-center gap-3">
            <div className="bg-[#3B82F6]/10 p-3 rounded-2xl border border-[#3B82F6]/20">
              <ShieldCheck className="text-[#3B82F6]" size={32} />
            </div>

            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                SecureBank
              </h1>

              <p className="text-sm text-[#9CA3AF] mt-1">
                Enterprise Banking Security Platform
              </p>
            </div>
          </div>

          <div className="mt-20 max-w-xl">
            <h2 className="text-5xl leading-tight font-semibold tracking-tight">
              Secure financial infrastructure built with AppSec-first
              architecture.
            </h2>

            <p className="mt-8 text-lg text-[#9CA3AF] leading-relaxed">
              Monitor transactions, detect threats, audit security events, and
              manage enterprise banking operations through a unified
              cybersecurity-focused platform.
            </p>
          </div>
        </div>

        <div className="border border-[#1F2937] bg-[#111827] rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <LockKeyhole className="text-[#10B981]" size={20} />

            <p className="text-sm text-[#D1D5DB]">
              Protected by SecureBank Shield™ security monitoring
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-10 shadow-2xl">
            <div className="mb-10">
              <h2 className="text-3xl font-semibold tracking-tight">Sign in</h2>

              <p className="text-[#9CA3AF] mt-3">
                Access the SecureBank enterprise dashboard.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm text-[#D1D5DB] mb-2">
                  Username
                </label>

                <input
                  type="text"
                  name="username"
                  placeholder="john_doe"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl px-4 py-3 outline-none focus:border-[#3B82F6] transition"
                />
              </div>

              <div>
                <label className="block text-sm text-[#D1D5DB] mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#0B1120] border border-[#1F2937] rounded-xl px-4 py-3 outline-none focus:border-[#3B82F6] transition"
                />
              </div>

              {error && (
                <div className="border border-[#7F1D1D] bg-[#450A0A] text-[#FCA5A5] text-sm rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#3B82F6] hover:bg-[#2563EB] transition rounded-xl py-3 font-medium disabled:opacity-50"
              >
                {loading ? "Authenticating..." : "Sign In Securely"}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#1F2937]">
              <p className="text-xs text-[#6B7280] leading-relaxed">
                This system is monitored and protected. Unauthorized access
                attempts are logged and reviewed by SecureBank security systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
