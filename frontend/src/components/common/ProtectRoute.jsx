import { useAuth } from "@/hooks/useAuth";
import { Navigate , useLocation } from "react-router-dom"

export const ProtectRoute = ({children}) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if(!isAuthenticated){
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
