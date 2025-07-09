import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/schemas/loginSchema"
import axios from "axios"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "@/store/slice/authSlice"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    LogIn,
    Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { baseURL } from "@/lib/helper"
import { useAuth } from "@/hooks/useAuth"

export const LoginPage = () => {

    const dispatch = useDispatch() ;
    const navigate = useNavigate() ;
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)


    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        try {
            const response = await axios.post(`${baseURL}/user/login`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
            // console.log("Login response:", response.data)
            form.reset()
            dispatch(login({
                userData: response.data
            }))
            console.log("User data:", response.data)
            navigate("/feeds")
        } catch (error) {
            form.setError("root", {
                message: error?.response?.data?.message || "Login failed",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-black">
            <div className="absolute inset-0">
                <div className="absolute top-60 left-1/3 transform -translate-x-1/2 -translate-y-1/12 w-[600px] h-[600px] bg-gradient-to-r from-[#F596D3] to-[#D247BF] opacity-10 rounded-full blur-3xl" />
                <div className="absolute top-30 right-1/3 transform translate-x-1/2 -translate-y-1/6 w-[500px] h-[500px] bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] opacity-10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 container mx-auto min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#61DAFB] to-[#03a3d7] rounded-full mb-4 shadow-lg">
                            <LogIn className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-2">
                            <span className="bg-gradient-to-r from-[#61DAFB] to-[#03a3d7] text-transparent bg-clip-text">
                                Welcome Back
                            </span>
                        </h1>
                        <p className="text-gray-300 text-sm">
                            Login to access campus marketplace
                        </p>
                    </div>

                    {form.formState.errors.root?.message && (
                        <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg text-sm text-red-700 font-medium shadow-sm">
                            {form.formState.errors.root.message}
                        </div>
                    )}

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-gray-700/50">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    name="email"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-200 font-semibold text-sm flex items-center gap-2">
                                                <Mail className="w-4 h-4" />
                                                Email
                                            </FormLabel>
                                            <div className="relative">
                                                <Input
                                                    type="email"
                                                    placeholder="Your email"
                                                    className="pl-10 h-12 rounded-lg bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#61DAFB] focus:ring-[#61DAFB]"
                                                    {...field}
                                                />
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            </div>
                                            <FormMessage className="text-red-500 text-xs" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name="password"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-200 font-semibold text-sm flex items-center gap-2">
                                                <Lock className="w-4 h-4" />
                                                Password
                                            </FormLabel>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Your password"
                                                    className="pl-10 pr-10 h-12 rounded-lg bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#61DAFB] focus:ring-[#61DAFB]"
                                                    {...field}
                                                />
                                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                <button
                                                    type="button"
                                                    onClick={togglePasswordVisibility}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                                >
                                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                            <FormMessage className="text-red-500 text-xs" />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-gradient-to-r from-[#61DAFB] to-[#03a3d7] hover:from-[#5bc5e8] hover:to-[#0284c7] text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
                                        </>
                                    ) : (
                                        <> Login <LogIn className="ml-2 h-4 w-4" /> </>
                                    )}
                                </Button>
                            </form>
                        </Form>

                        <div className="mt-6 text-center text-sm text-muted-foreground">
                            Don’t have an account? {" "}
                            <a
                                href="/signup"
                                className="font-medium bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text hover:from-[#f582d0] hover:to-[#c93db5] transition-all duration-200"
                            >
                                Sign Up
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
