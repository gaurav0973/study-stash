import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "@/store/slice/authSlice";

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { isAuthenticated, userData } = useSelector((state) => state.auth);
    
    // Option 1: Simple approach - pass userData directly
    // const loginUser = (userData) => {
    //     dispatch(login({ userData }));
    //     navigate("/feeds");
    // };

    const loginUser = (userData) => {
        const { _id, username, email, university, role } = userData;
        dispatch(login({
            userData: {
                _id,
                username,
                email,
                university,
                role
            }
        }));
        navigate("/feeds");
    };
    
    const logoutUser = () => {
        dispatch(logout());
        navigate("/login");
    };
    
    return {
        isAuthenticated,
        userData,
        loginUser,
        logoutUser
    };
};