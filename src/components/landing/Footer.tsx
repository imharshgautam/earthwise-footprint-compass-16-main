
import React from 'react';
import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-16 bg-black text-green-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center">
              <Leaf className="h-6 w-6 mr-2 text-green-400" />
              <span className="text-2xl font-bold text-green-100">GreenMiles</span>
            </div>
            <p className="mt-2 text-gray-400">
              Reducing carbon footprints, one step at a time.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-10">
            <div>
              <h3 className="font-medium text-green-100 mb-4 text-lg">About</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors text-gray-400">Our Mission</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-gray-400">Team</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-gray-400">Partners</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-green-100 mb-4 text-lg">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors text-gray-400">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-gray-400">Learn</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-gray-400">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-green-100 mb-4 text-lg">Connect</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors text-gray-400">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-gray-400">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-gray-400">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-green-900/50 pt-8 mt-8 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} GreenMiles. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="mr-6 hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
