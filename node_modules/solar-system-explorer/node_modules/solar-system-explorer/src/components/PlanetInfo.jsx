import React from 'react';

const PlanetInfo = ({ planet, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-space-blue rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{planet.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        
        <div className="flex items-center mb-6">
          <div 
            className="w-16 h-16 rounded-full mr-4"
            style={{ backgroundColor: planet.color }}
          ></div>
          <div>
            <p className="text-sm text-gray-300">{planet.distance}</p>
          </div>
        </div>
        
        <p className="mb-4">{planet.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-space-dark p-3 rounded">
            <p className="text-sm text-gray-400">Day Length</p>
            <p className="font-bold">{planet.day}</p>
          </div>
          <div className="bg-space-dark p-3 rounded">
            <p className="text-sm text-gray-400">Year Length</p>
            <p className="font-bold">{planet.year}</p>
          </div>
          <div className="bg-space-dark p-3 rounded">
            <p className="text-sm text-gray-400">Moons</p>
            <p className="font-bold">{planet.moons}</p>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="w-full bg-space-accent text-white py-2 rounded hover:bg-opacity-80 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PlanetInfo;
