import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-black border-b border-gold-600 px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Cpu className="h-8 w-8 text-gold-500" />
          <span className="text-2xl font-bold text-gold-500">M2C Army</span>
        </Link>
        <div className="flex space-x-6">
          <Link to="/" className="text-white hover:text-gold-500 transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-white hover:text-gold-500 transition-colors">
            About Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;