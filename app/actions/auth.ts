"use server"

import { loginSchema } from "@/schemas/auth.schema"

export async function loginAction(prevState: any, formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const result = loginSchema.safeParse({ email, password })
    if (!result.success) {
        return { success: false, error: "Invalid input" }
    }

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });

        if (!response.ok) {
            const error = await response.json();
            return { success: false, error: error.message || "An error occurred during login" }
        }

        const data = await response.json();
        console.log(data,"skfhw")     
        return { 
            success: true, 
            user: { 
                _id: data._id, 
                name: data.name, 
                email: data.email, 
                image: data.image 
            }, 
            error: null 
        }
    } catch (error) {
        return { success: false, error: "An unexpected error occurred" }
    }
}