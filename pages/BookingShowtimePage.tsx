import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import type { Showtime } from '../types';
import { useLanguage } from '../context/LanguageContext';

const BookingShowtimePage: React.FC = () => {
  const { bookingState, setBookingDetails, getShowtimes } = useAppContext();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { movie, date, theater } = bookingState;

  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (movie && theater && date) {
      setIsLoading(true);
      getShowtimes(movie.id, theater.id, date)
        .then(setShowtimes)
        .finally(() => setIsLoading(false));
    }
  }, [movie, theater, date, getShowtimes]);

  if (!theater) {
    return <Navigate to="/booking/theater" />;
  }

  const handleShowtimeSelect = (showtime: Showtime) => {
    setBookingDetails({ showtime, seats: [], totalPrice: 0 });
    navigate('/booking/seats');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t('selectShowtimeAt', { theater: theater.name })}</h2>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        {t('for')} {new Date(date!).toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      {isLoading ? (
        <p>{t('loadingShowtimes')}</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {showtimes.map(st => (
            <button 
              key={st.id} 
              onClick={() => handleShowtimeSelect(st)} 
              className="px-4 py-2 border rounded-md text-sm hover:bg-primary-600 hover:text-white dark:border-gray-600 transition-colors"
            >
              {st.time}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingShowtimePage;
