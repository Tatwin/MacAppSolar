import React, { useState, useEffect, useCallback } from 'react';

const MarsRover = () => {
  const gridSize = 10;
  const [roverPosition, setRoverPosition] = useState({ x: 0, y: 0 });
  const [goalPosition, setGoalPosition] = useState({ x: 9, y: 9 });
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(1);
  
  // Generate random obstacles
  const generateObstacles = useCallback(() => {
    const newObstacles = [];
    const numObstacles = 10 + (level * 2); // More obstacles for higher levels
    
    for (let i = 0; i < numObstacles; i++) {
      let x, y;
      let validPosition = false;
      
      while (!validPosition) {
        x = Math.floor(Math.random() * gridSize);
        y = Math.floor(Math.random() * gridSize);
        
        // Make sure obstacle is not at rover start or goal position
        if ((x !== 0 || y !== 0) && (x !== goalPosition.x || y !== goalPosition.y)) {
          validPosition = true;
          
          // Check if position already has an obstacle
          for (const obstacle of newObstacles) {
            if (obstacle.x === x && obstacle.y === y) {
              validPosition = false;
              break;
            }
          }
        }
      }
      
      newObstacles.push({ x, y });
    }
    
    setObstacles(newObstacles);
  }, [goalPosition, level]);
  
  const startGame = () => {
    setRoverPosition({ x: 0, y: 0 });
    setGoalPosition({ x: 9, y: 9 });
    setScore(0);
    setGameWon(false);
    generateObstacles();
    setGameStarted(true);
  };
  
  const nextLevel = () => {
    setLevel(prev => prev + 1);
    setRoverPosition({ x: 0, y: 0 });
    setScore(0);
    setGameWon(false);
    generateObstacles();
  };
  
  const moveRover = useCallback((dx, dy) => {
    if (!gameStarted || gameWon) return;
    
    const newX = roverPosition.x + dx;
    const newY = roverPosition.y + dy;
    
    // Check if move is valid (within grid and not hitting obstacle)
    if (
      newX >= 0 && newX < gridSize && 
      newY >= 0 && newY < gridSize &&
      !obstacles.some(obs => obs.x === newX && obs.y === newY)
    ) {
      setRoverPosition({ x: newX, y: newY });
      setScore(prevScore => prevScore + 1);
      
      // Check if rover reached the goal
      if (newX === goalPosition.x && newY === goalPosition.y) {
        setGameWon(true);
      }
    }
  }, [roverPosition, obstacles, goalPosition, gameStarted, gameWon, gridSize]);
  
  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          moveRover(0, -1);
          break;
        case 'ArrowDown':
          moveRover(0, 1);
          break;
        case 'ArrowLeft':
          moveRover(-1, 0);
          break;
        case 'ArrowRight':
          moveRover(1, 0);
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveRover]);
  
  // Create grid cells
  const renderGrid = () => {
    const grid = [];
    
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const isRover = roverPosition.x === x && roverPosition.y === y;
        const isGoal = goalPosition.x === x && goalPosition.y === y;
        const isObstacle = obstacles.some(obs => obs.x === x && obs.y === y);
        
        let cellClass = "grid-cell";
        if (isObstacle) cellClass += " obstacle";
        if (isGoal) cellClass += " goal";
        
        grid.push(
          <div key={`${x}-${y}`} className={cellClass}>
            {isRover && (
              <div className="flex items-center justify-center h-full">
                <i className="bi bi-truck text-yellow-400"></i>
              </div>
            )}
            {isGoal && !isRover && (
              <div className="flex items-center justify-center h-full">
                <i className="bi bi-flag text-green-400"></i>
              </div>
            )}
          </div>
        );
      }
    }
    
    return grid;
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Mars Rover Game</h1>
      
      <div className="max-w-md mx-auto bg-space-blue p-6 rounded-lg shadow-lg mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Mission Control - Level {level}</h2>
          <p className="mb-4">
            Navigate your rover through the Martian terrain to reach the goal. 
            Use the arrow keys to move. Avoid obstacles!
          </p>
          
          {!gameStarted ? (
            <button 
              onClick={startGame}
              className="w-full bg-space-accent text-white py-2 rounded hover:bg-opacity-80 transition"
            >
              Start Mission
            </button>
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">Moves: {score}</p>
              </div>
              <button 
                onClick={startGame}
                className="bg-space-accent text-white px-4 py-1 rounded hover:bg-opacity-80 transition text-sm"
              >
                Restart
              </button>
            </div>
          )}
        </div>
        
        {gameStarted && (
          <>
            <div className="mars-grid mb-4">
              {renderGrid()}
            </div>
            
            {gameWon && (
              <div className="bg-green-900 bg-opacity-50 p-4 rounded text-center">
                <h3 className="text-xl font-bold mb-2">Mission Accomplished!</h3>
                <p>You reached the goal in {score} moves.</p>
                <div className="mt-4 flex space-x-2">
                  <button 
                    onClick={startGame}
                    className="flex-1 bg-space-accent text-white px-4 py-2 rounded hover:bg-opacity-80 transition"
                  >
                    Retry Level
                  </button>
                  <button 
                    onClick={nextLevel}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-opacity-80 transition"
                  >
                    Next Level
                  </button>
                </div>
              </div>
            )}
            
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div></div>
              <button 
                onClick={() => moveRover(0, -1)}
                className="bg-gray-700 p-2 rounded text-center"
              >
                <i className="bi bi-arrow-up"></i>
              </button>
              <div></div>
              
              <button 
                onClick={() => moveRover(-1, 0)}
                className="bg-gray-700 p-2 rounded text-center"
              >
                <i className="bi bi-arrow-left"></i>
              </button>
              <button 
                onClick={() => moveRover(0, 1)}
                className="bg-gray-700 p-2 rounded text-center"
              >
                <i className="bi bi-arrow-down"></i>
              </button>
              <button 
                onClick={() => moveRover(1, 0)}
                className="bg-gray-700 p-2 rounded text-center"
              >
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </>
        )}
      </div>
      
      <div className="max-w-md mx-auto">
        <h3 className="text-xl font-bold mb-2">How to Play</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Use arrow keys or the on-screen buttons to move the rover</li>
          <li>Reach the green flag to complete the mission</li>
          <li>Avoid gray obstacles</li>
          <li>Try to reach the goal in as few moves as possible</li>
          <li>Each level adds more obstacles!</li>
        </ul>
      </div>
    </div>
  );
};

export default MarsRover;
