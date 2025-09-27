import React, { useState, useEffect, useMemo } from 'react';
import type { Seat } from '../types';
import { ArmchairIcon } from './icons';

interface SeatMapProps {
  initialSeats: Seat[];
  onSelectionChange: (selectedSeats: Seat[]) => void;
}

const SeatMap: React.FC<SeatMapProps> = ({ initialSeats, onSelectionChange }) => {
  const [seats, setSeats] = useState<Seat[]>(initialSeats);
  const selectedSeats = useMemo(() => seats.filter(s => s.status === 'selected'), [seats]);

  useEffect(() => {
    onSelectionChange(selectedSeats);
  }, [selectedSeats, onSelectionChange]);

  const handleSeatClick = (seatId: string) => {
    setSeats(currentSeats =>
      currentSeats.map(seat => {
        if (seat.id === seatId) {
          if (seat.status === 'available') {
            return { ...seat, status: 'selected' };
          }
          if (seat.status === 'selected') {
            return { ...seat, status: 'available' };
          }
        }
        return seat;
      })
    );
  };

  const getSeatColor = (seat: Seat) => {
    if (seat.status === 'booked') {
        return 'text-red-400 dark:text-red-600 cursor-not-allowed';
    }
    if (seat.status === 'selected') {
        return 'text-primary-500 dark:text-primary-400';
    }
    // Available seats
    if (seat.category === 'Premium') {
        return 'text-amber-400 dark:text-amber-500 hover:text-amber-500 dark:hover:text-amber-400';
    }
    // Standard seats
    return 'text-gray-400 dark:text-gray-500 hover:text-green-500 dark:hover:text-green-400';
  };

  const seatsByRow = useMemo(() => {
    return seats.reduce((acc, seat) => {
      const row = seat.id.charAt(0);
      if (!acc[row]) {
        acc[row] = [];
      }
      acc[row].push(seat);
      return acc;
    }, {} as Record<string, Seat[]>);
  }, [seats]);


  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="w-full bg-gray-300 dark:bg-gray-600 text-center py-1 mb-6 rounded text-gray-800 dark:text-gray-200">
        SCREEN
      </div>
      <div className="space-y-2">
        {Object.entries(seatsByRow).map(([row, rowSeats]) => (
          <div key={row} className="flex items-center justify-center space-x-1.5">
            <span className="w-4 text-sm font-medium text-gray-600 dark:text-gray-400">{row}</span>
            {rowSeats.map(seat => (
              <button
                key={seat.id}
                onClick={() => handleSeatClick(seat.id)}
                disabled={seat.status === 'booked'}
                className={`transition-colors duration-200 ${getSeatColor(seat)}`}
                aria-label={`Seat ${seat.id}, Category ${seat.category}, Price ${seat.price}, Status ${seat.status}`}
              >
                <ArmchairIcon className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            ))}
             <span className="w-4 text-sm font-medium text-gray-600 dark:text-gray-400">{row}</span>
          </div>
        ))}
      </div>
       <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
            <div className="flex items-center space-x-2">
                <ArmchairIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Standard (₹250)</span>
            </div>
            <div className="flex items-center space-x-2">
                <ArmchairIcon className="w-5 h-5 text-amber-400 dark:text-amber-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Premium (₹400)</span>
            </div>
            <div className="flex items-center space-x-2">
                <ArmchairIcon className="w-5 h-5 text-primary-500 dark:text-primary-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Selected</span>
            </div>
            <div className="flex items-center space-x-2">
                <ArmchairIcon className="w-5 h-5 text-red-400 dark:text-red-600" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Booked</span>
            </div>
        </div>
    </div>
  );
};

export default SeatMap;