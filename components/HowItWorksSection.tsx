// File: components/HowItWorksSection.tsx
"use client";

import React, { useEffect, useState, useRef } from 'react';
// Import your icon components here, for example:
import { Link, FileText, MessageSquare } from 'lucide-react';

// Define your steps data
const steps = [
  {
    title: "Paste YouTube URL",
    description: "Just copy and paste the URL of any educational YouTube video or lecture",
    icon: Link
  },
  {
    title: "Get AI Summary",
    description: "Our AI analyzes the video and creates concise notes with key points",
    icon: FileText
  },
  {
    title: "Ask Questions",
    description: "Chat with our AI about the video content to deepen your understanding",
    icon: MessageSquare
  }
];

export default function HowItWorksSection() {
  // State to track visibility
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([false, false, false]);
  
  // Refs for observed elements
  const titleRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    // Skip on server
    if (typeof window === 'undefined') return;
    
    const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        // Handle title visibility
        if (entry.target === titleRef.current) {
          setIsTitleVisible(true);
        }
        
        // Handle step visibility
        stepRefs.current.forEach((stepRef, index) => {
          if (entry.target === stepRef) {
            setVisibleSteps(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        });
        
        // Stop observing once visible
        observer.unobserve(entry.target);
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, { 
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px' // Trigger slightly before element is in view
    });
    
    // Observe title
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    
    // Observe steps
    stepRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => observer.disconnect();
  }, []);
  
  // Utility function for title class names
  const getTitleClasses = () => {
    const baseClasses = "max-w-6xl mx-auto transition-all duration-700 ease-out";
    return isTitleVisible 
      ? `${baseClasses}` 
      : `${baseClasses} opacity-0 translate-y-10`;
  };
  
  // Utility function for step class names
  const getStepClasses = (index: number) => {
    const baseClasses = "transition-all duration-700 ease-out";
    const delay = `delay-${index * 2}00`;
    
    return visibleSteps[index]
      ? `${baseClasses} ${delay}`
      : `${baseClasses} ${delay} opacity-0 translate-y-16`;
  };

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(rgba(37, 99, 235, 0.1) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={titleRef}
          className={getTitleClasses()}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-600">
            How Vid2Sum Works
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Three simple steps to transform any lecture video into concise study materials
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                ref={el => { stepRefs.current[index] = el; }}
                className={getStepClasses(index)}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
                  {/* Card top bar with color */}
                  <div className={`h-2 w-full ${
                    index === 0 ? "bg-blue-500" : 
                    index === 1 ? "bg-purple-500" : 
                    "bg-green-500"
                  }`}></div>
                  
                  {/* Content */}
                  <div className="p-8">
                    {/* Icon with scaling animation on hover */}
                    <div className={`
                      w-16 h-16 rounded-full mx-auto mb-6
                      ${index === 0 ? "bg-blue-100" : index === 1 ? "bg-purple-100" : "bg-green-100"}
                      flex items-center justify-center
                      transform group-hover:scale-110 transition-transform duration-300
                    `}>
                      <Icon className={`w-8 h-8 
                        ${index === 0 ? "text-blue-500" : index === 1 ? "text-purple-500" : "text-green-500"}
                      `} />
                    </div>
                    
                    {/* Step number */}
                    <div className="text-center mb-4">
                      <span className={`
                        inline-block px-3 py-1 rounded-full text-xs font-bold
                        ${index === 0 ? "bg-blue-100 text-blue-600" : 
                          index === 1 ? "bg-purple-100 text-purple-600" : 
                          "bg-green-100 text-green-600"
                        }
                      `}>
                        STEP {index + 1}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-gray-800 text-center">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-center">
                      {step.description}
                    </p>
                    
                    {/* Staggered card elements that appear on hover */}
                    <div className="mt-6 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      <div className={`h-1 ${index === 0 ? "bg-blue-100" : index === 1 ? "bg-purple-100" : "bg-green-100"} rounded w-2/3 mx-auto mb-2`}></div>
                      <div className="h-1 bg-gray-100 rounded w-full mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}