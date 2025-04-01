import React, { useState, useRef, useEffect } from 'react';

const AskAstro = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi there! I'm Astro, your space assistant. What would you like to know about space?", 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Predefined responses
  const responses = {
    'sun': "The Sun is the star at the center of our Solar System. It's about 4.6 billion years old and is made mostly of hydrogen and helium.",
    'moon': "The Moon is Earth's only natural satellite. It's about 1/4 the diameter of Earth and is the fifth largest satellite in the Solar System.",
    'mars': "Mars is the fourth planet from the Sun. It's often called the 'Red Planet' because of its reddish appearance, which is due to iron oxide (rust) on its surface.",
    'jupiter': "Jupiter is the fifth planet from the Sun and the largest in our Solar System. It's a gas giant with a mass more than two and a half times that of all the other planets combined.",
    'saturn': "Saturn is the sixth planet from the Sun and is famous for its spectacular ring system. It's a gas giant like Jupiter.",
    'black hole': "A black hole is a region of spacetime where gravity is so strong that nothing—no particles or even electromagnetic radiation such as light—can escape from it.",
    'galaxy': "A galaxy is a huge collection of gas, dust, and billions of stars and their solar systems, all held together by gravity.",
    'milky way': "The Milky Way is the galaxy that contains our Solar System. It's a spiral galaxy with a diameter between 150,000 and 200,000 light-years.",
    'astronaut': "An astronaut is a person trained by a human spaceflight program to command, pilot, or serve as a crew member of a spacecraft.",
    'rocket': "A rocket is a vehicle that uses rocket engines to push it forward. Rockets are used to launch spacecraft and satellites into space.",
    'space station': "A space station is a large spacecraft in orbit around Earth that can house astronauts for extended periods. The International Space Station (ISS) is currently the only operational space station.",
    'asteroid': "Asteroids are rocky objects that orbit the Sun, too small to be considered planets. Most are found in the asteroid belt between Mars and Jupiter.",
    'comet': "Comets are icy bodies in the solar system that release gas or dust. When they get close to the Sun, they warm up and begin to release gases, which produces the visible coma and tail.",
    'planet': "A planet is a celestial body that orbits a star, is massive enough for its own gravity to make it round, and has 'cleared the neighborhood' around its orbit.",
    'star': "A star is a luminous sphere of plasma held together by its own gravity. The nearest star to Earth is the Sun.",
    'telescope': "A telescope is an optical instrument that makes distant objects appear magnified by using an arrangement of lenses or curved mirrors and lenses.",
    'nasa': "NASA (National Aeronautics and Space Administration) is the U.S. government agency responsible for the civilian space program, as well as aeronautics and space research.",
    'esa': "ESA (European Space Agency) is an intergovernmental organization dedicated to the exploration of space, with 22 member states.",
    'spacex': "SpaceX is an American aerospace manufacturer and space transportation services company founded by Elon Musk. It's known for developing the Falcon 9 rocket and Dragon spacecraft.",
    'hello': "Hello there! What space topic would you like to learn about today?",
    'hi': "Hi! I'm Astro. Ask me anything about space!",
    'help': "I can answer questions about planets, stars, galaxies, astronauts, space agencies, and more. Just ask!"
  };
  
  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot thinking
    setTimeout(() => {
      // Generate response
      let botResponse = "I'm not sure about that. Try asking about planets, stars, galaxies, or space exploration!";
      
      // Check for keywords in user input
      const userInput = input.toLowerCase();
      for (const [keyword, response] of Object.entries(responses)) {
        if (userInput.includes(keyword)) {
          botResponse = response;
          break;
        }
      }
      
      // Add bot message
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Ask Astro</h1>
      
      <div className="max-w-md mx-auto bg-space-blue rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-space-purple flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
            <i className="bi bi-robot text-white"></i>
          </div>
          <div>
            <h2 className="font-bold">Astro</h2>
            <p className="text-xs text-gray-300">Space Knowledge Assistant</p>
          </div>
        </div>
        
        <div className="h-96 overflow-y-auto p-4 bg-space-dark">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-space-accent text-white rounded-br-none' 
                    : 'bg-gray-700 text-white rounded-bl-none'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-700 text-white p-3 rounded-lg rounded-bl-none max-w-xs">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-gray-700">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask something about space..."
              className="flex-grow bg-gray-700 text-white p-2 rounded-l-lg focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-space-accent text-white px-4 rounded-r-lg"
            >
              <i className="bi bi-send"></i>
            </button>
          </div>
          
          <div className="mt-2 text-xs text-gray-400">
            Try asking about: planets, stars, black holes, NASA, astronauts...
          </div>
        </div>
      </div>
      
      <div className="max-w-md mx-auto mt-8">
        <h3 className="text-xl font-bold mb-2">Popular Questions</h3>
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => {
              setInput("What is a black hole?");
              setTimeout(handleSendMessage, 100);
            }}
            className="bg-space-blue p-2 rounded text-sm hover:bg-opacity-80 transition"
          >
            What is a black hole?
          </button>
          <button 
            onClick={() => {
              setInput("Tell me about Mars");
              setTimeout(handleSendMessage, 100);
            }}
            className="bg-space-blue p-2 rounded text-sm hover:bg-opacity-80 transition"
          >
            Tell me about Mars
          </button>
          <button 
            onClick={() => {
              setInput("What is NASA?");
              setTimeout(handleSendMessage, 100);
            }}
            className="bg-space-blue p-2 rounded text-sm hover:bg-opacity-80 transition"
          >
            What is NASA?
          </button>
          <button 
            onClick={() => {
              setInput("How many planets are there?");
              setTimeout(handleSendMessage, 100);
            }}
            className="bg-space-blue p-2 rounded text-sm hover:bg-opacity-80 transition"
          >
            How many planets are there?
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskAstro;
