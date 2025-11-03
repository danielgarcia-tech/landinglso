import React from 'react';

const LiquidEther: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute bottom-0 left-0 w-full h-96"
        viewBox="0 0 1200 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#1d4ed8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          d="M0,320 Q300,280 600,320 T1200,320 L1200,400 L0,400 Z"
          fill="url(#liquidGradient)"
          className="animate-wave"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 50,0; 0,0"
            dur="10s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M0,350 Q300,310 600,350 T1200,350 L1200,400 L0,400 Z"
          fill="url(#liquidGradient)"
          opacity="0.7"
          className="animate-wave-delayed"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; -50,0; 0,0"
            dur="12s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
};

export default LiquidEther;