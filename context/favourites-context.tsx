'use client'
import { Post } from "@/types";
import { createContext, useContext, useState } from "react";

interface FavouriteContextType {
    favourites: Post[];
    toggleFavourite: (post: Post) => void;
}

const FavouritesContext = createContext<FavouriteContextType | undefined>(undefined);

export function FavouritesProvider({ children }: { children: React.ReactNode }) {
    const [favourites, setFavourites] = useState<Post[]>([]);

    const toggleFavourite = (post: Post) => {
        setFavourites((prev) => {
            const isFavourite = prev.find((fav) => fav.id === post.id);
            if (isFavourite) {
                return prev.filter((fav) => fav.id !== post.id);
            }
            return [...prev, post];
        })
    }

    return <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>{children}</FavouritesContext.Provider>;
}

export function useFavourites() {
    const context = useContext(FavouritesContext)
    if (context === undefined) {
        throw new Error("useFavourites must be used within a NavigationProvider")
    }
    return context
}