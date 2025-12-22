import { Navigate } from "react-router";

import { auth } from "../firebase.config";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const {user, loading }= useAuth(auth);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
