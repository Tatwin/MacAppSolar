import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-space-blue p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold flex items-center">
          <i className="bi bi-rocket-takeoff-fill mr-2 text-space-accent"></i>
          MacApp Solar
        </Link>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <i className={`bi ${isOpen ? 'bi-x' : 'bi-list'} text-2xl`}></i>
          </button>
        </div>
        
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-space-accent transition">Home</Link>
          <Link to="/solar-system" className="text-white hover:text-space-accent transition">Solar System</Link>
          <Link to="/mars-rover" className="text-white hover:text-space-accent transition">Mars Rover</Link>
          <Link to="/space-quiz" className="text-white hover:text-space-accent transition">Space Quiz</Link>
          <Link to="/asteroid-shooter" className="text-white hover:text-space-accent transition">Asteroid Shooter</Link>
          <Link to="/ask-astro" className="text-white hover:text-space-accent transition">Ask Astro</Link>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-space-blue">
          <div className="flex flex-col space-y-3 px-4 pt-2 pb-4">
            <Link to="/" className="text-white hover:text-space-accent transition" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/solar-system" className="text-white hover:text-space-accent transition" onClick={() => setIsOpen(false)}>Solar System</Link>
            <Link to="/mars-rover" className="text-white hover:text-space-accent transition" onClick={() => setIsOpen(false)}>Mars Rover</Link>
            <Link to="/space-quiz" className="text-white hover:text-space-accent transition" onClick={() => setIsOpen(false)}>Space Quiz</Link>
            <Link to="/asteroid-shooter" className="text-white hover:text-space-accent transition" onClick={() => setIsOpen(false)}>Asteroid Shooter</Link>
            <Link to="/ask-astro" className="text-white hover:text-space-accent transition" onClick={() => setIsOpen(false)}>Ask Astro</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
