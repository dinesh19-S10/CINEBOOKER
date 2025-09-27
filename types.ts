export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  language: string;
  genre: string;
  duration: number; // in minutes
  rating: number;
  description: string;
  releaseDate: string;
}

export interface Theater {
  id: string;
  name: string;
  city: string;
  address: string;
}

export interface Showtime {
  id: string;
  time: string; // e.g., "10:30 AM"
  availableSeats: number;
}

export type SeatStatus = 'available' | 'selected' | 'booked';
export type SeatCategory = 'Standard' | 'Premium';

export interface Seat {
  id: string; // e.g., "A1", "C5"
  status: SeatStatus;
  category: SeatCategory;
  price: number;
}

export interface Booking {
  bookingId: string;
  movie: Movie;
  theater: Theater;
  showtime: Showtime;
  date: Date;
  seats: string[];
  totalPrice: number;
  qrCodeUrl: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  avatarUrl?: string;
  phone?: string;
  dob?: string;
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  address?: string;
}