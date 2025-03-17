import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gold-600 py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gold-500 font-semibold">© 2025 M2C Army. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gold-500 transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-white hover:text-gold-500 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-white hover:text-gold-500 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;