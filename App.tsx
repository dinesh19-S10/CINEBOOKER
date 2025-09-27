import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginSelectionPage from './pages/LoginSelectionPage';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import MovieDetailPage from './pages/MovieDetailPage';
import ProfilePage from './pages/ProfilePage';
import { useAppContext } from './context/AppContext';
import BookingLayout from './pages/BookingLayout';
import BookingTheaterPage from './pages/BookingTheaterPage';
import BookingShowtimePage from './pages/BookingShowtimePage';
import BookingSeatsPage from './pages/BookingSeatsPage';
import BookingPaymentPage from './pages/BookingPaymentPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import PaymentUpiPage from './pages/PaymentUpiPage';
import PaymentNetBankingPage from './pages/PaymentNetBankingPage';
import PaymentCardPage from './pages/PaymentCardPage';

const App: React.FC = () => {
  const { user } = useAppContext();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginSelectionPage />} />
          <Route path="/auth/:role" element={<AuthPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          
          <Route element={user ? <BookingLayout /> : <Navigate to="/login" />}>
            <Route path="/booking/theater" element={<BookingTheaterPage />} />
            <Route path="/booking/showtime" element={<BookingShowtimePage />} />
            <Route path="/booking/seats" element={<BookingSeatsPage />} />
            <Route path="/booking/payment" element={<BookingPaymentPage />} />
            <Route path="/booking/payment/upi" element={<PaymentUpiPage />} />
            <Route path="/booking/payment/netbanking" element={<PaymentNetBankingPage />} />
            <Route path="/booking/payment/card" element={<PaymentCardPage />} />
            <Route path="/booking/confirmation" element={<BookingConfirmationPage />} />
          </Route>
          
          <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
