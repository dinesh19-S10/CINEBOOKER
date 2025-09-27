import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { getShowtimes } from '../services/api';
import type { Showtime } from '../types';

const BookingShowtimePage: React.FC = () => {
  const { bookingState, setBookingDetails } = useAppContext();
  const navigate = useNavigate();
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
  }, [movie, theater, date]);

  if (!theater) {
    return <Navigate to="/booking/theater" />;
  }

  const handleShowtimeSelect = (showtime: Showtime) => {
    setBookingDetails({ showtime, seats: [], totalPrice: 0 });
    navigate('/booking/seats');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Select Showtime at {theater.name}</h2>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        For {new Date(date!).toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      {isLoading ? (
        <p>Loading showtimes...</p>
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