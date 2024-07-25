import { Navigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");
  return token ? <AdminLayout /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
