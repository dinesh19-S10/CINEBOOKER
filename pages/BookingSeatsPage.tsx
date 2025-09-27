import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { getSeats } from '../services/api';
import type { Seat } from '../types';
import SeatMap from '../components/SeatMap';

const BookingSeatsPage: React.FC = () => {
  const { bookingState, setBookingDetails } = useAppContext();
  const navigate = useNavigate();
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
  }, [showtime]);

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
      <h2 className="text-2xl font-bold mb-4">Select Your Seats</h2>
      {isLoading ? (
        <p>Loading seat map...</p>
      ) : (
        <>
          <SeatMap initialSeats={seats} onSelectionChange={handleSeatSelectionChange} />
          <div className="mt-6 flex justify-between items-center">
            <button onClick={() => navigate('/booking/showtime')} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md">Back</button>
            <button onClick={handleProceedToPayment} className="px-6 py-2 bg-primary-600 text-white rounded-md font-semibold">Proceed to Payment</button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingSeatsPage;