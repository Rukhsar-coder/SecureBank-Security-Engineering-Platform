import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import SecurityCenter from "./pages/SecurityCenter";
import AuditLogs from "./pages/AuditLogs";
import Forbidden from "./pages/Forbidden";
import Profile from "./pages/Profile";
import UserManagement from "./pages/UserManagement";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

// Multi-page protected enterprise routing

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTE */}

      <Route path="/" element={<Login />} />
      <Route path="/forbidden" element={<Forbidden />} />

      {/* DASHBOARD */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* PROFILE */}

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* USER MANAGEMENT */}

      <Route
        path="/users"
        element={
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        }
      />

      {/* TRANSACTIONS */}

      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        }
      />

      {/* SECURITY CENTER */}

      <Route
        path="/security"
        element={
          <AdminRoute>
            <SecurityCenter />
          </AdminRoute>

          // Controlled Vulnerability Simulation : Broken Access Control

          //We will intentionally:
          // ❌ remove frontend RBAC
          // ❌ weaken backend authorization

          // Then:🔥 customer gains admin functionality

          // That becomes: Privilege Escalation

          // VERY important OWASP category.
          // <ProtectedRoute>
          //   <SecurityCenter />
          // </ProtectedRoute>
        }
      />

      {/* AUDIT LOGS */}

      <Route
        path="/audit-logs"
        element={
          <ProtectedRoute>
            <AuditLogs />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
