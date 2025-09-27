import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { User, Movie, Theater, Showtime, Booking } from '../types';

interface BookingState {
  movie?: Movie;
  date?: string; // YYYY-MM-DD
  theater?: Theater;
  showtime?: Showtime;
  seats: string[];
  totalPrice: number;
}

interface AppContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  bookingState: BookingState;
  setBookingMovie: (movie: Movie) => void;
  setBookingDetails: (details: Partial<BookingState>) => void;
  clearBooking: () => void;
  confirmedBooking: Booking | null;
  confirmBooking: (booking: Booking) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialBookingState: BookingState = {
  seats: [],
  totalPrice: 0,
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark' || storedTheme === 'light') return storedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });
  
  const [selectedState, setSelectedStateState] = useState<string>(() => localStorage.getItem('selectedState') || 'Telangana');
  const [selectedCity, setSelectedCityState] = useState<string>(() => localStorage.getItem('selectedCity') || 'Hyderabad');

  const [bookingState, setBookingState] = useState<BookingState>(initialBookingState);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const login = (userData: User) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };
  
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    clearBooking();
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const setSelectedState = (state: string) => {
    setSelectedStateState(state);
    localStorage.setItem('selectedState', state);
    // Reset city when state changes
    setSelectedCityState('');
    localStorage.removeItem('selectedCity');
  }

  const setSelectedCity = (city: string) => {
    setSelectedCityState(city);
    localStorage.setItem('selectedCity', city);
  };
  
  const setBookingMovie = useCallback((movie: Movie) => {
    setBookingState({ ...initialBookingState, movie });
  }, []);

  const setBookingDetails = useCallback((details: Partial<BookingState>) => {
    setBookingState(prevState => ({ ...prevState, ...details }));
  }, []);
  
  const clearBooking = useCallback(() => {
    setBookingState(initialBookingState);
    setConfirmedBooking(null);
  }, []);

  const confirmBooking = useCallback((booking: Booking) => {
    setConfirmedBooking(booking);
    setBookingState(initialBookingState); // Clear the active booking state
  }, []);

  const value = {
    user,
    login,
    logout,
    theme,
    toggleTheme,
    selectedState,
    setSelectedState,
    selectedCity,
    setSelectedCity,
    bookingState,
    setBookingMovie,
    setBookingDetails,
    clearBooking,
    confirmedBooking,
    confirmBooking,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
