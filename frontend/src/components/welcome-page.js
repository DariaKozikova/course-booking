import React from 'react';

export default function WelcomePage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-5 font-inter relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)", 
      }}
    >

      <div
        className="absolute w-96 h-96 rounded-full transform -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)",
          filter: "blur(80px)",
          top: "20%",
          left: "50%",
          animation: "glow 6s ease-in-out infinite",
          zIndex: 1,
        }}
      ></div>

      {/* Заголовок */}
      <h1
        className="text-white text-6xl sm:text-7xl lg:text-8xl font-semibold text-center 
                   leading-tight tracking-tight px-5 drop-shadow-2xl z-20"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          textShadow: "0 4px 20px rgba(0,0,0,0.6)",
          animation: "fadeIn 2s ease-in-out",
        }}
      >
        Welcome to Our Restaurant
      </h1>
      
      {/* Анімаційні стилі */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes glow {
            0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
          }
        `}
      </style>
    </div>
  );
}
