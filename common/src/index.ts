import z from "zod"

export const signupSchema = z.object({
    email: z.string().email({
        message: "Invalid email format"
    }),
    password: z.string().min(8, {
        message: "Passwords should be 8 characters long"
    }),
    fullname: z.string()
})

export type SignUpSchema = z.infer<typeof signupSchema>

export const signinSchema = z.object({
    email: z.string().email({
        message: "Invalid email format"
    }),
    password : z.string().min(8, {
        message: "Password should be 8 characters long"
    })
})

export type SignInSchema = z.infer<typeof signinSchema>

export const blogpostSchema = z.object({
    title: z.string(),
    content: z.string()
})

export type BlogPostSchema = z.infer<typeof blogpostSchema>

export const blogupdateSchema = z.object({
    id: z.number(),
    title: z.string().optional(),
    content: z.string().optional()
})

export type BlogUpdateSchema = z.infer<typeof blogupdateSchema>