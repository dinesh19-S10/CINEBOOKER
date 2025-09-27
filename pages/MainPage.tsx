
import React, { useState, useEffect } from 'react';
import type { Movie } from '../types';
import { getMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import { LANGUAGES } from '../constants';

const MainPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const moviesData = await getMovies();
      setMovies(moviesData);
      setLoading(false);
    };
    fetchMovies();
  }, []);

  const filteredMovies = selectedLanguage === 'All'
    ? movies
    : movies.filter(movie => movie.language === selectedLanguage);

  return (
    <div className="flex-grow bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Now Showing</h1>
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedLanguage('All')}
              className={`px-4 py-2 text-sm font-medium rounded-full ${selectedLanguage === 'All' ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              All
            </button>
            {LANGUAGES.map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-2 text-sm font-medium rounded-full ${selectedLanguage === lang ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">Loading movies...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
