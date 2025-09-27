import React from 'react';
import { FacebookIcon, XIcon, InstagramIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">CineBook</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your ultimate destination for booking movie tickets online. Experience seamless booking and enjoy the show!
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>Email: support@cinebook.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: 123 Movie Lane, Cinema City, India</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                <FacebookIcon className="h-6 w-6" />
              </a>
              <a href="#" aria-label="X" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                <XIcon className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                <InstagramIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} CineBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;