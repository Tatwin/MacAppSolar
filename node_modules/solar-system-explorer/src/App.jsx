import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SolarSystem from './pages/SolarSystem';
import MarsRover from './pages/MarsRover';
import AskAstro from './pages/AskAstro';
import SpaceQuiz from './pages/SpaceQuiz';
import AsteroidShooter from './pages/AsteroidShooter';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="stars"></div>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solar-system" element={<SolarSystem />} />
          <Route path="/mars-rover" element={<MarsRover />} />
          <Route path="/ask-astro" element={<AskAstro />} />
          <Route path="/space-quiz" element={<SpaceQuiz />} />
          <Route path="/asteroid-shooter" element={<AsteroidShooter />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
