import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Loader2,
    Eye,
    EyeOff,
    User,
    Mail,
    Lock,
    GraduationCap,
    CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import useSignup from "@/hooks/useSignup"
import { signupSchema } from "@/schemas/SignupSchema"

const SignupPage = () => {
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
            university: "",
        },
    })

    const { isPending, error, signupMutation } = useSignup()

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        setFormSuccess(false)
        try{
            await signupMutation(data)
            setFormSuccess(true)
            form.reset()
            setPasswordStrength({ score: 0, label: "", color: "" })
        }catch(err){
            form.setError("root", {
            message: err?.message || "Signup failed",
            })
        }finally{
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
            color = "bg-green-500"
        } else if (score === 5) {
            label = "Very Strong"
            color = "bg-green-600"
        }
        return { score: percent, label, color }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-2">
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
                    <p className="text-gray-600 text-sm">Join our academic community</p>
                </div>

                {formSuccess && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-green-700 font-medium">Account created successfully!</span>
                    </div>
                )}

                {form.formState.errors.root?.message && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700 font-medium">
                        {form.formState.errors.root.message}
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <FormField
                                name="username"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            Username
                                        </FormLabel>
                                        <div className="relative">
                                            <Input
                                                placeholder="Your username"
                                                className="pl-10 h-10 rounded-md"
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
                                        <FormLabel className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                                            <Mail className="w-4 h-4" />
                                            Email
                                        </FormLabel>
                                        <div className="relative">
                                            <Input
                                                type="email"
                                                placeholder="Your email"
                                                className="pl-10 h-10 rounded-md"
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
                                        <FormLabel className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                                            <Lock className="w-4 h-4" />
                                            Password
                                        </FormLabel>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Create a password"
                                                className="pl-10 pr-10 h-10 rounded-md"
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
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="w-4 h-4" />
                                                ) : (
                                                    <Eye className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>

                                        {field.value && (
                                            <div className="mt-2">
                                                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-1.5 transition-all duration-300 ${passwordStrength.color}`}
                                                        style={{ width: `${passwordStrength.score}%` }}
                                                    ></div>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
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
                                        <FormLabel className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                                            <GraduationCap className="w-4 h-4" />
                                            University
                                        </FormLabel>
                                        <div className="relative">
                                            <Input
                                                placeholder="Your university name"
                                                className="pl-10 h-10 rounded-md"
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
                                className="w-full h-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-md transition-all duration-200"
                                disabled={isSubmitting || isPending}
                            >
                                {isSubmitting || isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>
                        </form>
                    </Form>

                    <div className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <a href="/signin" className="text-blue-600 hover:underline">
                            Sign In
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage
