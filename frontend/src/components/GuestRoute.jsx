import { Navigate } from "react-router";
import useAuthUser from "@/hooks/useAuthUser";

import React from 'react'
import { Loader2 } from "lucide-react";

const GuestRoute = ({children}) => {
    const {isLoading , authUser} = useAuthUser() ;
    if(isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600"/>
                <p className="text-gray-600 font-medium">Loading...</p>
            </div>
        </div>
    )
    return !authUser ? (
                children
            ) : (
                <Navigate to="/home" replace />
            )
}

export default GuestRoute
