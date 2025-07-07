import { axiosInstance } from "./axios"

export const signup = async (signupData) => {
    try{
        const response = await axiosInstance.post("/user/register", signupData)
        return response.data
    }catch (error){
        const message = error?.response?.data?.message ||
        error?.response?.data?.error ||
        "User already exists"
        throw new Error(message) 
    }
}

export const getAuthUser = async () => {
    try{
        const response = await axiosInstance.get("/user/getProfile")
        return response.data
    }catch(error){
        const message = error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to fetch user profile"
        throw new Error(message)
    }
}

export const login = async (loginData) => {
    try{
        const response = await axiosInstance.post("/user/login", loginData)
        return response.data ;
    }catch(error){
        const message = error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Invalid email or password"
        throw new Error(message)
    }
}