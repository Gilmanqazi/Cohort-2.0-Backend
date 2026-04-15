import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children, allowedRole }) => {

  const { user , loading } = useSelector((state) => state.auth);

  console.log(user, "USER");
  console.log(loading, "LOADING");
  console.log(allowedRole)

  if (loading) {
    return <h1>Loading...</h1>;
  }

  //  not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  //  role mismatch
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }




  //  allowed
  return children;
};

export default ProtectedRoute;