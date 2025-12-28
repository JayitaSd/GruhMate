// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export function PublicRoute({ children }) {
//   const { isAuthenticated } = useAuth();
//   return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
// }

// export function PrivateRoute({ children }) {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// }
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PrivateLayout from "../layouts/PrivateLayout"; // <-- import your layout here

export function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
}

export function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Wrap all private pages with PrivateLayout → Navbar included automatically
  return <PrivateLayout>{children}</PrivateLayout>;
}
