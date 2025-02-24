import { JSX } from "@emotion/react/jsx-runtime";
import { Navigate, useLocation } from "react-router-dom";

const RedirectToAdmin = ({ children }: { children: JSX.Element }) => {
  const token = sessionStorage.getItem("authToken");

  return !token ? children : <Navigate to="/admin" replace />;
};

export default RedirectToAdmin;
