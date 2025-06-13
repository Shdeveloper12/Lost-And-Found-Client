import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, Loading } = useContext(AuthContext);
  const location = useLocation();

  if (Loading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={location?.pathname} replace />;
  }

  return children;
};

export default PrivateRoute;
