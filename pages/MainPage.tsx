import React, { useState } from 'react';
import type { Movie } from '../types';
import { useAppContext } from '../context/AppContext';
import MovieCard from '../components/MovieCard';
import { LANGUAGES } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const MainPage: React.FC = () => {
  const { movies, user, selectedCity } = useAppContext();
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const { t } = useLanguage();

  const filteredMovies = selectedLanguage === 'All'
    ? movies
    : movies.filter(movie => movie.language === selectedLanguage);

  return (
    <div className="flex-grow bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-1">
            {user ? `${t('home')}, ${user.username}!` : t('nowShowing')}
        </h1>
        <p className="text-gray-400 mb-6">{t('moviesIn')} {selectedCity}</p>
        
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-300 mb-3">{t('filterByLanguage')}</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedLanguage('All')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${selectedLanguage === 'All' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              {t('all')}
            </button>
            {LANGUAGES.map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${selectedLanguage === lang ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">{t('movies')}</h2>
        {movies.length === 0 ? (
          <p className="text-center text-gray-400">{t('loadingMovies')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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