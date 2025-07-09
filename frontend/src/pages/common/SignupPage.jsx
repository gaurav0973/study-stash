import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema } from "@/schemas/signupSchema"
import axios from "axios"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
// import { login } from "../store/slice/authSlice"

import { 
    Form, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { 
    GraduationCap, 
    User, 
    Mail, 
    Lock, 
    Eye, 
    EyeOff, 
    CheckCircle, 
    Loader2,
    ArrowRight 
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { baseURL } from "@/lib/helper"


export const SignupPage = () => {

    const navigate = useNavigate()
    // const dispatch = useDispatch()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formSuccess, setFormSuccess] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        label: "",
        color: "",
    })

    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            university: ""
        }
    })

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        setFormSuccess(false)
        try {
            const response = await axios.post(
                `${baseURL}/user/register`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true, 
                },
            )

            setFormSuccess(true)
            // dispatch(login({ userData: response.data.user }))
            form.reset()
            setPasswordStrength({ score: 0, label: "", color: "" })
            navigate("/login")

        } catch (error) {
            form.setError("root", {
                message: error?.response?.data?.message || error?.message || "Signup failed",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const calculatePasswordStrength = (password) => {
        let score = 0
        if (password.length >= 6) score++
        if (/[A-Z]/.test(password)) score++
        if (/[a-z]/.test(password)) score++
        if (/\d/.test(password)) score++
        if (/[^A-Za-z0-9]/.test(password)) score++

        const percent = (score / 5) * 100
        let label = "Very Weak"
        let color = "bg-red-500"
        if (score === 2) {
            label = "Weak"
            color = "bg-orange-400"
        } else if (score === 3) {
            label = "Moderate"
            color = "bg-yellow-400"
        } else if (score === 4) {
            label = "Strong"
            color = "bg-gradient-to-r from-[#61DAFB] to-[#03a3d7]"
        } else if (score === 5) {
            label = "Very Strong"
            color = "bg-gradient-to-r from-[#F596D3] to-[#D247BF]"
        }
        return { score: percent, label, color }
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-black">
            <div className="absolute inset-0">
                <div className="absolute top-60 left-1/3 transform -translate-x-1/2 -translate-y-1/12 w-[600px] h-[600px] bg-gradient-to-r from-[#F596D3] to-[#D247BF] opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute top-30 right-1/3 transform translate-x-1/2 -translate-y-1/6 w-[500px] h-[500px] bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] opacity-10 rounded-full blur-3xl"></div>
                {/* <div className="absolute bottom-0 left-1/3 transform -translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-[#61DAFB] to-[#03a3d7] opacity-15 rounded-full blur-3xl"></div> */}
            </div>

            <div className="relative z-10 container mx-auto min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#F596D3] to-[#D247BF] rounded-full mb-4 shadow-lg">
                            <GraduationCap className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-2">
                            <span className="bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
                                Join Our Campus
                            </span>
                        </h1>
                        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
                            <span className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                                Marketplace
                            </span>
                        </h2>
                        <p className="text-gray-300 text-sm">
                            Start buying and selling class notes, code, and study materials
                        </p>
                    </div>

                    {formSuccess && (
                        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg flex items-center gap-3 text-sm shadow-sm">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-green-700 font-medium">Account created successfully!</span>
                        </div>
                    )}

                    {form.formState.errors.root?.message && (
                        <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg text-sm text-red-700 font-medium shadow-sm">
                            {form.formState.errors.root.message}
                        </div>
                    )}

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-gray-700/50">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    name="username"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-200 font-semibold text-sm flex items-center gap-2">
                                                <User className="w-4 h-4" />
                                                Username
                                            </FormLabel>
                                            <div className="relative">
                                                <Input
                                                    placeholder="Your username"
                                                    className="pl-10 h-12 rounded-lg bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#61DAFB] focus:ring-[#61DAFB] transition-all duration-200"
                                                    {...field}
                                                />
                                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            </div>
                                            <FormMessage className="text-red-500 text-xs" />
                                        </FormItem>
                                    )}
                                />

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
                                                    className="pl-10 h-12 rounded-lg bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#61DAFB] focus:ring-[#61DAFB] transition-all duration-200"
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
                                                    placeholder="Create a password"
                                                    className="pl-10 pr-10 h-12 rounded-lg bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#61DAFB] focus:ring-[#61DAFB] transition-all duration-200"
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        const val = e.target.value
                                                        field.onChange(val)
                                                        setPasswordStrength(calculatePasswordStrength(val))
                                                    }}
                                                />
                                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                <button
                                                    type="button"
                                                    onClick={togglePasswordVisibility}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="w-4 h-4" />
                                                    ) : (
                                                        <Eye className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>

                                            {field.value && (
                                                <div className="mt-3">
                                                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-2 transition-all duration-300 ${passwordStrength.color}`}
                                                            style={{ width: `${passwordStrength.score}%` }}
                                                        ></div>
                                                    </div>
                                                    <p className="text-xs text-gray-300 mt-1 font-medium">
                                                        {passwordStrength.label}
                                                    </p>
                                                </div>
                                            )}
                                            <FormMessage className="text-red-500 text-xs" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name="university"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-200 font-semibold text-sm flex items-center gap-2">
                                                <GraduationCap className="w-4 h-4" />
                                                University
                                            </FormLabel>
                                            <div className="relative">
                                                <Input
                                                    placeholder="Your university name"
                                                    className="pl-10 h-12 rounded-lg bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#61DAFB] focus:ring-[#61DAFB] transition-all duration-200"
                                                    {...field}
                                                />
                                                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            </div>
                                            <FormMessage className="text-red-500 text-xs" />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-gradient-to-r from-[#F596D3] to-[#D247BF] hover:from-[#f582d0] hover:to-[#c93db5] text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            Create Account
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Form>

                        <div className="mt-6 text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <a 
                                href="/login" 
                                className="font-medium bg-gradient-to-r from-[#61DAFB] to-[#03a3d7] text-transparent bg-clip-text hover:from-[#5bc5e8] hover:to-[#0284c7] transition-all duration-200"
                            >
                                Sign In
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}