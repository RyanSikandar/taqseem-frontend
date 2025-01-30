'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FavouritesProvider } from '@/context/favourites-context';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/auth-context';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <FavouritesProvider>
        {children}
        <Toaster />
      </FavouritesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}