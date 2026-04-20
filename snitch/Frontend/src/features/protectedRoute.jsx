import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

const ProtectedRoute = ({ children, Role = "buyer" }) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#050505] flex flex-col justify-center items-center overflow-hidden">
        {/* Brand Logo Pulse */}
        <div className="relative mb-8">
          <h1 className="text-2xl font-extralight tracking-[0.6em] text-white animate-pulse uppercase">
            VOGUE<span className="font-bold">NR</span>
          </h1>
        </div>

        {/* Minimalist Loading Bar */}
        <div className="w-48 h-[1px] bg-zinc-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-white w-1/3 animate-loading-bar shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
        </div>

        {/* Optional Subtle Text */}
        <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-medium">
          Verifying Identity...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user.role !== Role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;