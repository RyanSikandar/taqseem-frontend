"use client";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext<{ isLoggedIn: boolean }>({ isLoggedIn: false });

const userLoggedIn = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/loginstatus`, {
        credentials: "include",
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Failed to check if user is logged in");
    }

    const data = await response.json();
    return data;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { data: isLoggedIn = false, } = useQuery({
        queryKey: ["authStatus"],
        queryFn: userLoggedIn,
    });

    return (
        <AuthContext.Provider value={{ isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
