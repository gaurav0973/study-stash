import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({children}) => {
    const { isAuthenticated } = useAuth();

    if(isAuthenticated){
        return <Navigate to="/feeds" replace />;
    }
    return children ;
}
