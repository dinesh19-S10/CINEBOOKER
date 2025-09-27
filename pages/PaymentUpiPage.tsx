import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { createBooking } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

const PaymentUpiPage: React.FC = () => {
  const { bookingState, confirmBooking } = useAppContext();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [upiId, setUpiId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!upiId.includes('@')) {
      alert('Please enter a valid UPI ID.');
      return;
    }
    setIsLoading(true);
    
    // Create final booking object
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
      <h2 className="text-2xl font-bold mb-4">{t('payWithUpi')}</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="upi-id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('upiId')}
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="upi-id"
              id="upi-id"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="yourname@bank"
            />
          </div>
        </div>
        <button
          onClick={handlePayment}
          disabled={isLoading || !upiId}
          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-primary-300 dark:disabled:bg-primary-800"
        >
          {isLoading ? t('processing') : `${t('proceedToPay')} ₹${bookingState.totalPrice}`}
        </button>
      </div>
      <div className="mt-6">
        <button onClick={() => navigate('/booking/payment')} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md text-sm">
          {t('back')}
        </button>
      </div>
    </div>
  );
};

export default PaymentUpiPage;