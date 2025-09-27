import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const BookingDatePage: React.FC = () => {
  const { bookingState, setBookingDetails } = useAppContext();
  const navigate = useNavigate();

  const handleDateSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    if (date) {
      setBookingDetails({ date, theater: undefined, showtime: undefined, seats: [], totalPrice: 0 });
      navigate('/booking/theater');
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Select a Date</h2>
      <p className="mb-4 text-gray-600 dark:text-gray-400">Choose the date you want to watch {bookingState.movie?.title}.</p>
      <input 
        type="date" 
        value={bookingState.date || ''}
        min={new Date().toISOString().split('T')[0]} 
        onChange={handleDateSelect} 
        className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 w-full sm:w-auto"
        aria-label="Select booking date"
      />
    </div>
  );
};

export default BookingDatePage;