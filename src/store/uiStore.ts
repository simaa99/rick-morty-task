/**
 * Zustand store for global UI state
 *
 * Why Zustand?
 * - Lightweight (~1KB) compared to Redux
 * - Simple API with no boilerplate
 * - TypeScript support out of the box
 * - No context providers needed
 * - Perfect for small to medium state needs
 *
 * This store manages:
 * - Search term (synced across navigation)
 * - Dark mode theme preference
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  // Search state
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;

  // Theme state
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

/**
 * Global UI state store with persistence
 * Theme preference is persisted to localStorage
 */
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Search state
      searchTerm: '',
      setSearchTerm: (term: string) => set({ searchTerm: term }),
      clearSearch: () => set({ searchTerm: '' }),

      // Theme state - defaults to system preference
      isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      toggleTheme: () =>
        set((state) => {
          const newMode = !state.isDarkMode;
          // Apply theme to document
          document.documentElement.classList.toggle('dark', newMode);
          return { isDarkMode: newMode };
        }),
      setTheme: (isDark: boolean) =>
        set(() => {
          // Apply theme to document
          document.documentElement.classList.toggle('dark', isDark);
          return { isDarkMode: isDark };
        }),
    }),
    {
      name: 'ui-storage', // localStorage key
      partialize: (state) => ({ isDarkMode: state.isDarkMode }), // Only persist theme
    }
  )
);
