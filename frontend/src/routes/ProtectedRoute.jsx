import { Navigate } from "react-router-dom";
// This component acts as a client-side access gate.
//
// Flow:
// Token exists?
//    ↓
// YES → allow dashboard
// NO  → redirect to login

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
