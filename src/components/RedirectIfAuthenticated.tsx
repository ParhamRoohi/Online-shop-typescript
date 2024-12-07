import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RedirectIfAuthenticated = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default RedirectIfAuthenticated;