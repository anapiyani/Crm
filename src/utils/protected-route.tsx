import React from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "./token";

// role based auth;
interface IProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children }) => {
  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
