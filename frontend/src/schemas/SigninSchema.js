import { z } from "zod";

export const signInSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .min(1, "Email is required"),
    password: z.string()
})