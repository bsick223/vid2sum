import React, { useState } from 'react';

const QuestionMarkTooltip = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div 
        className="cursor-pointer text-gray-500 hover:text-gray-700 ml-2"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </div>
      
      {isTooltipVisible && (
        <div 
          className="absolute z-10 p-2 bg-black text-white text-xs rounded shadow-lg -top-10 left-1/2 transform -translate-x-1/2"
        >
          For new users: please refresh
          <div 
            className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-black"
          ></div>
        </div>
      )}
    </div>
  );
};

export default QuestionMarkTooltip;