/**
 * Custom hook for fetching characters with React Query
 * Handles search, pagination, caching, and prefetching
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { getCharacters, getCharacterById } from '@/api/characters';
import type { CharactersResponse, CharacterFilters, Character } from '@/types/rickAndMorty';

/**
 * Query key factory for characters
 * Ensures consistent cache keys across the app
 */
export const characterKeys = {
  all: ['characters'] as const,
  lists: () => [...characterKeys.all, 'list'] as const,
  list: (filters: CharacterFilters) => [...characterKeys.lists(), filters] as const,
  details: () => [...characterKeys.all, 'detail'] as const,
  detail: (id: number) => [...characterKeys.details(), id] as const,
};

/**
 * Hook to fetch characters with filters
 * Features:
 * - Automatic caching
 * - Stale-while-revalidate pattern
 * - Error handling
 * - Loading states
 */
export const useCharacters = (
  filters?: CharacterFilters
): UseQueryResult<CharactersResponse, Error> => {
  return useQuery({
    queryKey: characterKeys.list(filters || {}),
    queryFn: () => getCharacters(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh
    gcTime: 10 * 60 * 1000, // 10 minutes - cache time (formerly cacheTime)
    retry: 2, // Retry failed requests twice
    refetchOnWindowFocus: false, // Don't refetch on window focus
  });
};

/**
 * Hook to prefetch character details on hover
 * Improves perceived performance
 */
export const usePrefetchCharacter = () => {
  const queryClient = useQueryClient();

  return (id: number) => {
    queryClient.prefetchQuery({
      queryKey: characterKeys.detail(id),
      queryFn: () => getCharacterById(id),
      staleTime: 5 * 60 * 1000,
    });
  };
};

/**
 * Get character from cache without fetching
 * Useful when we already have the data from the list
 */
export const useCharacterFromCache = (id: number): Character | undefined => {
  const queryClient = useQueryClient();

  // Try to find the character in any cached character list
  const cachedLists = queryClient.getQueriesData<CharactersResponse>({
    queryKey: characterKeys.lists(),
  });

  for (const [, data] of cachedLists) {
    if (data?.results) {
      const character = data.results.find((c) => c.id === id);
      if (character) return character;
    }
  }

  return undefined;
};
