import React from 'react';
import type { Booking } from '../types';

interface BookingDetailModalProps {
  booking: Booking;
  onClose: () => void;
}

const BookingDetailModal: React.FC<BookingDetailModalProps> = ({ booking, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Booking Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">Booking ID: <span className="font-mono">{booking.bookingId}</span></p>
        </div>

        <div className="p-6 border-t border-b dark:border-gray-700 space-y-4">
          <div>
            <h3 className="font-bold text-lg">{booking.movie.title}</h3>
            <p className="text-sm text-gray-500">{booking.movie.language} &bull; {booking.movie.genre}</p>
          </div>
          <div className="text-sm space-y-2">
            <p><strong>Theater:</strong> {booking.theater.name}, {booking.theater.city}</p>
            <p><strong>Date & Time:</strong> {new Date(booking.date).toLocaleDateString()} at {booking.showtime.time}</p>
            <p><strong>Seats:</strong> <span className="font-mono">{booking.seats.join(', ')}</span> ({booking.seats.length} tickets)</p>
          </div>
          <div className="text-lg font-bold flex justify-between pt-2">
            <span>Total Paid</span>
            <span>₹{booking.totalPrice}</span>
          </div>
        </div>

        <div className="p-6 flex flex-col items-center">
            <h4 className="font-semibold mb-2">Your Ticket QR Code</h4>
            <img src={booking.qrCodeUrl} alt="Booking QR Code" className="w-40 h-40" />
            <p className="text-xs text-gray-500 mt-2">Show this at the cinema entrance.</p>
        </div>

      </div>
    </div>
  );
};

export default BookingDetailModal;
