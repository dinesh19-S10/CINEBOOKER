import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import ManageMovies from '../components/admin/ManageMovies';
import ManageTheaterChains from '../components/admin/ManageTheaterChains';
import ManagePricing from '../components/admin/ManagePricing';

type AdminTab = 'movies' | 'theaters' | 'pricing';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('movies');
  const { t } = useLanguage();

  const tabs: { id: AdminTab; label: string }[] = [
    { id: 'movies', label: t('manageMovies') },
    { id: 'theaters', label: t('manageTheaterChains') },
    { id: 'pricing', label: t('managePricing') },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'movies':
        return <ManageMovies />;
      case 'theaters':
        return <ManageTheaterChains />;
      case 'pricing':
        return <ManagePricing />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-grow bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('adminPanel')}</h1>
        
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
