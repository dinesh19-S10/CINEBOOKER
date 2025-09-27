import type { Movie, User, Theater, Showtime, Seat, Booking } from '../types';

export const initialMockMovies: Movie[] = [
  // ... (movie data remains the same)
  { id: '1', title: 'Kalki 2898 AD', posterUrl: 'https://picsum.photos/seed/kalki/400/600', language: 'Telugu', genre: 'Sci-Fi', duration: 180, rating: 8.5, description: 'A modern-day avatar of the Hindu god Vishnu, who is believed to have descended to Earth to protect the world from evil forces.', releaseDate: '2024-06-27' },
  { id: '2', title: 'Pushpa 2: The Rule', posterUrl: 'https://picsum.photos/seed/pushpa2/400/600', language: 'Telugu', genre: 'Action', duration: 170, rating: 9.0, description: 'Pushpa\'s rise in the world of red sandalwood smuggling is challenged by new enemies and old foes.', releaseDate: '2024-08-15' },
  { id: '3', title: 'Indian 2', posterUrl: 'https://picsum.photos/seed/indian2/400/600', language: 'Tamil', genre: 'Action', duration: 165, rating: 8.2, description: 'An aged freedom fighter returns to India to fight corruption and injustice.', releaseDate: '2024-07-12' },
  { id: '4', title: 'Singham Again', posterUrl: 'https://picsum.photos/seed/singham3/400/600', language: 'Hindi', genre: 'Action', duration: 155, rating: 7.8, description: 'The fearless cop Bajirao Singham is back to take on a new and more dangerous enemy.', releaseDate: '2024-11-01' },
  { id: '5', title: 'L2: Empuraan', posterUrl: 'https://picsum.photos/seed/l2/400/600', language: 'Malayalam', genre: 'Thriller', duration: 175, rating: 8.8, description: 'The follow-up to the blockbuster Lucifer, exploring the past and future of Stephen Nedumpally.', releaseDate: '2024-12-20' },
  { id: '6', title: 'Kantara: Chapter 1', posterUrl: 'https://picsum.photos/seed/kantara1/400/600', language: 'Kannada', genre: 'Fantasy', duration: 160, rating: 8.9, description: 'A prequel to Kantara, delving into the origins of the legend.', releaseDate: '2024-12-31' },
  { id: '7', title: 'Inside Out 2', posterUrl: 'https://picsum.photos/seed/insideout2/400/600', language: 'English', genre: 'Animation', duration: 96, rating: 8.1, description: 'Riley is now a teenager, and new emotions are introduced in Headquarters.', releaseDate: '2024-06-14' },
  { id: '8', title: 'A Quiet Place: Day One', posterUrl: 'https://picsum.photos/seed/quietplace/400/600', language: 'English', genre: 'Horror', duration: 100, rating: 7.5, description: 'Experience the day the world went quiet.', releaseDate: '2024-06-28' },
];

const mockUsers: User[] = [
    {
      id: '1',
      username: 'testuser',
      email: 'user@test.com',
      role: 'user',
      avatarUrl: 'https://picsum.photos/seed/user1/200/200',
      phone: '9876543210',
      dob: '1995-08-15',
      gender: 'Male',
      address: '123 Movie Lane, Cinema City, Bangalore',
    },
    {
      id: '2',
      username: 'testadmin',
      email: 'admin@test.com',
      role: 'admin',
      avatarUrl: 'https://picsum.photos/seed/admin1/200/200',
    },
];

export const initialTheaterChains = [
    'PVR Cinemas', 'INOX Leisure', 'Cinepolis', 'SPI Cinemas', 'AGS Cinemas',
    'Luxe Cinemas', 'Gopalan Cinemas', 'Carnival Cinemas', 'Miraj Cinemas', 'Mayajaal',
];

export const initialMockPricing = {
    standard: 250,
    premium: 400,
};

export const allPossibleShowtimes = [
    "09:00 AM", "10:30 AM", "11:45 AM", "12:30 PM", "02:00 PM",
    "03:15 PM", "04:30 PM", "05:45 PM", "07:00 PM", "08:15 PM",
    "09:30 PM", "10:45 PM"
];

// Simulates network call for user authentication
export const mockLogin = async (email: string, _password: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const user = mockUsers.find(u => u.email === email);
    if (user) {
        return user;
    }
    throw new Error('Invalid credentials');
};

// Simulates network call for creating a final booking record
export const createBooking = async (bookingDetails: Omit<Booking, 'bookingId' | 'qrCodeUrl'>): Promise<Booking> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const bookingId = `CINE-${Date.now()}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${bookingId}`;
    return {
        ...bookingDetails,
        bookingId,
        qrCodeUrl
    };
};
