import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Movie } from '../types';
import { getMovieById } from '../services/api';
import { ClockIcon } from '../components/icons';
import { useAppContext } from '../context/AppContext';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { bookingState, setBookingMovie } = useAppContext();
  const [movie, setMovie] = useState<Movie | undefined>(bookingState.movie);
  const [loading, setLoading] = useState(!bookingState.movie);

  useEffect(() => {
    // If the movie isn't in context or doesn't match the URL id, fetch it.
    if ((!movie || movie.id !== id) && id) {
      const fetchMovie = async () => {
        setLoading(true);
        const movieData = await getMovieById(id);
        if (movieData) {
          setMovie(movieData);
          setBookingMovie(movieData); // Set it in the context as well
        }
        setLoading(false);
      };
      fetchMovie();
    }
  }, [id, movie, setBookingMovie]);

  if (loading) {
    return <div className="flex-grow flex items-center justify-center dark:bg-gray-900"><p className="dark:text-white">Loading movie details...</p></div>;
  }

  if (!movie) {
    return <div className="flex-grow flex items-center justify-center dark:bg-gray-900"><p className="dark:text-white">Movie not found.</p></div>;
  }

  return (
    <div className="flex-grow bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img src={movie.posterUrl} alt={movie.title} className="rounded-lg shadow-2xl w-full" />
          </div>
          <div className="md:w-2/3 text-gray-800 dark:text-gray-200">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <div className="flex items-center space-x-4 mb-4 text-gray-600 dark:text-gray-400">
              <span>{movie.language}</span>
              <span>&bull;</span>
              <span>{movie.genre}</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1"><ClockIcon className="w-4 h-4" /> {movie.duration} min</span>
            </div>
            <p className="text-lg mb-6">{movie.description}</p>
            <div className="space-y-2 mb-8">
                <p><strong className="font-semibold">Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
                <p><strong className="font-semibold">Rating:</strong> {movie.rating} / 10</p>
            </div>
            <button
              onClick={() => {
                if (movie) setBookingMovie(movie); // This also clears previous booking details
                navigate(`/booking/theater`);
              }}
              className="px-8 py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-colors"
            >
              Book Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;