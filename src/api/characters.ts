/**
 * API functions for Rick and Morty character and episode endpoints
 */

import apiClient from './client';
import type {
  Character,
  CharactersResponse,
  CharacterFilters,
  Episode,
} from '@/types/rickAndMorty';

/**
 * Fetch characters with optional filters
 * @param filters - Query parameters for filtering characters
 * @returns Promise with paginated characters response
 */
export const getCharacters = async (filters?: CharacterFilters): Promise<CharactersResponse> => {
  const { data } = await apiClient.get<CharactersResponse>('/character', {
    params: filters,
  });
  return data;
};

/**
 * Fetch a single character by ID
 * @param id - Character ID
 * @returns Promise with character data
 */
export const getCharacterById = async (id: number): Promise<Character> => {
  const { data } = await apiClient.get<Character>(`/character/${id}`);
  return data;
};

/**
 * Fetch multiple episodes by their IDs
 * This is more efficient than making multiple individual requests
 * @param episodeIds - Array of episode IDs
 * @returns Promise with array of episodes
 */
export const getMultipleEpisodes = async (episodeIds: number[]): Promise<Episode[]> => {
  // Handle empty array
  if (episodeIds.length === 0) {
    return [];
  }

  // Single episode
  if (episodeIds.length === 1) {
    const { data } = await apiClient.get<Episode>(`/episode/${episodeIds[0]}`);
    return [data];
  }

  // Multiple episodes - API supports comma-separated IDs
  const ids = episodeIds.join(',');
  const { data } = await apiClient.get<Episode[]>(`/episode/${ids}`);
  return data;
};

/**
 * Extract episode IDs from episode URLs
 * @param episodeUrls - Array of episode URLs
 * @returns Array of episode IDs
 */
export const extractEpisodeIds = (episodeUrls: string[]): number[] => {
  return episodeUrls.map((url) => {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 1], 10);
  });
};
