import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { SunIcon, MoonIcon, UserCircleIcon, ChevronDownIcon, MapPinIcon, ShoppingCartIcon, CineMaxIcon, SearchIcon } from './icons';
import { INDIAN_STATES, INDIAN_STATES_AND_CITIES } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { languages } from '../translations';


const Header: React.FC = () => {
  const { user, logout, theme, toggleTheme, selectedCity, setSelectedCity, selectedState, setSelectedState, bookingState } = useAppContext();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-white">
              <CineMaxIcon className="h-8 w-8 text-amber-400" />
              <span className="hidden sm:inline">{t('appName')}</span>
            </Link>
             <div className="relative flex items-center text-gray-300">
              <MapPinIcon className="h-5 w-5 mr-1" />
              <div className="flex text-sm">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="bg-transparent font-medium focus:outline-none focus:ring-0 border-0 appearance-none pr-1"
                  aria-label={t('selectState')}
                >
                  {INDIAN_STATES.map(state => (
                    <option key={state} value={state} className="text-gray-900 bg-white">{state}</option>
                  ))}
                </select>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-transparent font-medium focus:outline-none focus:ring-0 border-0 appearance-none pr-6"
                  aria-label={t('selectCity')}
                >
                  {INDIAN_STATES_AND_CITIES[selectedState]?.map(city => (
                    <option key={city} value={city} className="text-gray-900 bg-white">{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Center Section */}
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-center">
            <div className="max-w-md w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">{t('searchMovies')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm"
                  placeholder={t('searchMovies')}
                  type="search"
                />
              </div>
            </div>
          </div>
          
          {/* Right Section */}
          <div className="flex items-center space-x-1 sm:space-x-2">
             <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-transparent text-sm font-medium focus:outline-none focus:ring-0 border-0 appearance-none pr-6 text-gray-300"
                  aria-label="Select language"
                >
                  {Object.entries(languages).map(([code, name]) => (
                    <option key={code} value={code} className="text-gray-900 bg-white">{name}</option>
                  ))}
                </select>
            </div>


            {bookingState.movie && bookingState.seats.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setSummaryOpen(!summaryOpen)}
                  onBlur={() => setTimeout(() => setSummaryOpen(false), 200)}
                  className="p-2 rounded-full text-gray-300 hover:bg-gray-700 relative"
                  aria-label={t('viewBookingSummary')}
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-xs font-bold text-white">
                    {bookingState.seats.length}
                  </span>
                </button>
                {summaryOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-gray-800 rounded-md shadow-lg py-2 z-50 ring-1 ring-black ring-opacity-5">
                    <div className="px-4 pb-2 border-b border-gray-700">
                        <h4 className="font-bold text-white truncate">{bookingState.movie.title}</h4>
                        <p className="text-sm text-gray-400">{bookingState.theater?.name}</p>
                    </div>
                    <div className="px-4 py-2 text-sm text-gray-200">
                        <p><strong>{t('seats')}:</strong> <span className="font-mono">{bookingState.seats.join(', ')}</span></p>
                        <p className="font-bold mt-1"><strong>{t('total')}:</strong> ₹{bookingState.totalPrice}</p>
                    </div>
                    <div className="px-4 pt-2 border-t border-gray-700">
                        <Link
                            to="/booking/payment"
                            onClick={() => setSummaryOpen(false)}
                            className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:opacity-90"
                        >
                            {t('proceedToPay')}
                        </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-300 hover:bg-gray-700"
              aria-label={t('toggleTheme')}
            >
              {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
            </button>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                  className="flex items-center space-x-2 text-white"
                >
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="User Avatar" className="h-8 w-8 rounded-full object-cover"/>
                  ) : (
                    <UserCircleIcon className="h-8 w-8" />
                  )}
                  <div className='text-left hidden md:block'>
                      <p className='text-sm font-semibold'>{user.username}</p>
                      <p className='text-xs text-gray-400 capitalize'>{user.role}</p>
                  </div>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                     <Link
                      to="/profile"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                    >
                      {t('myProfile')}
                    </Link>
                    {user.role === 'admin' && (
                       <Link
                        to="/admin"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                      >
                        {t('adminPanel')}
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                    >
                      {t('logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:opacity-90"
              >
                {t('login')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;