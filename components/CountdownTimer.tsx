"use client";

import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Explicitly create the target date
    const targetDate = new Date('2025-03-06T00:00:00');
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ 
          days, 
          hours, 
          minutes, 
          seconds 
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Initial call
    updateCountdown();
    
    // Set up interval
    const timer = setInterval(updateCountdown, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, []);

    return (
    <div className="container mx-auto px-4 max-w-6xl mb-20">
      <div className="bg-gradient-to-r from-orange-300 to-red-600 p-6 rounded-xl text-white text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Free Trial Ending Soon!</h2>
        <div className="flex justify-center space-x-4">
          <div className="bg-orange-600 bg-opacity-50 p-4 rounded-lg">
            <span className="text-3xl font-bold block">{timeLeft.days}</span>
            <span className="text-sm">Days</span>
          </div>
          <div className="bg-orange-600 bg-opacity-50 p-4 rounded-lg">
            <span className="text-3xl font-bold block">{timeLeft.hours}</span>
            <span className="text-sm">Hours</span>
          </div>
          <div className="bg-orange-600 bg-opacity-50 p-4 rounded-lg">
            <span className="text-3xl font-bold block">{timeLeft.minutes}</span>
            <span className="text-sm">Minutes</span>
          </div>
          <div className="bg-orange-600 bg-opacity-50 p-4 rounded-lg">
            <span className="text-3xl font-bold block">{timeLeft.seconds}</span>
            <span className="text-sm">Seconds</span>
          </div>
        </div>
        <p className="mt-4 text-sm">Hurry! Free trial closes March 5th at midnight</p>
      </div>
    </div>
  );
};

export default CountdownTimer;