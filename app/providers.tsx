'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FavouritesProvider } from '@/context/favourites-context';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <FavouritesProvider>
        {children}
        <Toaster />
      </FavouritesProvider>
    </QueryClientProvider>
  );
}