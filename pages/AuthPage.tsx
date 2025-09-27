import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { mockLogin } from '../services/api';
import { GoogleIcon, FacebookIcon, XIcon, LeftArrowIcon, EyeIcon, EyeSlashIcon } from '../components/icons';
import { useLanguage } from '../context/LanguageContext';

type AuthMode = 'login' | 'register';
type Role = 'user' | 'admin';

const AuthPage: React.FC = () => {
    const { role } = useParams<{ role: Role }>();
    const [mode, setMode] = useState<AuthMode>('login');
    const navigate = useNavigate();
    const { login } = useAppContext();
    const { t } = useLanguage();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (mode === 'login') {
            try {
                const user = await mockLogin(email, password);
                if (user.role === role) {
                    login(user);
                    if (user.role === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/main');
                    }
                } else {
                    setError(`Login failed. Please use the ${user.role} login page.`);
                }
            } catch (err) {
                 if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred during login.');
                }
            }
        } else {
            // Mock registration
            alert('Registration successful! Please login.');
            setMode('login');
        }
    };
    
    return (
        <div className="flex-grow flex flex-col items-center justify-center p-4">
             <div className="w-full max-w-md mx-auto">
                <Link to="/login" className="inline-flex items-center text-sm text-gray-300 hover:text-white mb-4">
                    <LeftArrowIcon className="w-4 h-4 mr-2" />
                    {t('back')}
                </Link>
                <div className="bg-black/30 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-white">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white">
                            {role?.charAt(0).toUpperCase() + role?.slice(1)} {mode === 'login' ? t('signIn') : t('signUp')}
                        </h2>
                        <p className="text-gray-400 mt-2">
                          {mode === 'login' ? t('welcomeBack') : t('createYourAccount')}
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-3 text-sm text-red-300 bg-red-500/20 rounded-lg" role="alert">
                                <span className="font-medium">Error:</span> {error}
                            </div>
                        )}
                        {mode === 'register' && (
                             <div>
                                <label className="block mb-2 text-sm font-medium text-gray-300">{t('username')}</label>
                                <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="bg-gray-700/50 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5" required />
                            </div>
                        )}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-300">{t('emailAddress')}</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-700/50 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5" placeholder="Enter your email" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-300">{t('password')}</label>
                            <div className="relative">
                                <input type={isPasswordVisible ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-700/50 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5" required />
                                <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400">
                                    {isPasswordVisible ? <EyeSlashIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}
                                </button>
                            </div>
                        </div>
                        
                        <button type="submit" className="w-full text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 font-medium rounded-lg text-sm px-5 py-3 text-center">{mode === 'login' ? t('signIn') : t('createAccount')}</button>
                    </form>

                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-600"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-sm">{t('orContinueWith')}</span>
                        <div className="flex-grow border-t border-gray-600"></div>
                    </div>

                    <div className="space-y-3">
                        <button aria-label="Continue with Google" className="w-full flex items-center justify-center space-x-2 p-3 border border-gray-600 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors">
                            <GoogleIcon className="h-5 w-5" />
                            <span className="text-sm font-medium">Continue with Google</span>
                        </button>
                         <button aria-label="Continue with Facebook" className="w-full flex items-center justify-center space-x-2 p-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#166fe5] transition-colors">
                            <FacebookIcon className="h-5 w-5" />
                            <span className="text-sm font-medium">Continue with Facebook</span>
                        </button>
                         <button aria-label="Continue with X" className="w-full flex items-center justify-center space-x-2 p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                            <XIcon className="h-5 w-5" />
                            <span className="text-sm font-medium">Continue with X (Twitter)</span>
                        </button>
                    </div>

                    <p className="text-sm text-center text-gray-400 mt-6">
                        {mode === 'login' ? t('dontHaveAccount') : t('alreadyHaveAccount')}
                        <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(null); }} className="font-medium text-purple-400 hover:underline ml-1">
                          {mode === 'login' ? t('signUp') : t('signIn')}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;