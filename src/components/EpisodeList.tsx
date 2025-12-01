/**
 * Episode list component
 */

import type { Episode } from '@/types/rickAndMorty';

interface EpisodeListProps {
  episodes: Episode[];
}

export const EpisodeList: React.FC<EpisodeListProps> = ({ episodes }) => {
  if (episodes.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400 text-center py-8">No episodes found.</p>;
  }

  // Group episodes by season
  const episodesBySeason = episodes.reduce(
    (acc, episode) => {
      const season = episode.episode.match(/S(\d+)/)?.[1] || 'Unknown';
      if (!acc[season]) {
        acc[season] = [];
      }
      acc[season].push(episode);
      return acc;
    },
    {} as Record<string, Episode[]>
  );

  return (
    <div className="space-y-8">
      {Object.entries(episodesBySeason)
        .sort(([a], [b]) => parseInt(a) - parseInt(b))
        .map(([season, seasonEpisodes]) => (
          <div key={season}>
            {/* Season header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-rick-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">{season}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Season {season}</h3>
            </div>

            {/* Episodes list */}
            <div className="grid md:grid-cols-2 gap-3">
              {seasonEpisodes
                .sort((a, b) => {
                  const episodeA = parseInt(a.episode.match(/E(\d+)/)?.[1] || '0');
                  const episodeB = parseInt(b.episode.match(/E(\d+)/)?.[1] || '0');
                  return episodeA - episodeB;
                })
                .map((episode) => (
                  <div
                    key={episode.id}
                    className="flex items-center gap-3 p-4 
                               bg-gray-50 dark:bg-gray-900/50 rounded-lg
                               hover:bg-gray-100 dark:hover:bg-gray-900 
                               hover:shadow-md
                               transition-all"
                  >
                    <span className="text-sm font-mono text-rick-green font-bold px-3 py-1 bg-rick-green/10 rounded-md">
                      {episode.episode}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                        {episode.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{episode.air_date}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};
