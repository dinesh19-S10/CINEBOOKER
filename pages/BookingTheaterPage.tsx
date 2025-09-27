import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import type { Theater } from '../types';
import { useLanguage } from '../context/LanguageContext';

const BookingTheaterPage: React.FC = () => {
  const { bookingState, setBookingDetails, selectedCity, getTheatersByMovie } = useAppContext();
  const navigate = useNavigate();
  const { movie, date } = bookingState;
  const { t } = useLanguage();

  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (movie && selectedCity && date) {
      setIsLoading(true);
      setTheaters([]); 
      getTheatersByMovie(movie.id, selectedCity)
        .then(setTheaters)
        .finally(() => setIsLoading(false));
    } else {
      setTheaters([]); 
    }
  }, [movie, selectedCity, date, getTheatersByMovie]);

  const handleDateSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setBookingDetails({ date: selectedDate, theater: undefined, showtime: undefined, seats: [], totalPrice: 0 });
  };
  
  const handleTheaterSelect = (theater: Theater) => {
    setBookingDetails({ theater });
    navigate('/booking/showtime');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t('selectDateAndTheater')}</h2>
      
      <div className="mb-6 space-y-2">
        <label htmlFor="booking-date" className="block text-md font-semibold text-gray-800 dark:text-gray-200">
          {t('step1')}
        </label>
        <input 
          id="booking-date"
          type="date" 
          value={date || ''}
          min={new Date().toISOString().split('T')[0]} 
          onChange={handleDateSelect} 
          className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 w-full sm:w-auto"
          aria-label="Select booking date"
        />
      </div>

      {date && (
        <div className="space-y-2">
          <h3 className="block text-md font-semibold text-gray-800 dark:text-gray-200">
            {t('step2', { city: selectedCity })}
          </h3>
          {isLoading ? (
            <p>{t('loadingTheaters')}</p>
          ) : theaters.length > 0 ? (
            <div className="space-y-4 pt-2">
              {theaters.map(theater => (
                <button 
                  key={theater.id}
                  onClick={() => handleTheaterSelect(theater)}
                  className="w-full text-left p-4 border rounded-md dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <h3 className="font-semibold">{theater.name}</h3>
                  <p className="text-sm text-gray-500">{theater.address}</p>
                </button>
              ))}
            </div>
          ) : (
            <p className="pt-2 text-gray-600 dark:text-gray-400">{t('noTheatersFound')}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingTheaterPage;
