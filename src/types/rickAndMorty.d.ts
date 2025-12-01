/**
 * TypeScript type definitions for Rick and Morty API
 * Based on official API documentation: https://rickandmortyapi.com/documentation
 */

export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: Location;
  location: Location;
  image: string;
  episode: string[]; // URLs to episode resources
  url: string;
  created: string;
}

export interface Location {
  name: string;
  url: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string; // Episode code (e.g., "S01E01")
  characters: string[]; // URLs to character resources
  url: string;
  created: string;
}

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharactersResponse {
  info: Info;
  results: Character[];
}

export interface EpisodesResponse {
  info: Info;
  results: Episode[];
}

// Query parameters for fetching characters
export interface CharacterFilters {
  name?: string;
  status?: 'alive' | 'dead' | 'unknown';
  species?: string;
  type?: string;
  gender?: 'female' | 'male' | 'genderless' | 'unknown';
  page?: number;
}

// API error response structure
export interface ApiError {
  error: string;
}
