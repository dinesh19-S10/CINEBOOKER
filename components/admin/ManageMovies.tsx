import React, { useState } from 'react';
import type { Movie } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useAppContext } from '../../context/AppContext';
import { PlusIcon, PencilIcon, TrashIcon } from '../icons';
import MovieFormModal from './MovieFormModal';

const ManageMovies: React.FC = () => {
    const { t } = useLanguage();
    const { movies, deleteMovie } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMovie, setEditingMovie] = useState<Movie | undefined>(undefined);

    const handleAddMovie = () => {
        setEditingMovie(undefined);
        setIsModalOpen(true);
    };

    const handleEditMovie = (movie: Movie) => {
        setEditingMovie(movie);
        setIsModalOpen(true);
    };

    const handleDeleteMovie = (movieId: string) => {
        if (window.confirm(t('areYouSureDelete'))) {
            deleteMovie(movieId);
        }
    };
    
    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingMovie(undefined);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('manageMovies')}</h2>
                <button
                    onClick={handleAddMovie}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                    <PlusIcon className="w-5 h-5" />
                    {t('addMovie')}
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('movieTitle')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('language')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('genre')}</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {movies.map(movie => (
                            <tr key={movie.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-16 w-12">
                                            <img className="h-16 w-12 rounded-sm object-cover" src={movie.posterUrl} alt="" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{movie.title}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{movie.language}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{movie.genre}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEditMovie(movie)} className="text-primary-600 hover:text-primary-900 mr-4">
                                        <PencilIcon className="w-5 h-5"/>
                                    </button>
                                    <button onClick={() => handleDeleteMovie(movie.id)} className="text-red-600 hover:text-red-900">
                                        <TrashIcon className="w-5 h-5"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <MovieFormModal 
                    movie={editingMovie} 
                    onClose={handleModalClose} 
                    onSuccess={handleModalClose} 
                />
            )}
        </div>
    );
};

export default ManageMovies;
