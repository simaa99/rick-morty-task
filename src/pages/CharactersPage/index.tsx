/**
 * Characters page - main listing with search and pagination
 */

import { useState, useCallback } from 'react';
import { useCharacters } from '@/hooks/useCharacters';
import { useUIStore } from '@/store/uiStore';
import { CharacterCard } from '@/components/CharacterCard';
import { SearchInput } from '@/components/SearchInput';
import { Spinner } from '@/components/Spinner';
import { ErrorBlock } from '@/components/ErrorBlock';

export default function CharactersPage() {
  const { searchTerm, setSearchTerm } = useUIStore();
  const [page, setPage] = useState(1);

  // Fetch characters with filters
  const { data, isLoading, isError, error, refetch } = useCharacters({
    name: searchTerm || undefined,
    page,
  });

  // Handle search change - wrapped in useCallback to prevent infinite loops
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchTerm(value);
      setPage(1); // Reset to first page on search
    },
    [setSearchTerm]
  );

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-5xl font-black text-gray-900 dark:text-white animate-slide-down">
          Rick and Morty
        </h1>
        <p
          className="text-xl text-rick-green font-semibold animate-fade-in"
          style={{ animationDelay: '200ms' }}
        >
          Character Explorer
        </p>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Search and discover your favorite characters
        </p>
      </div>

      {/* Search bar */}
      <div className="flex justify-center animate-fade-in" style={{ animationDelay: '300ms' }}>
        <SearchInput
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by character name..."
          debounceMs={500}
        />
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="py-12">
          <Spinner size="lg" />
          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">Loading characters...</p>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <ErrorBlock
          message={error?.message || 'Failed to load characters. Please try again.'}
          onRetry={() => refetch()}
        />
      )}

      {/* Characters grid */}
      {data && data.results.length > 0 && (
        <>
          {/* Results info */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-bold text-rick-green">{data.info.count}</span> characters
            {searchTerm && (
              <span>
                {' '}
                matching "<span className="font-bold">{searchTerm}</span>"
              </span>
            )}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.results.map((character, index) => (
              <div key={character.id} style={{ animationDelay: `${index * 50}ms` }}>
                <CharacterCard character={character} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {data.info.pages > 1 && (
            <div className="flex justify-center items-center gap-4 pt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={!data.info.prev}
                className="px-6 py-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:border-rick-green hover:text-rick-green disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
              >
                Previous
              </button>

              <span className="px-4 py-2 bg-rick-green text-white font-bold rounded-lg animate-pulse-slow">
                {page} / {data.info.pages}
              </span>

              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={!data.info.next}
                className="px-6 py-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:border-rick-green hover:text-rick-green disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* No results */}
      {data && data.results.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No characters found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}
