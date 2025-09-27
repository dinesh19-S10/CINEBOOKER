import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { createBooking } from '../services/api';
import { INDIAN_BANKS } from '../constants';

const PaymentNetBankingPage: React.FC = () => {
  const { bookingState, confirmBooking } = useAppContext();
  const navigate = useNavigate();
  const [selectedBank, setSelectedBank] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!selectedBank) {
      alert('Please select a bank.');
      return;
    }
    setIsLoading(true);

    const bookingDetails = {
      movie: bookingState.movie!,
      theater: bookingState.theater!,
      showtime: bookingState.showtime!,
      date: new Date(bookingState.date!),
      seats: bookingState.seats,
      totalPrice: bookingState.totalPrice,
    };
    
    try {
      const newBooking = await createBooking(bookingDetails);
      confirmBooking(newBooking);
      navigate('/booking/confirmation');
    } catch (error) {
      console.error("Booking failed:", error);
      alert("There was an error processing your booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Pay with Net Banking</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="bank-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Your Bank
          </label>
          <select
            id="bank-select"
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">-- Choose a bank --</option>
            {INDIAN_BANKS.map(bank => (
              <option key={bank} value={bank}>{bank}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handlePayment}
          disabled={isLoading || !selectedBank}
          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-primary-300 dark:disabled:bg-primary-800"
        >
          {isLoading ? 'Processing...' : `Pay ₹${bookingState.totalPrice}`}
        </button>
      </div>
      <div className="mt-6">
        <button onClick={() => navigate('/booking/payment')} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md text-sm">
          Back
        </button>
      </div>
    </div>
  );
};

export default PaymentNetBankingPage;
