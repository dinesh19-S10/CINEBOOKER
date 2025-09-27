import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { CineMaxIcon } from '../components/icons';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [dotIndex, setDotIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDotIndex(prev => (prev + 1) % 3);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex-grow flex flex-col items-center justify-center text-center text-white overflow-hidden bg-gradient-to-br from-[#11121e] via-[#2a1a4a] to-[#4f3b78]">
      <Link to="/login" className="relative z-10 p-8 group">
        <CineMaxIcon className="h-24 w-24 mx-auto text-amber-400 mb-4 transition-transform duration-300 group-hover:scale-110"/>
        <h1 className="text-7xl md:text-8xl font-black mb-4 tracking-tighter bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
          {t('appName')}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-2">
          {t('welcomeExperience')}
        </p>
        <p className="text-base text-gray-400 max-w-md mx-auto mb-6">
          {t('welcomePlatform')}
        </p>

        <div className="flex justify-center space-x-2">
            <span className={`h-2 w-2 rounded-full transition-colors ${dotIndex === 0 ? 'bg-amber-400' : 'bg-gray-600'}`}></span>
            <span className={`h-2 w-2 rounded-full transition-colors ${dotIndex === 1 ? 'bg-amber-400' : 'bg-gray-600'}`}></span>
            <span className={`h-2 w-2 rounded-full transition-colors ${dotIndex === 2 ? 'bg-amber-400' : 'bg-gray-600'}`}></span>
        </div>
        <p className="text-xs text-gray-500 mt-6 animate-pulse">
            {t('clickToGetStarted')}
        </p>
      </Link>
    </div>
  );
};

export default HomePage;