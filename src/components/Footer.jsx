import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-space-blue p-4 text-center text-white mt-8">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Space Explorer | 
        </p>
      
      </div>
    </footer>
  );
};

export default Footer;
