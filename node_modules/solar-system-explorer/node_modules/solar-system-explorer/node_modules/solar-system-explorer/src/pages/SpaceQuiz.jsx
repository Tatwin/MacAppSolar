import React, { useState, useEffect } from 'react';

const SpaceQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [quizStarted, setQuizStarted] = useState(false);
  
  const questions = [
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Mercury"],
      correctAnswer: 1
    },
    {
      question: "How many planets are in our solar system?",
      options: ["7", "8", "9", "10"],
      correctAnswer: 1
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Saturn", "Jupiter", "Neptune"],
      correctAnswer: 2
    },
    {
      question: "What is the name of Earth's natural satellite?",
      options: ["Sun", "Moon", "Europa", "Titan"],
      correctAnswer: 1
    },
    {
      question: "Which of these is NOT a planet?",
      options: ["Neptune", "Pluto", "Venus", "Saturn"],
      correctAnswer: 1
    },
    {
      question: "What is the hottest planet in our solar system?",
      options: ["Mercury", "Venus", "Mars", "Jupiter"],
      correctAnswer: 1
    },
    {
      question: "What is the name of the galaxy containing our solar system?",
      options: ["Andromeda", "Milky Way", "Triangulum", "Whirlpool"],
      correctAnswer: 1
    },
    {
      question: "Which planet has the most moons?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 3
    },
    {
      question: "What is the name of the force that keeps planets in orbit?",
      options: ["Magnetism", "Electricity", "Gravity", "Nuclear force"],
      correctAnswer: 2
    },
    {
      question: "Which planet is closest to the Sun?",
      options: ["Venus", "Earth", "Mars", "Mercury"],
      correctAnswer: 3
    }
  ];
  
  // Timer for each question
  useEffect(() => {
    if (!quizStarted || showScore || !answered === false) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAnswerClick(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentQuestion, quizStarted, showScore, answered]);
  
  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setAnswered(false);
    setTimeLeft(15);
  };
  
  const handleAnswerClick = (optionIndex) => {
    if (answered) return;
    
    setSelectedOption(optionIndex);
    setAnswered(true);
    
    // Check if answer is correct
    if (optionIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    // Move to next question after delay
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedOption(null);
        setAnswered(false);
        setTimeLeft(15);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };
  
  const getOptionClass = (index) => {
    if (!answered) {
      return selectedOption === index ? 'selected' : '';
    }
    
    if (index === questions[currentQuestion].correctAnswer) {
      return 'correct';
    }
    
    if (selectedOption === index && selectedOption !== questions[currentQuestion].correctAnswer) {
      return 'incorrect';
    }
    
    return '';
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Space Quiz</h1>
      
      <div className="max-w-md mx-auto bg-space-blue p-6 rounded-lg shadow-lg">
        {!quizStarted ? (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Test Your Space Knowledge!</h2>
            <p className="mb-6">
              This quiz has 10 questions about our solar system and space. 
              You have 15 seconds to answer each question.
            </p>
            <button 
              onClick={startQuiz}
              className="bg-space-accent text-white px-6 py-2 rounded hover:bg-opacity-80 transition"
            >
              Start Quiz
            </button>
          </div>
        ) : showScore ? (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-3xl font-bold mb-6">
              Your Score: {score} / {questions.length}
            </p>
            
            {score === questions.length && (
              <div className="mb-6">
                <p className="text-green-400 font-bold">Perfect Score! You're a space expert! 🚀</p>
              </div>
            )}
            
            {score >= questions.length / 2 && score < questions.length && (
              <div className="mb-6">
                <p className="text-yellow-400 font-bold">Good job! You know your space facts! 🌟</p>
              </div>
            )}
            
            {score < questions.length / 2 && (
              <div className="mb-6">
                <p className="text-space-accent font-bold">Keep learning about space! 🔭</p>
              </div>
            )}
            
            <button 
              onClick={startQuiz}
              className="bg-space-accent text-white px-6 py-2 rounded hover:bg-opacity-80 transition"
            >
              Play Again
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-sm">Question {currentQuestion + 1}/{questions.length}</span>
              </div>
              <div className="bg-space-dark px-3 py-1 rounded-full">
                <span className={`text-sm ${timeLeft <= 5 ? 'text-red-400' : 'text-white'}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">{questions[currentQuestion].question}</h2>
              
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <div 
                    key={index}
                    className={`quiz-option p-3 border border-gray-600 rounded cursor-pointer hover:bg-space-dark ${getOptionClass(index)}`}
                    onClick={() => handleAnswerClick(index)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            
            {answered && (
              <div className="text-center">
                {selectedOption === questions[currentQuestion].correctAnswer ? (
                  <p className="text-green-400">Correct! 👍</p>
                ) : (
                  <p className="text-red-400">
                    Wrong! The correct answer is: {questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="max-w-md mx-auto mt-8">
        <h3 className="text-xl font-bold mb-2">Quiz Rules</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>You have 15 seconds to answer each question</li>
          <li>There are 10 questions about space</li>
          <li>You can't change your answer once selected</li>
          <li>If time runs out, the question is marked as incorrect</li>
          <li>Try to get all 10 questions right!</li>
        </ul>
      </div>
    </div>
  );
};

export default SpaceQuiz;
