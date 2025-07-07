import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema } from "@/schemas/SigninSchema"
import useLogin from "@/hooks/useLogin"

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Lock,
    Mail,
    Eye,
    EyeOff,
    Loader2,
    LogIn,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const LoginPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formSuccess, setFormSuccess] = useState(false)

    const form = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const { isPending, error, loginMutation } = useLogin()

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        setFormSuccess(false)
        try {
            await loginMutation(data)
            setFormSuccess(true)
            form.reset()
            setShowPassword(false)
        } catch (err) {
            form.setError("root", {
                message: err?.message || "Login failed",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-2">
                        <LogIn className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
                    <p className="text-gray-600 text-sm">Login to your account</p>
                </div>

                {formSuccess && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-700 font-medium">
                        Logged in successfully!
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
                                                placeholder="Enter your email"
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
                                                placeholder="Enter your password"
                                                className="pl-10 pr-10 h-10 rounded-md"
                                                {...field}
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
                                        Logging in...
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </form>
                    </Form>

                    <div className="mt-4 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a href="/signup" className="text-blue-600 hover:underline">
                            Sign Up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
