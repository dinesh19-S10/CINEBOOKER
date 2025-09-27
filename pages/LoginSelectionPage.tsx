import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LeftArrowIcon, UserCircleIcon } from '../components/icons';

const LoginSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4">
       <div className="w-full max-w-sm mx-auto">
        <Link to="/" className="inline-flex items-center text-sm text-gray-300 hover:text-white mb-4">
          <LeftArrowIcon className="w-4 h-4 mr-2" />
          {t('backToHome')}
        </Link>
        <div className="bg-black/30 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">{t('chooseLoginType')}</h2>
            <p className="text-gray-400 mb-8">{t('selectAccountType')}</p>
            <div className="space-y-4">
            <button
                onClick={() => navigate('/auth/user')}
                className="w-full flex items-center justify-center space-x-2 text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 font-semibold rounded-lg text-lg px-5 py-3.5 text-center transition-transform transform hover:scale-105"
            >
                <UserCircleIcon className="w-6 h-6" />
                <span>{t('userLogin')}</span>
            </button>
            <button
                onClick={() => navigate('/auth/admin')}
                className="w-full flex items-center justify-center space-x-2 text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-90 font-semibold rounded-lg text-lg px-5 py-3.5 text-center transition-transform transform hover:scale-105"
            >
                <UserCircleIcon className="w-6 h-6" />
                <span>{t('adminLogin')}</span>
            </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSelectionPage;