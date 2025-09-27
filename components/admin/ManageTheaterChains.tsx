import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAppContext } from '../../context/AppContext';
import { TrashIcon } from '../icons';

const ManageTheaterChains: React.FC = () => {
  const { t } = useLanguage();
  const { theaterChains, addTheaterChain, deleteTheaterChain } = useAppContext();
  const [newChainName, setNewChainName] = useState('');

  const handleAddChain = (e: React.FormEvent) => {
    e.preventDefault();
    if (newChainName.trim()) {
        addTheaterChain(newChainName.trim());
        setNewChainName('');
    }
  }

  const handleDeleteChain = (chainName: string) => {
    if (window.confirm(t('areYouSureDelete'))) {
        deleteTheaterChain(chainName);
    }
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t('manageTheaterChains')}</h2>
      
      <form onSubmit={handleAddChain} className="flex gap-4 mb-6">
        <input 
            type="text" 
            value={newChainName}
            onChange={(e) => setNewChainName(e.target.value)}
            placeholder={t('newChainName')}
            className="flex-grow w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />
        <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">{t('add')}</button>
      </form>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {theaterChains.map(chain => (
              <li key={chain} className="px-6 py-4 flex items-center justify-between">
                  <span className="text-gray-900 dark:text-white">{chain}</span>
                  <button onClick={() => handleDeleteChain(chain)} className="text-red-500 hover:text-red-700">
                      <TrashIcon className="w-5 h-5"/>
                  </button>
              </li>
          ))}
          </ul>
      </div>
    </div>
  );
};

export default ManageTheaterChains;
