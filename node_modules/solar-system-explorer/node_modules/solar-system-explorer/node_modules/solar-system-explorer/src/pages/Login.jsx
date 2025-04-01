import React, { useState } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!username || !password || (!isLogin && !email)) {
      setError('Please fill in all fields');
      setSuccess('');
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setError('');
      if (isLogin) {
        setSuccess('Login successful! Welcome back, ' + username);
      } else {
        setSuccess('Account created successfully! Welcome, ' + username);
      }
      
      // Reset form
      setUsername('');
      setPassword('');
      setEmail('');
    }, 1000);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h1>
        
        <div className="bg-space-blue p-6 rounded-lg shadow-lg">
          <div className="flex mb-6">
            <button
              className={`flex-1 py-2 ${isLogin ? 'bg-space-accent text-white' : 'bg-gray-700 text-gray-300'} rounded-l`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 ${!isLogin ? 'bg-space-accent text-white' : 'bg-gray-700 text-gray-300'} rounded-r`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>
          
          {error && (
            <div className="bg-red-900 bg-opacity-50 text-white p-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-900 bg-opacity-50 text-white p-3 rounded mb-4">
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-space-accent"
              />
            </div>
            
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-space-accent"
                />
              </div>
            )}
            
            <div className="mb-6">
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-space-accent"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-space-accent text-white py-2 rounded hover:bg-opacity-80 transition"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>
          
          {isLogin && (
            <div className="mt-4 text-center">
              <a href="#" className="text-space-accent hover:underline text-sm">
                Forgot password?
              </a>
            </div>
          )}
        </div>
        
        <div className="mt-8 bg-space-blue p-4 rounded-lg">
          <h3 className="font-bold mb-2">Why Join Us?</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Track your Mars Rover game scores</li>
            <li>Save your favorite planet information</li>
            <li>Participate in space quizzes</li>
            <li>Get updates on space news</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
