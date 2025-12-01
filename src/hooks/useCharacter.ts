/**
 * Custom hook for fetching a single character and their episodes
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { getCharacterById, getMultipleEpisodes, extractEpisodeIds } from '@/api/characters';
import type { Character, Episode } from '@/types/rickAndMorty';
import { characterKeys } from './useCharacters';

/**
 * Query key factory for episodes
 */
export const episodeKeys = {
  all: ['episodes'] as const,
  lists: () => [...episodeKeys.all, 'list'] as const,
  list: (ids: number[]) => [...episodeKeys.lists(), ids] as const,
};

/**
 * Hook to fetch a single character by ID
 */
export const useCharacter = (id: number): UseQueryResult<Character, Error> => {
  return useQuery({
    queryKey: characterKeys.detail(id),
    queryFn: () => getCharacterById(id),
    staleTime: 10 * 60 * 1000, // 10 minutes - individual characters change less
    gcTime: 30 * 60 * 1000, // 30 minutes cache
    retry: 2,
    enabled: !!id && id > 0, // Only run if ID is valid
  });
};

/**
 * Hook to fetch multiple episodes
 * Automatically extracts episode IDs from character data
 */
export const useCharacterEpisodes = (
  character: Character | undefined
): UseQueryResult<Episode[], Error> => {
  const episodeIds = character ? extractEpisodeIds(character.episode) : [];

  return useQuery({
    queryKey: episodeKeys.list(episodeIds),
    queryFn: () => getMultipleEpisodes(episodeIds),
    staleTime: 30 * 60 * 1000, // 30 minutes - episodes are static
    gcTime: 60 * 60 * 1000, // 1 hour cache
    retry: 2,
    enabled: episodeIds.length > 0, // Only fetch if we have episode IDs
  });
};
