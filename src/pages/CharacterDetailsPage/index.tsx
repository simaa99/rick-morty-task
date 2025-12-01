/**
 * Character details page - shows full character info and episodes
 */

import { useParams, useNavigate } from 'react-router-dom';
import { useCharacter } from '@/hooks/useCharacter';
import { useCharacterEpisodes } from '@/hooks/useCharacter';
import { Spinner } from '@/components/Spinner';
import { ErrorBlock } from '@/components/ErrorBlock';
import { EpisodeList } from '@/components/EpisodeList';

export default function CharacterDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const characterId = parseInt(id || '0', 10);

  // Fetch character data
  const {
    data: character,
    isLoading: isLoadingCharacter,
    isError: isCharacterError,
    error: characterError,
  } = useCharacter(characterId);

  // Fetch episodes
  const {
    data: episodes,
    isLoading: isLoadingEpisodes,
    isError: isEpisodesError,
  } = useCharacterEpisodes(character);

  // Invalid ID
  if (!characterId || characterId <= 0) {
    return <ErrorBlock message="Invalid character ID" onRetry={() => navigate('/')} />;
  }

  // Loading state
  if (isLoadingCharacter) {
    return (
      <div className="py-12">
        <Spinner size="lg" />
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Loading character details...
        </p>
      </div>
    );
  }

  // Error state
  if (isCharacterError || !character) {
    return (
      <ErrorBlock
        message={characterError?.message || 'Failed to load character details'}
        onRetry={() => navigate('/')}
      />
    );
  }

  // Status badge colors
  const statusColors = {
    Alive: 'bg-green-500',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-500',
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 
                   hover:text-rick-green transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span>Back</span>
      </button>

      {/* Character card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Image */}
          <div className="md:w-2/5 lg:w-1/3">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-full min-h-[500px] object-cover"
            />
          </div>

          {/* Info */}
          <div className="p-8 md:p-10 md:w-3/5 lg:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              {character.name}
            </h1>

            <div className="flex items-center gap-2 mb-8">
              <span className={`w-3 h-3 rounded-full ${statusColors[character.status]}`} />
              <span className="text-lg text-gray-600 dark:text-gray-400">
                {character.status} - {character.species}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-base">
              <div className="space-y-1">
                <span className="text-gray-500 dark:text-gray-400 text-sm">Gender</span>
                <p className="text-gray-900 dark:text-white font-semibold text-lg">
                  {character.gender}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-gray-500 dark:text-gray-400 text-sm">Episodes</span>
                <p className="text-rick-green font-bold text-lg">{character.episode.length}</p>
              </div>

              <div className="space-y-1">
                <span className="text-gray-500 dark:text-gray-400 text-sm">Origin</span>
                <p className="text-gray-900 dark:text-white font-semibold">
                  {character.origin.name}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-gray-500 dark:text-gray-400 text-sm">Last Location</span>
                <p className="text-gray-900 dark:text-white font-semibold">
                  {character.location.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Episodes</h2>

        {/* Loading episodes */}
        {isLoadingEpisodes && (
          <div className="py-8">
            <Spinner size="md" />
            <p className="text-center text-gray-600 dark:text-gray-400 mt-4">Loading episodes...</p>
          </div>
        )}

        {/* Error loading episodes */}
        {isEpisodesError && (
          <div className="text-center py-8">
            <p className="text-red-500 dark:text-red-400">Failed to load episodes</p>
          </div>
        )}

        {/* Episodes list */}
        {episodes && <EpisodeList episodes={episodes} />}
      </div>
    </div>
  );
}
