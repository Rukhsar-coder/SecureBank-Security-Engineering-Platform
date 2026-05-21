import { Navigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");

  // No authentication token

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const decoded = jwtDecode(token);

  // Authorization enforcement

  if (decoded.role !== "admin") {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
}

export default AdminRoute;
