import { z } from "zod"

export const usernameValidation = z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")

export const signupSchema = z.object({
    username: usernameValidation,

    email: z
        .string()
        .email("Invalid email address")
        .min(1, "Email is required"),

    password: z
        .string()
        .min(4, "Password must be at least 4 characters long")
        .max(50, "Password must be at most 50 characters long"),

    university: z
        .string()
        .min(1, "University is required")
        .max(100, "University name must be at most 100 characters long")
        .regex(/[a-zA-Z]/, "University name must include at least one letter (no numbers only)"),
})