import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
    try{
        const response = await axiosInstance.post("/auth/signup", signupData);
        return response.data;
    }catch(error){
        console.error("Error during signup:", error);
    }
}

