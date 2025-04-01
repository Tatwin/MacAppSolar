import React, { useState } from 'react';
import PlanetInfo from '../components/PlanetInfo';

const SolarSystem = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  
  const planets = [
    {
      id: 1,
      name: 'Mercury',
      color: '#A9A9A9',
      size: 'w-12 h-12 md:w-16 md:h-16',
      description: 'Mercury is the smallest and innermost planet in the Solar System. It has no atmosphere to retain heat, so it has extreme temperature variations.',
      distance: '57.9 million km from the Sun',
      day: '58.6 Earth days',
      year: '88 Earth days',
      moons: '0'
    },
    {
      id: 2,
      name: 'Venus',
      color: '#E6E6FA',
      size: 'w-16 h-16 md:w-20 md:h-20',
      description: 'Venus is the second planet from the Sun. It has a thick atmosphere that traps heat, making it the hottest planet in our solar system.',
      distance: '108.2 million km from the Sun',
      day: '243 Earth days',
      year: '225 Earth days',
      moons: '0'
    },
    {
      id: 3,
      name: 'Earth',
      color: '#1E90FF',
      size: 'w-16 h-16 md:w-20 md:h-20',
      description: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. It has one natural satellite, the Moon.',
      distance: '149.6 million km from the Sun',
      day: '24 hours',
      year: '365.25 days',
      moons: '1'
    },
    {
      id: 4,
      name: 'Mars',
      color: '#CD5C5C',
      size: 'w-14 h-14 md:w-18 md:h-18',
      description: 'Mars is the fourth planet from the Sun. It is often called the "Red Planet" due to its reddish appearance.',
      distance: '227.9 million km from the Sun',
      day: '24.6 hours',
      year: '687 Earth days',
      moons: '2'
    },
    {
      id: 5,
      name: 'Jupiter',
      color: '#F4A460',
      size: 'w-24 h-24 md:w-32 md:h-32',
      description: 'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets combined.',
      distance: '778.5 million km from the Sun',
      day: '9.9 hours',
      year: '11.9 Earth years',
      moons: '79'
    },
    {
      id: 6,
      name: 'Saturn',
      color: '#DAA520',
      size: 'w-20 h-20 md:w-28 md:h-28',
      description: 'Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is known for its prominent ring system.',
      distance: '1.4 billion km from the Sun',
      day: '10.7 hours',
      year: '29.5 Earth years',
      moons: '82'
    },
    {
      id: 7,
      name: 'Uranus',
      color: '#ADD8E6',
      size: 'w-18 h-18 md:w-24 md:h-24',
      description: 'Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System.',
      distance: '2.9 billion km from the Sun',
      day: '17.2 hours',
      year: '84 Earth years',
      moons: '27'
    },
    {
      id: 8,
      name: 'Neptune',
      color: '#4169E1',
      size: 'w-18 h-18 md:w-24 md:h-24',
      description: 'Neptune is the eighth and farthest known planet from the Sun in the Solar System. It is the fourth-largest planet by diameter and the third-largest by mass.',
      distance: '4.5 billion km from the Sun',
      day: '16.1 hours',
      year: '165 Earth years',
      moons: '14'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Solar System</h1>
      
      <div className="mb-8 text-center">
        <p className="text-lg mb-4">Click on a planet to learn more about it!</p>
      </div>
      
      <div className="relative">
        {/* Sun */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 bg-yellow-500 rounded-full shadow-lg shadow-yellow-300 z-10"></div>
        
        {/* Orbits and planets */}
        <div className="pl-32 md:pl-40 overflow-x-auto whitespace-nowrap py-20">
          {planets.map((planet, index) => (
            <div key={planet.id} className="inline-block mx-8 relative">
              <div 
                className={`planet ${planet.size} rounded-full inline-block`}
                style={{ backgroundColor: planet.color }}
                onClick={() => setSelectedPlanet(planet)}
              ></div>
              <p className="text-center mt-2">{planet.name}</p>
            </div>
          ))}
        </div>
      </div>
      
      {selectedPlanet && (
        <PlanetInfo 
          planet={selectedPlanet} 
          onClose={() => setSelectedPlanet(null)} 
        />
      )}
      
      <div className="mt-12 bg-space-blue p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Fun Facts About Our Solar System</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>The Sun accounts for 99.86% of the mass in the solar system.</li>
          <li>One day on Venus is longer than one year on Venus.</li>
          <li>Jupiter has the shortest day of all the planets, lasting only about 10 hours.</li>
          <li>Saturn's rings are made mostly of ice and rock.</li>
          <li>If you could put Saturn in a giant bathtub, it would float.</li>
        </ul>
      </div>
    </div>
  );
};

export default SolarSystem;
