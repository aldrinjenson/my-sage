import React from "react";

const LandingHeader = () => {
  return (
    <header className='bg-gradient-to-r from-indigo-600 to-purple-500 py-12'>
      <div className='container mx-auto px-4'>
        <div className='flex'>
          <div>
            <h1 className='text-4xl text-white font-bold mb-4'>
              MySage: Your Intelligent Chatbot Assistant
            </h1>
            <h2 className='text-lg text-white mb-6'>
              Transform your website with a powerful, customizable chatbot
            </h2>
            <a
              href='/dashboard' // Replace with the appropriate link or route
              className='inline-block bg-white text-indigo-600 font-semibold text-lg px-8 py-3 rounded-full shadow-lg hover:bg-indigo-700 hover:text-white transition-colors duration-300'
            >
              Get Started
            </a>
          </div>
          <div className='flex justify-center mb-8'>
            <img
              src='/chatbot-animation.gif' // Replace with the path to your image or animation
              alt='Chatbot Animation'
              className='max-w-full h-auto'
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
