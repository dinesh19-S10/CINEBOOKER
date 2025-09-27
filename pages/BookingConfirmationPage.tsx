import React from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

const BookingConfirmationPage: React.FC = () => {
  const { confirmedBooking, user, clearBooking } = useAppContext();
  const navigate = useNavigate();
  const { t } = useLanguage();

  if (!confirmedBooking) {
    return <Navigate to="/main" />;
  }
  
  const handleNewBooking = () => {
    const currentMovieId = confirmedBooking.movie.id;
    clearBooking();
    navigate(`/movie/${currentMovieId}`);
  }

  return (
    <div className="text-center">
      <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 className="mt-4 text-2xl font-bold text-green-500">{t('bookingConfirmed')}</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{t('bookingIdIs')} <strong className="font-mono">{confirmedBooking.bookingId}</strong></p>
      <p className="text-sm text-gray-500">{t('emailConfirmation', { email: user?.email })}</p>
      
      <div className="flex justify-center my-6">
          <img src={confirmedBooking.qrCodeUrl} alt="Booking QR Code" />
      </div>

      <div className="space-x-4">
        <button onClick={handleNewBooking} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-md font-semibold">
          {t('bookAgain')}
        </button>
        <Link to="/main" className="px-6 py-2 bg-primary-600 text-white rounded-md font-semibold">
          {t('browseMoreMovies')}
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;