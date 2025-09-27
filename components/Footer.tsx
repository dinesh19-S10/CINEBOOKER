import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, XIcon, InstagramIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 border-t border-gray-700 mt-auto">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-semibold text-white mb-4">CineMax</h3>
            <p className="text-gray-400">
              India's premier movie booking platform. Book tickets for the latest movies across all major theaters in India.
            </p>
            <div className='mt-4 space-y-2 text-sm'>
              <p><a href="mailto:support@cinemax.in" className='hover:text-white'>support@cinemax.in</a></p>
              <p><a href="tel:+9118001234567" className='hover:text-white'>+91 1800-123-4567</a></p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/main" className="hover:text-white">Movies</Link></li>
              <li><a href="#" className="hover:text-white">Theaters</a></li>
              <li><Link to="/profile" className="hover:text-white">My Bookings</Link></li>
              <li><a href="#" className="hover:text-white">Gift Cards</a></li>
              <li><a href="#" className="hover:text-white">Offers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
                <FacebookIcon className="h-6 w-6" />
              </a>
              <a href="#" aria-label="X" className="text-gray-400 hover:text-white transition-colors">
                <XIcon className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
                <InstagramIcon className="h-6 w-6" />
              </a>
            </div>
            <p className="text-gray-400 mt-4 text-sm">Stay connected for the latest movie updates and exclusive offers.</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CineMax. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;