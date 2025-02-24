import { JSX } from "@emotion/react/jsx-runtime";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../../utils/components/Loader";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) return <Loader />;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
