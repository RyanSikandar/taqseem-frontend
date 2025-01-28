'use client'
import { Donation, Post } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { openDB, type IDBPDatabase } from 'idb';

interface FavouriteContextType {
    favourites: Donation[];
    toggleFavourite: (post: Donation) => void;
    isLoading: boolean;
}

const FavouritesContext = createContext<FavouriteContextType | undefined>(undefined);

const DB_NAME = 'favourites';
const DB_VERSION = 1;
const STORE_NAME = 'posts';

const initDB = async () => {
    const db = await openDB(DB_NAME, DB_VERSION, {
        upgrade(database) {
            database.createObjectStore(STORE_NAME, { keyPath: '_id' });
        },
    });
    return db;
}

export function FavouritesProvider({ children }: { children: React.ReactNode }) {
    const [favourites, setFavourites] = useState<Donation[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [db, setDb] = useState<IDBPDatabase | null>(null);

    useEffect(() => {
        const initialize = async () => {
            try {
                setIsLoading(true);
                const database = await initDB();
                setDb(database);
                const data = await database.getAll(STORE_NAME);
                setFavourites(data);
                setIsLoading(false);
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setIsLoading(false);
            }
        };
        if (typeof window !== 'undefined') {
            initialize();
        }

        return () => {
            // Cleanup
            if (db) {
                db.close();
            }
        }

    }, [])

    const toggleFavourite = async (post: Donation) => {
        if (!db) {
            return;
        }

        try {
            const existingPost = await db.get(STORE_NAME, post._id);
            console.log('existingPost', existingPost);
            if (existingPost) {
                await db.delete(STORE_NAME, post._id);
                setFavourites(favourites.filter(fav => fav._id !== post._id));
            } else {
                await db.add(STORE_NAME, post);
                setFavourites([...favourites, post]);
            }
        }
        catch (error) {
            console.error(error);

        }
    };

    return <FavouritesContext.Provider value={{ favourites, toggleFavourite, isLoading }}>{children}</FavouritesContext.Provider>;
}

export function useFavourites() {
    const context = useContext(FavouritesContext)
    if (context === undefined) {
        throw new Error("useFavourites must be used within a NavigationProvider")
    }
    return context
}