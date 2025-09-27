
import React from 'react';
import type { Movie } from '../types';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  const { setBookingMovie } = useAppContext();

  const handleBookNow = () => {
    setBookingMovie(movie);
    navigate(`/movie/${movie.id}`);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <img className="w-full h-96 object-cover" src={movie.posterUrl} alt={movie.title} />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{movie.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mt-1">{movie.language} &bull; {movie.genre}</p>
        <button
          onClick={handleBookNow}
          className="mt-4 w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
