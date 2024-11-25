import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context";

interface ProtectedRouteProps {
    redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    redirectPath = "/login",
}) => {
    const { isAuthenticated } = AuthContext.useAuth();

    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
