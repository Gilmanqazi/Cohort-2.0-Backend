import { useSelector } from "react-redux";
import { Navigate,useLocation } from "react-router";

const ProtectedRoute = ({ children, Role = "buyer" }) => {

  const location = useLocation()

  const user  = useSelector((state) => state.auth.user);
  const loading  = useSelector((state) => state.auth.loading);
  

  if (loading) {
    return <h1>Loading...</h1>;
  } 

  if (!user) {
    return <Navigate to="/login" replace state = {{from:location}} />;
  }

  if ( user.role !== Role) {
    return <Navigate to="/" replace />;
  }


  return children;
};

export default ProtectedRoute;