/**
 * Character card component with hover effects and prefetching
 */

import { Link } from 'react-router-dom';
import type { Character } from '@/types/rickAndMorty';
import { usePrefetchCharacter } from '@/hooks/useCharacters';

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const prefetchCharacter = usePrefetchCharacter();

  const statusColors = {
    Alive: 'bg-green-400',
    Dead: 'bg-red-400',
    unknown: 'bg-gray-400',
  };

  return (
    <Link
      to={`/character/${character.id}`}
      onMouseEnter={() => prefetchCharacter(character.id)}
      className="group relative block animate-fade-in"
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1.5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
              <span className={`w-2 h-2 rounded-full ${statusColors[character.status]}`} />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                {character.status}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Name */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-rick-green transition-colors">
            {character.name}
          </h3>

          {/* Info Items */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400 font-medium">Species:</span>
              <span className="text-gray-900 dark:text-white font-semibold">
                {character.species}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400 font-medium">Gender:</span>
              <span className="text-gray-900 dark:text-white font-semibold">
                {character.gender}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400 font-medium">Episodes:</span>
              <span className="px-3 py-1 bg-rick-green text-white text-xs font-bold rounded-full">
                {character.episode.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
