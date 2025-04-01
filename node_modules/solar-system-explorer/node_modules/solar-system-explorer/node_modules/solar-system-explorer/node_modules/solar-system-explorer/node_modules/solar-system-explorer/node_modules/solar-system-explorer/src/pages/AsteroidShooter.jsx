import React, { useState, useEffect, useRef } from 'react';

const AsteroidShooter = () => {
  const gameAreaRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [spaceshipPosition, setSpaceshipPosition] = useState(50);
  const [asteroids, setAsteroids] = useState([]);
  const [lasers, setLasers] = useState([]);
  const [level, setLevel] = useState(1);
  
  // Game dimensions
  const gameWidth = 300;
  const gameHeight = 400;
  const spaceshipWidth = 40;
  const asteroidSize = 20;
  const laserWidth = 2;
  const laserHeight = 15;
  
  // Start game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setAsteroids([]);
    setLasers([]);
    setLevel(1);
  };
  
  // Handle keyboard and touch controls
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setSpaceshipPosition(prev => Math.max(0, prev - 10));
      } else if (e.key === 'ArrowRight') {
        setSpaceshipPosition(prev => Math.min(100, prev + 10));
      } else if (e.key === ' ' || e.key === 'ArrowUp') {
        // Fire laser
        const newLaser = {
          id: Date.now(),
          x: spaceshipPosition,
          y: 90
        };
        setLasers(prev => [...prev, newLaser]);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, gameOver, spaceshipPosition]);
  
  // Move spaceship with mouse/touch
  const handleMouseMove = (e) => {
    if (!gameStarted || gameOver) return;
    
    const gameArea = gameAreaRef.current;
    if (!gameArea) return;
    
    const rect = gameArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    setSpaceshipPosition(Math.min(Math.max(percentage, 0), 100));
  };
  
  // Fire laser on click/tap
  const handleClick = () => {
    if (!gameStarted || gameOver) return;
    
    const newLaser = {
      id: Date.now(),
      x: spaceshipPosition,
      y: 90
    };
    setLasers(prev => [...prev, newLaser]);
  };
  
  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const gameLoop = setInterval(() => {
      // Move lasers
      setLasers(prev => {
        return prev
          .map(laser => ({
            ...laser,
            y: laser.y - 2
          }))
          .filter(laser => laser.y > 0);
      });
      
      // Move asteroids
      setAsteroids(prev => {
        return prev
          .map(asteroid => ({
            ...asteroid,
            y: asteroid.y + asteroid.speed
          }))
          .filter(asteroid => asteroid.y < 100);
      });
      
      // Check for collisions
      setAsteroids(prev => {
        const updatedAsteroids = [...prev];
        
        // Check laser hits
        setLasers(prevLasers => {
          const updatedLasers = [...prevLasers];
          
          for (let i = updatedAsteroids.length - 1; i >= 0; i--) {
            const asteroid = updatedAsteroids[i];
            
            for (let j = updatedLasers.length - 1; j >= 0; j--) {
              const laser = updatedLasers[j];
              
              // Check if laser hit asteroid
              if (
                Math.abs(laser.x - asteroid.x) < 5 &&
                Math.abs(laser.y - asteroid.y) < 5
              ) {
                // Remove asteroid and laser
                updatedAsteroids.splice(i, 1);
                updatedLasers.splice(j, 1);
                
                // Increase score
                setScore(prev => {
                  const newScore = prev + 10;
                  
                  // Level up every 100 points
                  if (newScore % 100 === 0) {
                    setLevel(prevLevel => prevLevel + 1);
                  }
                  
                  return newScore;
                });
                
                break;
              }
            }
          }
          
          return updatedLasers;
        });
        
        // Check if asteroid hit spaceship
        for (const asteroid of updatedAsteroids) {
          if (
            asteroid.y > 85 &&
            Math.abs(asteroid.x - spaceshipPosition) < 5
          ) {
            setGameOver(true);
            setHighScore(prev => Math.max(prev, score));
            clearInterval(gameLoop);
            break;
          }
        }
        
        return updatedAsteroids;
      });
      
      // Spawn new asteroids
      if (Math.random() < 0.05 + (level * 0.01)) {
        const newAsteroid = {
          id: Date.now(),
          x: Math.random() * 100,
          y: 0,
          speed: 0.5 + (Math.random() * 0.5) + (level * 0.1)
        };
        setAsteroids(prev => [...prev, newAsteroid]);
      }
    }, 50);
    
    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, spaceshipPosition, score, level]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Asteroid Shooter</h1>
      
      <div className="max-w-md mx-auto">
        <div 
          ref={gameAreaRef}
          className="relative bg-space-dark border-2 border-space-blue rounded-lg overflow-hidden mx-auto"
          style={{ width: gameWidth, height: gameHeight }}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        >
          {!gameStarted ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 p-4">
              <h2 className="text-2xl font-bold mb-4">Asteroid Shooter</h2>
              <p className="text-center mb-6">
                Defend Earth from incoming asteroids! Use arrow keys or mouse to move, space or click to shoot.
              </p>
              <button 
                onClick={startGame}
                className="bg-space-accent text-white px-6 py-2 rounded hover:bg-opacity-80 transition"
              >
                Start Game
              </button>
            </div>
          ) : gameOver ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 p-4">
              <h2 className="text-2xl font-bold mb-2">Game Over</h2>
              <p className="text-xl mb-1">Score: {score}</p>
              <p className="text-sm mb-4">High Score: {highScore}</p>
              <button 
                onClick={startGame}
                className="bg-space-accent text-white px-6 py-2 rounded hover:bg-opacity-80 transition"
              >
                Play Again
              </button>
            </div>
          ) : (
            <>
              {/* Score display */}
              <div className="absolute top-2 left-2 text-sm">
                <p>Score: {score}</p>
                <p>Level: {level}</p>
              </div>
              
              {/* Spaceship */}
              <div 
                className="spaceship absolute bottom-0"
                style={{ 
                  left: `calc(${spaceshipPosition}% - ${spaceshipWidth/2}px)`,
                  width: spaceshipWidth,
                  height: 40
                }}
              >
                <i className="bi bi-rocket-takeoff text-white text-3xl"></i>
              </div>
              
              {/* Lasers */}
              {lasers.map(laser => (
                <div 
                  key={laser.id}
                  className="laser absolute"
                  style={{ 
                    left: `calc(${laser.x}% - ${laserWidth/2}px)`,
                    bottom: `${100 - laser.y}%`,
                    width: laserWidth,
                    height: laserHeight
                  }}
                ></div>
              ))}
              
              {/* Asteroids */}
              {asteroids.map(asteroid => (
                <div 
                  key={asteroid.id}
                  className="asteroid"
                  style={{ 
                    left: `calc(${asteroid.x}% - ${asteroidSize/2}px)`,
                    top: `${asteroid.y}%`
                  }}
                >
                  <i className="bi bi-asterisk text-gray-400"></i>
                </div>
              ))}
            </>
          )}
        </div>
        
        {/* Mobile controls */}
        {gameStarted && !gameOver && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            <button 
              onClick={() => setSpaceshipPosition(prev => Math.max(0, prev - 10))}
              className="bg-gray-700 p-2 rounded text-center"
            >
              <i className="bi bi-arrow-left"></i>
            </button>
            <button 
              onClick={handleClick}
              className="bg-space-accent p-2 rounded text-center"
            >
              <i className="bi bi-arrow-up"></i>
            </button>
            <button 
              onClick={() => setSpaceshipPosition(prev => Math.min(100, prev + 10))}
              className="bg-gray-700 p-2 rounded text-center"
            >
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        )}
        
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">How to Play</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use left/right arrow keys or mouse to move your spaceship</li>
            <li>Press space or click to shoot lasers</li>
            <li>Destroy asteroids before they hit your ship</li>
            <li>Each asteroid destroyed gives you 10 points</li>
            <li>The game gets harder as your level increases</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AsteroidShooter;
