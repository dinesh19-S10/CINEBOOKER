import React from 'react';
import type { Movie } from '../types';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { StarIcon } from './icons';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { setBookingMovie } = useAppContext();

  const handleCardClick = () => {
    setBookingMovie(movie);
  };
  
  return (
    <Link 
      to={`/movie/${movie.id}`} 
      onClick={handleCardClick}
      className="block group relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
    >
      <img className="w-full h-full object-cover" src={movie.posterUrl} alt={movie.title} />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 transition-opacity duration-300"></div>

      <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1 text-xs font-bold text-amber-400">
          <StarIcon className="w-4 h-4"/>
          <span>{movie.rating.toFixed(1)}</span>
      </div>

       <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-white">
          {movie.language}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-lg font-bold truncate">{movie.title}</h3>
        <div className="flex flex-wrap gap-2 mt-1">
          <span className="text-xs font-semibold bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">{movie.genre}</span>
          <span className="text-xs font-semibold bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">{movie.duration} min</span>
          <span className="text-xs font-semibold bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">{new Date(movie.releaseDate).getFullYear()}</span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;