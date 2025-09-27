import React from 'react';
import { Outlet, Navigate, useLocation, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

const BookingLayout: React.FC = () => {
  const { bookingState, selectedCity, confirmedBooking } = useAppContext();
  const location = useLocation();
  const { t } = useLanguage();
  const { movie } = bookingState;

  // On confirmation page, we rely on `confirmedBooking` instead of `bookingState.movie`
  if (location.pathname === '/booking/confirmation' && !confirmedBooking) {
     return <Navigate to="/main" />;
  }
  
  // For all other booking pages, a movie must be in the booking state.
  if (!movie && location.pathname !== '/booking/confirmation') {
    return <Navigate to="/main" />;
  }

  const summary = location.pathname === '/booking/confirmation' && confirmedBooking ? {
    movie: confirmedBooking.movie,
    theater: confirmedBooking.theater,
    date: confirmedBooking.date.toISOString().split('T')[0],
    showtime: confirmedBooking.showtime,
    seats: confirmedBooking.seats,
    totalPrice: confirmedBooking.totalPrice,
  } : bookingState;


  return (
    <div className="flex-grow bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md min-h-[400px]">
              <Outlet />
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md sticky top-24">
                <h3 className="text-xl font-bold mb-4">{t('bookingSummary')}</h3>
                {summary.movie ? (
                    <>
                        <img src={summary.movie.posterUrl} alt={summary.movie.title} className="rounded-md mb-4" />
                        <h4 className="font-bold text-lg">{summary.movie.title}</h4>
                        <p className="text-sm text-gray-500">{summary.movie.language} &bull; {summary.movie.genre}</p>
                    </>
                ) : (
                    <p className="text-sm text-gray-500">{t('noMovieSelected')}</p>
                )}
                <hr className="my-4 dark:border-gray-700" />
                <div className="space-y-2 text-sm">
                    <p><strong>{t('city')}:</strong> {selectedCity}</p>
                    <p><strong>{t('theater')}:</strong> {summary.theater?.name || t('notSelected')}</p>
                    <p><strong>{t('date')}:</strong> {summary.date ? new Date(summary.date).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' }) : t('notSelected')}</p>
                    <p><strong>{t('time')}:</strong> {summary.showtime?.time || t('notSelected')}</p>
                    <p><strong>{t('seats')}:</strong> {summary.seats.join(', ') || t('notSelected')}</p>
                </div>
                <hr className="my-4 dark:border-gray-700" />
                <div className="text-lg font-bold flex justify-between">
                    <span>{t('total')}</span>
                    <span>₹{summary.totalPrice}</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingLayout;