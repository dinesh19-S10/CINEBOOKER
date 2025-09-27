
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSelectionPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Select Login Type</h2>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/auth/user')}
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-3.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition-transform transform hover:scale-105"
          >
            User Login
          </button>
          <button
            onClick={() => navigate('/auth/admin')}
            className="w-full text-gray-900 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-lg px-5 py-3.5 text-center dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 transition-transform transform hover:scale-105"
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSelectionPage;
