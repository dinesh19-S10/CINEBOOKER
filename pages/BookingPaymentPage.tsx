import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { UpiIcon, BankIcon, CreditCardIcon } from '../components/icons';
import { useLanguage } from '../context/LanguageContext';

const BookingPaymentPage: React.FC = () => {
  const { bookingState } = useAppContext();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { seats, totalPrice } = bookingState;

  if (seats.length === 0) {
    return <Navigate to="/booking/seats" />;
  }

  const paymentOptions = [
    { name: t('upi'), icon: UpiIcon, path: '/booking/payment/upi' },
    { name: t('netBanking'), icon: BankIcon, path: '/booking/payment/netbanking' },
    { name: t('creditDebitCard'), icon: CreditCardIcon, path: '/booking/payment/card' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{t('choosePaymentMethod')}</h2>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        {t('youArePaying')} <span className="font-bold text-gray-800 dark:text-white">₹{totalPrice}</span> {t('forTickets', { count: seats.length })}
      </p>

      <div className="space-y-4">
        {paymentOptions.map((option) => (
          <button
            key={option.name}
            onClick={() => navigate(option.path)}
            className="w-full flex items-center p-4 border rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600 transition-colors"
          >
            <option.icon className="w-8 h-8 mr-4 text-primary-500" />
            <span className="font-semibold text-lg">{option.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-8">
        <button onClick={() => navigate('/booking/seats')} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md text-sm">
          {t('backToSeatSelection')}
        </button>
      </div>
    </div>
  );
};

export default BookingPaymentPage;