import React, { useState, FormEvent } from 'react';
import type { Movie } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useAppContext } from '../../context/AppContext';
import { LANGUAGES } from '../../constants';
import { XMarkIcon } from '../icons';

interface MovieFormModalProps {
  movie?: Movie;
  onClose: () => void;
  onSuccess: () => void;
}

const MovieFormModal: React.FC<MovieFormModalProps> = ({ movie, onClose, onSuccess }) => {
  const { t } = useLanguage();
  const { addMovie, updateMovie } = useAppContext();
  const [formData, setFormData] = useState<Omit<Movie, 'id'>>({
    title: movie?.title || '',
    posterUrl: movie?.posterUrl || '',
    language: movie?.language || 'English',
    genre: movie?.genre || '',
    duration: movie?.duration || 120,
    rating: movie?.rating || 7.0,
    description: movie?.description || '',
    releaseDate: movie?.releaseDate || new Date().toISOString().split('T')[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (movie) {
        updateMovie({ ...formData, id: movie.id });
      } else {
        addMovie(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Failed to save movie', error);
      alert('Failed to save movie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-800">
          <h2 className="text-xl font-bold">{movie ? t('editMovie') : t('addMovie')}</h2>
          <button onClick={onClose}><XMarkIcon className="w-6 h-6"/></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
                <label className="block text-sm font-medium">{t('movieTitle')}</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600"/>
            </div>
             <div>
                <label className="block text-sm font-medium">{t('posterUrl')}</label>
                <input type="text" name="posterUrl" value={formData.posterUrl} onChange={handleChange} required className="mt-1 w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">{t('language')}</label>
                    <select name="language" value={formData.language} onChange={handleChange} className="mt-1 w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                        {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">{t('genre')}</label>
                    <input type="text" name="genre" value={formData.genre} onChange={handleChange} required className="mt-1 w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600"/>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium">{t('duration')}</label>
                    <input type="number" name="duration" value={formData.duration} onChange={handleChange} required className="mt-1 w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600"/>
                </div>
                <div>
                    <label className="block text-sm font-medium">{t('rating')}</label>
                    <input type="number" name="rating" step="0.1" min="0" max="10" value={formData.rating} onChange={handleChange} required className="mt-1 w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600"/>
                </div>
                <div>
                    <label className="block text-sm font-medium">{t('releaseDate')}</label>
                    <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleChange} required className="mt-1 w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600"/>
                </div>
            </div>
             <div>
                <label className="block text-sm font-medium">{t('description')}</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={4} required className="mt-1 w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600"></textarea>
            </div>
            <div className="pt-4 flex justify-end gap-4">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md">{t('cancel')}</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-primary-600 text-white rounded-md disabled:bg-primary-300">{isSubmitting ? t('processing') : t('saveChanges')}</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default MovieFormModal;
