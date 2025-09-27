
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const moviePosters = [
  'https://picsum.photos/seed/kalki-bg/1920/1080',
  'https://picsum.photos/seed/pushpa2-bg/1920/1080',
  'https://picsum.photos/seed/indian2-bg/1920/1080',
  'https://picsum.photos/seed/singham3-bg/1920/1080',
  'https://picsum.photos/seed/l2-bg/1920/1080',
  'https://picsum.photos/seed/kantara1-bg/1920/1080',
];

const HomePage: React.FC = () => {
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPosterIndex(prevIndex => (prevIndex + 1) % moviePosters.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex-grow flex flex-col items-center justify-center text-center text-white overflow-hidden">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 z-0">
        {moviePosters.map((posterUrl, index) => (
          <img
            key={posterUrl}
            src={posterUrl}
            alt="Movie poster background"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentPosterIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to CineBook
        </h1>
        <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
          Your one-stop destination for booking movie tickets. Discover the latest movies, check showtimes, and book your seats in just a few clicks.
        </p>
        <Link
          to="/main"
          className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105"
        >
          Browse Movies
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
