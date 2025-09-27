import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { SunIcon, MoonIcon, UserCircleIcon, TicketIcon, ChevronDownIcon, MapPinIcon, ShoppingCartIcon } from './icons';
import { INDIAN_STATES, INDIAN_STATES_AND_CITIES } from '../constants';

const Header: React.FC = () => {
  const { user, logout, theme, toggleTheme, selectedCity, setSelectedCity, selectedState, setSelectedState, bookingState } = useAppContext();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary-600 dark:text-primary-400">
              <TicketIcon className="h-8 w-8" />
              <span className="hidden sm:inline">CineBook</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative flex items-center text-gray-600 dark:text-gray-300">
              <MapPinIcon className="h-5 w-5 mr-2" />
              <div className="flex space-x-2">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="bg-transparent text-sm font-medium focus:outline-none focus:ring-0 border-0 appearance-none pr-6"
                  aria-label="Select state"
                >
                  {INDIAN_STATES.map(state => (
                    <option key={state} value={state} className="text-gray-900 dark:text-white bg-white dark:bg-gray-800">{state}</option>
                  ))}
                </select>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-transparent text-sm font-medium focus:outline-none focus:ring-0 border-0 appearance-none pr-6"
                  aria-label="Select city"
                >
                  {INDIAN_STATES_AND_CITIES[selectedState]?.map(city => (
                    <option key={city} value={city} className="text-gray-900 dark:text-white bg-white dark:bg-gray-800">{city}</option>
                  ))}
                </select>
              </div>
            </div>

            {bookingState.movie && bookingState.seats.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setSummaryOpen(!summaryOpen)}
                  onBlur={() => setTimeout(() => setSummaryOpen(false), 200)}
                  className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 relative"
                  aria-label="View booking summary"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                    {bookingState.seats.length}
                  </span>
                </button>
                {summaryOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50 ring-1 ring-black ring-opacity-5">
                    <div className="px-4 pb-2 border-b dark:border-gray-700">
                        <h4 className="font-bold text-gray-900 dark:text-white truncate">{bookingState.movie.title}</h4>
                        <p className="text-sm text-gray-500">{bookingState.theater?.name}</p>
                    </div>
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                        <p><strong>Seats:</strong> <span className="font-mono">{bookingState.seats.join(', ')}</span></p>
                        <p className="font-bold mt-1"><strong>Total:</strong> ₹{bookingState.totalPrice}</p>
                    </div>
                    <div className="px-4 pt-2 border-t dark:border-gray-700">
                        <Link
                            to="/booking/payment"
                            onClick={() => setSummaryOpen(false)}
                            className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                        >
                            Proceed to Pay
                        </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
            </button>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                  className="flex items-center space-x-2 text-gray-800 dark:text-white"
                >
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="User Avatar" className="h-8 w-8 rounded-full object-cover"/>
                  ) : (
                    <UserCircleIcon className="h-8 w-8" />
                  )}
                  <span className="hidden md:inline">{user.username}</span>
                  <ChevronDownIcon className={`h-5 w-5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                     <Link
                      to="/profile"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;