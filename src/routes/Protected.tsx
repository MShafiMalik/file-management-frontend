import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { getAuthState } from "../redux/features/authSlice";

const Protected = () => {
  const { isAuthenticated } = useAppSelector(getAuthState);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default Protected;
