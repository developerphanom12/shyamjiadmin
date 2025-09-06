// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />; // replace so back button won't go to protected route
  }

  return <Outlet />;
};

export default ProtectedRoute;
