import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { User, Movie, Theater, Showtime, Booking, Seat } from '../types';
import { initialMockMovies, initialTheaterChains, initialMockPricing, allPossibleShowtimes } from '../services/api';

interface BookingState {
  movie?: Movie;
  date?: string; // YYYY-MM-DD
  theater?: Theater;
  showtime?: Showtime;
  seats: string[];
  totalPrice: number;
}

interface AppContextType {
  // User Auth
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
  
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Location
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  
  // Booking Flow
  bookingState: BookingState;
  setBookingMovie: (movie: Movie) => void;
  setBookingDetails: (details: Partial<BookingState>) => void;
  clearBooking: () => void;
  confirmedBooking: Booking | null;
  confirmBooking: (booking: Booking) => void;

  // Data & Data Getters
  movies: Movie[];
  getMovieById: (id: string) => Movie | undefined;
  getTheatersByMovie: (movieId: string, city: string) => Promise<Theater[]>;
  getShowtimes: (movieId: string, theaterId: string, date: string) => Promise<Showtime[]>;
  getSeats: (showtimeId: string) => Promise<Seat[]>;
  theaterChains: string[];
  pricing: { standard: number, premium: number };

  // Admin CRUD Operations
  addMovie: (movie: Omit<Movie, 'id'>) => void;
  updateMovie: (updatedMovie: Movie) => void;
  deleteMovie: (movieId: string) => void;
  addTheaterChain: (chainName: string) => void;
  deleteTheaterChain: (chainName: string) => void;
  updatePricing: (newPricing: { standard: number, premium: number }) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialBookingState: BookingState = {
  seats: [],
  totalPrice: 0,
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // --- STATE ---
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') return storedTheme;
    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  
  const [selectedState, setSelectedStateState] = useState<string>(() => localStorage.getItem('selectedState') || 'Telangana');
  const [selectedCity, setSelectedCityState] = useState<string>(() => localStorage.getItem('selectedCity') || 'Hyderabad');

  const [bookingState, setBookingState] = useState<BookingState>(initialBookingState);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // --- GLOBAL DATA STATE ---
  const [movies, setMovies] = useState<Movie[]>(initialMockMovies);
  const [theaterChains, setTheaterChains] = useState<string[]>(initialTheaterChains);
  const [pricing, setPricing] = useState(initialMockPricing);

  // --- EFFECTS ---
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // --- AUTH METHODS ---
  const login = (userData: User) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  const updateUser = (updatedData: Partial<User>) => {
    setUser(prevUser => {
        if (!prevUser) return null;
        const newUser = { ...prevUser, ...updatedData };
        sessionStorage.setItem('user', JSON.stringify(newUser));
        return newUser;
    });
  };
  
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    clearBooking();
  };

  // --- THEME & LOCATION ---
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const setSelectedState = (state: string) => {
    setSelectedStateState(state);
    localStorage.setItem('selectedState', state);
    setSelectedCityState('');
    localStorage.removeItem('selectedCity');
  }

  const setSelectedCity = (city: string) => {
    setSelectedCityState(city);
    localStorage.setItem('selectedCity', city);
  };
  
  // --- BOOKING FLOW METHODS ---
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
    setBookingState(initialBookingState);
  }, []);

  // --- DATA GETTERS (moved from API) ---
  const getMovieById = useCallback((id: string) => movies.find(m => m.id === id), [movies]);

  const getTheatersByMovie = useCallback(async (_movieId: string, city: string): Promise<Theater[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    if (!city) return [];

    const cityTheaters: Theater[] = [];
    const cityHash = city.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const numberOfTheaters = 2 + (cityHash % 4);

    for (let i = 0; i < numberOfTheaters; i++) {
        const chainIndex = (cityHash + i) % theaterChains.length;
        const theaterName = theaterChains[chainIndex];
        
        cityTheaters.push({
            id: `t-${city.toLowerCase().replace(/\s/g, '')}-${i + 1}`,
            name: `${theaterName}`,
            city: city,
            address: `${i+1} Main Road, ${city}`
        });
    }
    return cityTheaters;
  }, [theaterChains]);

  const getShowtimes = useCallback(async (_movieId: string, theaterId: string, _date: string): Promise<Showtime[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (!theaterId) return [];
    
    // Logic to generate deterministic showtimes based on theaterId
    const theaterShowtimes: Showtime[] = [];
    const theaterHash = theaterId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const numberOfShowtimes = 3 + (theaterHash % 4);

    const shuffledTimes = [...allPossibleShowtimes]
      .sort((a, b) => (theaterHash % (a.charCodeAt(1) - b.charCodeAt(1))) || a.localeCompare(b));

    for (let i = 0; i < numberOfShowtimes; i++) {
        const time = shuffledTimes[i % allPossibleShowtimes.length];
        theaterShowtimes.push({
            id: `st-${theaterId}-${time.replace(/\s/g, '')}`,
            time: time,
            availableSeats: 10 + ((theaterHash * (i + 1)) % 70)
        });
    }
    theaterShowtimes.sort((a, b) => new Date(`1970/01/01 ${a.time}`).getTime() - new Date(`1970/01/01 ${b.time}`).getTime());
    return theaterShowtimes;
  }, []);

  const getSeats = useCallback(async (showtimeId: string): Promise<Seat[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const seats: Seat[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 12;
    const showtimeHash = showtimeId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const premiumRows = ['D', 'E', 'F'];

    for (let r = 0; r < rows.length; r++) {
        const row = rows[r];
        const category: Seat['category'] = premiumRows.includes(row) ? 'Premium' : 'Standard';
        const price = category === 'Premium' ? pricing.premium : pricing.standard;

        for (let i = 1; i <= seatsPerRow; i++) {
            const seed = showtimeHash + r * seatsPerRow + i;
            const isBooked = (seed % 10) < 3;
            seats.push({ 
                id: `${row}${i}`, 
                status: isBooked ? 'booked' : 'available',
                category,
                price
            });
        }
    }
    return seats;
  }, [pricing]);

  // --- ADMIN CRUD METHODS ---
  const addMovie = useCallback((movie: Omit<Movie, 'id'>) => {
    const newMovie: Movie = { ...movie, id: `m-${Date.now()}` };
    setMovies(prev => [...prev, newMovie]);
  }, []);

  const updateMovie = useCallback((updatedMovie: Movie) => {
    setMovies(prev => prev.map(m => m.id === updatedMovie.id ? updatedMovie : m));
  }, []);

  const deleteMovie = useCallback((movieId: string) => {
    setMovies(prev => prev.filter(m => m.id !== movieId));
  }, []);

  const addTheaterChain = useCallback((chainName: string) => {
    if (!theaterChains.includes(chainName)) {
      setTheaterChains(prev => [...prev, chainName]);
    }
  }, [theaterChains]);

  const deleteTheaterChain = useCallback((chainName: string) => {
    setTheaterChains(prev => prev.filter(c => c !== chainName));
  }, []);

  const updatePricing = useCallback((newPricing: { standard: number, premium: number }) => {
    setPricing(newPricing);
  }, []);


  const value: AppContextType = {
    user, login, logout, updateUser,
    theme, toggleTheme,
    selectedState, setSelectedState,
    selectedCity, setSelectedCity,
    bookingState, setBookingMovie, setBookingDetails, clearBooking, confirmedBooking, confirmBooking,
    movies, getMovieById, getTheatersByMovie, getShowtimes, getSeats, theaterChains, pricing,
    addMovie, updateMovie, deleteMovie, addTheaterChain, deleteTheaterChain, updatePricing,
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
