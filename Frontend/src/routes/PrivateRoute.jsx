// src/routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthProvider";
import {useAuth} from "../context/AuthContext"
import PrivateLayout from "../layouts/PrivateLayout";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <PrivateLayout>{children}</PrivateLayout>;
}
