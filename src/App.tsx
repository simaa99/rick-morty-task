/**
 * Main App component
 * Sets up React Query provider and router
 */

import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from '@/router';
import { useUIStore } from '@/store/uiStore';
import { useEffect } from 'react';

// Configure React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Default options for all queries
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  const { isDarkMode, setTheme } = useUIStore();

  // Apply theme on mount
  useEffect(() => {
    setTheme(isDarkMode);
  }, [isDarkMode, setTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
