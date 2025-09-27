import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { mockLogin } from '../services/api';
import { GoogleIcon, FacebookIcon, XIcon } from '../components/icons';

type AuthMode = 'login' | 'register';
type Role = 'user' | 'admin';

const AuthPage: React.FC = () => {
    const { role } = useParams<{ role: Role }>();
    const [mode, setMode] = useState<AuthMode>('login');
    const navigate = useNavigate();
    const { login } = useAppContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (mode === 'login') {
            try {
                const user = await mockLogin(email, password);
                if (user.role === role) {
                    login(user);
                    navigate('/main');
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
        <div className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gray-800 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                    {role?.charAt(0).toUpperCase() + role?.slice(1)} {mode === 'login' ? 'Sign In' : 'Sign Up'}
                </h2>

                <div className="flex border-b border-gray-200 dark:border-gray-700">
                    <button onClick={() => { setMode('login'); setError(null); }} className={`w-1/2 py-4 text-center font-medium ${mode === 'login' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}>Sign In</button>
                    <button onClick={() => { setMode('register'); setError(null); }} className={`w-1/2 py-4 text-center font-medium ${mode === 'register' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}>Sign Up</button>
                </div>

                {mode === 'login' && (
                    <div className="p-3 text-sm bg-blue-50 dark:bg-gray-800 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-200 dark:border-gray-700">
                        <p className="font-semibold">Demo Credentials:</p>
                        <ul className="list-disc list-inside mt-1">
                            <li><strong>User:</strong> user@test.com</li>
                            <li><strong>Admin:</strong> admin@test.com</li>
                        </ul>
                        <p className="mt-1">Any password will work.</p>
                    </div>
                )}

                <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="p-3 text-sm text-red-800 bg-red-100 rounded-lg dark:bg-gray-700 dark:text-red-400" role="alert">
                            <span className="font-medium">Error:</span> {error}
                        </div>
                    )}
                    {mode === 'register' && (
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                    )}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{mode === 'login' ? 'Sign In' : 'Create Account'}</button>
                </form>

                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                    <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400">Or {mode === 'login' ? 'sign in' : 'sign up'} with</span>
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                </div>

                <div className="flex justify-center space-x-4">
                    <button aria-label="Sign in with Google" className="p-3 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <GoogleIcon className="h-6 w-6" />
                    </button>
                    <button aria-label="Sign in with Facebook" className="p-3 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-[#1877F2]">
                        <FacebookIcon className="h-6 w-6" />
                    </button>
                    <button aria-label="Sign in with X" className="p-3 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-white">
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;