import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import type { Seat } from '../types';
import SeatMap from '../components/SeatMap';
import { useLanguage } from '../context/LanguageContext';

const BookingSeatsPage: React.FC = () => {
  const { bookingState, setBookingDetails, getSeats } = useAppContext();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { showtime } = bookingState;

  const [seats, setSeats] = useState<Seat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (showtime) {
      setIsLoading(true);
      getSeats(showtime.id)
        .then(setSeats)
        .finally(() => setIsLoading(false));
    }
  }, [showtime, getSeats]);

  if (!showtime) {
    return <Navigate to="/booking/showtime" />;
  }

  const handleSeatSelectionChange = useCallback((selectedSeats: Seat[]) => {
    const seatIds = selectedSeats.map(s => s.id);
    const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    setBookingDetails({ seats: seatIds, totalPrice: totalPrice });
  }, [setBookingDetails]);

  const handleProceedToPayment = () => {
    if (bookingState.seats.length > 0) {
      navigate('/booking/payment');
    } else {
      alert("Please select at least one seat.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t('selectYourSeats')}</h2>
      {isLoading ? (
        <p>{t('loadingSeatMap')}</p>
      ) : (
        <>
          <SeatMap initialSeats={seats} onSelectionChange={handleSeatSelectionChange} />
          <div className="mt-6 flex justify-between items-center">
            <button onClick={() => navigate('/booking/showtime')} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md">{t('back')}</button>
            <button onClick={handleProceedToPayment} className="px-6 py-2 bg-primary-600 text-white rounded-md font-semibold">{t('proceedToPay')}</button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingSeatsPage;
