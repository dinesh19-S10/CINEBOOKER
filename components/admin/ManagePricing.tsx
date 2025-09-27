import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAppContext } from '../../context/AppContext';

const ManagePricing: React.FC = () => {
    const { t } = useLanguage();
    const { pricing, updatePricing } = useAppContext();
    const [localPrices, setLocalPrices] = useState(pricing);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setLocalPrices(pricing);
    }, [pricing]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocalPrices(prev => ({...prev, [name]: Number(value) }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');
        try {
            updatePricing(localPrices);
            setMessage(t('pricesUpdated'));
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Failed to update prices.');
        } finally {
            setIsSaving(false);
        }
    }
    
    return (
        <div className="max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t('managePricing')}</h2>
            <form onSubmit={handleSubmit} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('standardPrice')}</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">₹</span>
                        </div>
                        <input 
                            type="number"
                            name="standard"
                            value={localPrices.standard}
                            onChange={handleChange}
                            className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('premiumPrice')}</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                         <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">₹</span>
                        </div>
                        <input 
                            type="number"
                            name="premium"
                            value={localPrices.premium}
                            onChange={handleChange}
                            className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <button 
                        type="submit"
                        disabled={isSaving}
                        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:bg-primary-400"
                    >
                        {isSaving ? t('processing') : t('updatePrices')}
                    </button>
                    {message && <p className="text-sm text-green-600 dark:text-green-400">{message}</p>}
                </div>
            </form>
        </div>
    );
};

export default ManagePricing;
