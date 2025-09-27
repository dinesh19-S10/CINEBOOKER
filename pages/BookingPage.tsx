import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import type { Theater, Showtime, Seat, Booking } from '../types';
import { getTheatersByMovie, getShowtimes, getSeats, createBooking } from '../services/api';
import SeatMap from '../components/SeatMap';

type BookingStep = 'details' | 'seats' | 'payment' | 'confirmation';

const BookingPage: React.FC = () => {
  const { bookingState, setBookingDetails, clearBooking, user, selectedCity } = useAppContext();
  const navigate = useNavigate();
  const { movie } = bookingState;

  const [step, setStep] = useState<BookingStep>('details');
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [booking, setBooking] = useState<Booking | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movie) {
      navigate('/main');
    }
  }, [movie, navigate]);
  
  useEffect(() => {
    const fetchTheaters = async () => {
        if (movie) {
            setIsLoading(true);
            const theatersData = await getTheatersByMovie(movie.id, selectedCity);
            setTheaters(theatersData);
            setBookingDetails({ theater: undefined, date: undefined, showtime: undefined });
            setIsLoading(false);
        }
    };
    fetchTheaters();
  }, [movie, selectedCity, setBookingDetails]);

  const handleDateSelect = async (date: string) => {
    if(bookingState.theater) {
        setBookingDetails({ date });
        setIsLoading(true);
        setShowtimes([]);
        const showtimesData = await getShowtimes(movie!.id, bookingState.theater.id, date);
        setShowtimes(showtimesData);
        setIsLoading(false);
    }
  }

  const handleShowtimeSelect = async (showtime: Showtime) => {
    setBookingDetails({ showtime });
    setStep('seats');
    setIsLoading(true);
    const seatsData = await getSeats(showtime.id);
    setSeats(seatsData);
    setIsLoading(false);
  }

  const handleSeatSelectionChange = (selectedSeats: Seat[]) => {
    const seatIds = selectedSeats.map(s => s.id);
    const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    setBookingDetails({ seats: seatIds, totalPrice: totalPrice });
  }
  
  const handleProceedToPayment = () => {
    if (bookingState.seats.length > 0) {
      setStep('payment');
    } else {
      alert("Please select at least one seat.");
    }
  }

  const handleConfirmBooking = async () => {
    setIsLoading(true);
    const bookingDetails = {
      movie: movie!,
      theater: bookingState.theater!,
      showtime: bookingState.showtime!,
      date: new Date(bookingState.date!),
      seats: bookingState.seats,
      totalPrice: bookingState.totalPrice,
    };
    const newBooking = await createBooking(bookingDetails);
    setBooking(newBooking);
    setIsLoading(false);
    setStep('confirmation');
  };

  const handleNewBooking = () => {
    clearBooking();
    navigate(`/movie/${movie?.id}`);
  }

  if (!movie) {
    return null; // Or a loading/redirect component
  }
  
  const renderStep = () => {
    switch(step) {
      case 'details':
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Select Theater & Showtime for {selectedCity}</h2>
            {/* Theaters */}
            {theaters.length > 0 ? (
                <div className="space-y-4">
                {theaters.map(theater => (
                    <div key={theater.id} className="p-4 border rounded-md dark:border-gray-700">
                    <h3 className="font-semibold">{theater.name}</h3>
                    <p className="text-sm text-gray-500">{theater.address}</p>
                    <button onClick={() => setBookingDetails({ theater, date: undefined, showtime: undefined })} className={`mt-2 text-sm font-bold ${bookingState.theater?.id === theater.id ? 'text-primary-500' : 'text-gray-500'}`}>
                        {bookingState.theater?.id === theater.id ? 'Selected' : 'Select'}
                    </button>
                    
                    {bookingState.theater?.id === theater.id && (
                        <div className="mt-4">
                        <input type="date" min={new Date().toISOString().split('T')[0]} onChange={e => handleDateSelect(e.target.value)} className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {showtimes.map(st => (
                            <button key={st.id} onClick={() => handleShowtimeSelect(st)} className="px-3 py-1.5 border rounded-md text-sm hover:bg-primary-600 hover:text-white dark:border-gray-600">
                                {st.time}
                            </button>
                            ))}
                        </div>
                        </div>
                    )}
                    </div>
                ))}
                </div>
            ) : <p className="text-gray-600 dark:text-gray-400">No theaters found for the selected city. Please change your city from the header.</p>}
          </>
        );
      case 'seats':
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Select Your Seats</h2>
            <SeatMap initialSeats={seats} onSelectionChange={handleSeatSelectionChange} />
            <div className="mt-6 flex justify-between items-center">
              <button onClick={() => setStep('details')} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md">Back</button>
              <button onClick={handleProceedToPayment} className="px-6 py-2 bg-primary-600 text-white rounded-md font-semibold">Proceed to Payment</button>
            </div>
          </>
        );
      case 'payment':
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Confirm & Pay</h2>
            <div className="p-4 border rounded-md dark:border-gray-700 space-y-2">
              <p><strong>Seats:</strong> {bookingState.seats.join(', ')}</p>
              <p><strong>Total Tickets:</strong> {bookingState.seats.length}</p>
              <p className="text-xl font-bold"><strong>Total Price:</strong> ₹{bookingState.totalPrice}</p>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <button onClick={() => setStep('seats')} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md">Back</button>
              <button onClick={handleConfirmBooking} disabled={isLoading} className="px-6 py-2 bg-primary-600 text-white rounded-md font-semibold disabled:bg-primary-300">
                {isLoading ? 'Processing...' : `Pay ₹${bookingState.totalPrice}`}
              </button>
            </div>
          </>
        );
      case 'confirmation':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-500">Booking Confirmed!</h2>
            <p className="mb-2">Your Booking ID: <strong>{booking?.bookingId}</strong></p>
            <p>An email confirmation has been sent to {user?.email}.</p>
            <div className="flex justify-center my-6">
                <img src={booking?.qrCodeUrl} alt="Booking QR Code" />
            </div>
            <button onClick={handleNewBooking} className="px-6 py-2 bg-primary-600 text-white rounded-md font-semibold">Book Another Movie</button>
          </div>
        );
    }
  }

  return (
    <div className="flex-grow bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              {isLoading && step !== 'payment' ? <div className="flex justify-center items-center h-48"><p>Loading...</p></div> : renderStep()}
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
                <img src={movie.posterUrl} alt={movie.title} className="rounded-md mb-4" />
                <h4 className="font-bold text-lg">{movie.title}</h4>
                <p className="text-sm text-gray-500">{movie.language} &bull; {movie.genre}</p>
                <hr className="my-4 dark:border-gray-700" />
                <div className="space-y-2 text-sm">
                    <p><strong>City:</strong> {selectedCity}</p>
                    <p><strong>Theater:</strong> {bookingState.theater?.name || 'Not selected'}</p>
                    <p><strong>Date:</strong> {bookingState.date || 'Not selected'}</p>
                    <p><strong>Time:</strong> {bookingState.showtime?.time || 'Not selected'}</p>
                    <p><strong>Seats:</strong> {bookingState.seats.join(', ') || 'Not selected'}</p>
                </div>
                <hr className="my-4 dark:border-gray-700" />
                <div className="text-lg font-bold flex justify-between">
                    <span>Total</span>
                    <span>₹{bookingState.totalPrice}</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;