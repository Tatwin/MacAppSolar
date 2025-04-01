import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Explore Our <span className="text-space-accent">Solar System</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Discover the wonders of space, play fun space games, and learn about our cosmic neighborhood!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-space-blue rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
          <div className="text-center mb-4">
            <i className="bi bi-globe text-5xl text-space-accent"></i>
          </div>
          <h2 className="text-2xl font-bold mb-3 text-center">Solar System</h2>
          <p className="text-gray-300 mb-4">
            Click on planets to learn interesting facts about each celestial body in our solar system.
          </p>
          <div className="text-center">
            <Link to="/solar-system" className="inline-block bg-space-accent text-white px-4 py-2 rounded hover:bg-opacity-80 transition">
              Explore Planets
            </Link>
          </div>
        </div>

        <div className="bg-space-blue rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
          <div className="text-center mb-4">
            <i className="bi bi-truck text-5xl text-space-accent"></i>
          </div>
          <h2 className="text-2xl font-bold mb-3 text-center">Mars Rover</h2>
          <p className="text-gray-300 mb-4">
            Control a rover on the Martian surface! Navigate through obstacles to reach your destination.
          </p>
          <div className="text-center">
            <Link to="/mars-rover" className="inline-block bg-space-accent text-white px-4 py-2 rounded hover:bg-opacity-80 transition">
              Play Now
            </Link>
          </div>
        </div>

        <div className="bg-space-blue rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
          <div className="text-center mb-4">
            <i className="bi bi-question-circle text-5xl text-space-accent"></i>
          </div>
          <h2 className="text-2xl font-bold mb-3 text-center">Space Quiz</h2>
          <p className="text-gray-300 mb-4">
            Test your knowledge of space with our fun quiz! Learn interesting facts about our universe.
          </p>
          <div className="text-center">
            <Link to="/space-quiz" className="inline-block bg-space-accent text-white px-4 py-2 rounded hover:bg-opacity-80 transition">
              Take Quiz
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-space-blue rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
          <div className="text-center mb-4">
            <i className="bi bi-controller text-5xl text-space-accent"></i>
          </div>
          <h2 className="text-2xl font-bold mb-3 text-center">Asteroid Shooter</h2>
          <p className="text-gray-300 mb-4">
            Defend Earth from incoming asteroids in this simple but addictive arcade-style game!
          </p>
          <div className="text-center">
            <Link to="/asteroid-shooter" className="inline-block bg-space-accent text-white px-4 py-2 rounded hover:bg-opacity-80 transition">
              Play Now
            </Link>
          </div>
        </div>

        <div className="bg-space-blue rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
          <div className="text-center mb-4">
            <i className="bi bi-chat-dots text-5xl text-space-accent"></i>
          </div>
          <h2 className="text-2xl font-bold mb-3 text-center">Ask Astro</h2>
          <p className="text-gray-300 mb-4">
            Have questions about space? Our AI assistant Astro is here to answer your space-related queries!
          </p>
          <div className="text-center">
            <Link to="/ask-astro" className="inline-block bg-space-accent text-white px-4 py-2 rounded hover:bg-opacity-80 transition">
              Chat Now
            </Link>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl mb-12">
        <img 
          src="https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
          alt="Space exploration" 
          className="w-full h-64 md:h-96 object-cover"
          crossOrigin="anonymous"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/1200x600/1a1a4a/FFFFFF?text=Space+Exploration";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-space-dark to-transparent flex items-center">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-2">Ready for an Adventure?</h2>
            <p className="text-xl mb-4 max-w-md">Join us on an exciting journey through the cosmos!</p>
            <Link to="/solar-system" className="inline-block bg-space-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-80 transition">
              Start Exploring
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Did You Know?</h2>
        <div className="bg-space-blue p-6 rounded-lg inline-block">
          <p className="text-lg italic">
            "The light from the Sun takes about 8 minutes and 20 seconds to reach Earth."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
