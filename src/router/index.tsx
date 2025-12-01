/**
 * React Router configuration
 * Defines all application routes
 */

import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import CharactersPage from '@/pages/CharactersPage';
import CharacterDetailsPage from '@/pages/CharacterDetailsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <CharactersPage />
      </Layout>
    ),
  },
  {
    path: '/character/:id',
    element: (
      <Layout>
        <CharacterDetailsPage />
      </Layout>
    ),
  },
  {
    path: '*',
    element: (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            404 - Page Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The page you're looking for doesn't exist.
          </p>
          <a
            href="/"
            className="inline-block mt-6 px-6 py-3 bg-rick-green text-white rounded-lg 
                     hover:bg-rick-green/90 transition-colors"
          >
            Go Home
          </a>
        </div>
      </Layout>
    ),
  },
]);
