import React from 'react';
import CalculatorGame from './components/CalculatorGame';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#8FD3B8] font-nunito">
      <div className="w-full max-w-md h-[90vh] max-h-[900px] flex flex-col bg-[#A8E6CF] relative overflow-hidden rounded-[40px] shadow-2xl ring-8 ring-white/30">
        
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: "url('https://raw.createusercontent.com/3843a1d0-b507-4f25-a251-c1756ad94db9/')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Application Content */}
        <div className="relative z-10 w-full h-full">
          <CalculatorGame />
        </div>
      </div>
    </div>
  );
};

export default App;