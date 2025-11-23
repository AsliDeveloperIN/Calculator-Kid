import React, { useState, useCallback } from 'react';
import { Star, Sparkles, Info } from 'lucide-react';
import GameButton from './GameButton';
import InfoModal from './InfoModal';

const CalculatorGame: React.FC = () => {
  const [display, setDisplay] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [shouldResetDisplay, setShouldResetDisplay] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  // Web Haptics helper
  const triggerHaptic = (pattern: number | number[] = 10) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  const handleNumberPress = useCallback((num: number) => {
    triggerHaptic(5);
    
    if (shouldResetDisplay) {
      setDisplay(num.toString());
      setShouldResetDisplay(false);
    } else {
      setDisplay(prev => prev === "0" ? num.toString() : prev + num);
    }
  }, [shouldResetDisplay]);

  const handleEquals = useCallback(() => {
    triggerHaptic([10, 30, 10]); 

    if (previousValue === null || operation === null) return;

    const current = parseFloat(display);
    let result: number | string;

    switch (operation) {
      case "+":
        result = previousValue + current;
        break;
      case "-":
        result = previousValue - current;
        break;
      case "×":
        result = previousValue * current;
        break;
      case "÷":
        result = current !== 0 ? previousValue / current : "Error";
        break;
      default:
        return;
    }

    if (result !== "Error") {
      // Limit decimals for display
      const formattedResult = typeof result === 'number' 
        ? Math.round(result * 1000000) / 1000000 
        : result;
        
      setScore(prev => prev + 10);
      setDisplay(formattedResult.toString());
    } else {
      setDisplay("Error");
    }

    setPreviousValue(null);
    setOperation(null);
    setShouldResetDisplay(true);
  }, [display, operation, previousValue]);

  const handleOperationPress = useCallback((op: string) => {
    triggerHaptic(10);

    if (previousValue !== null && operation !== null && !shouldResetDisplay) {
      handleEquals();
    } else {
        // If chaining operations without equals, update previous value
        setPreviousValue(parseFloat(display));
    }
    
    setOperation(op);
    setShouldResetDisplay(true);
    // If this is the first operation, set previous value from display
    if (previousValue === null) {
        setPreviousValue(parseFloat(display));
    }

  }, [display, operation, previousValue, shouldResetDisplay, handleEquals]);

  const handleClear = () => {
    triggerHaptic(15);
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setShouldResetDisplay(false);
  };

  const handleDecimal = () => {
    triggerHaptic(5);
    if (!display.includes(".")) {
      setDisplay(prev => prev + ".");
      setShouldResetDisplay(false);
    }
  };

  return (
    <div className="flex flex-col h-full font-nunito relative">
      {/* Info Button - Top Right */}
      <button
        onClick={() => {
          triggerHaptic(5);
          setShowInfoModal(true);
        }}
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-2.5 shadow-md border-2 border-[#FFD93D] hover:scale-105 transition-transform active:scale-95"
      >
        <Info size={24} color="#6B4423" />
      </button>

      {/* Info Modal */}
      <InfoModal 
        isOpen={showInfoModal} 
        onClose={() => setShowInfoModal(false)} 
      />

      {/* Header with Character and Score */}
      <div className="flex flex-col items-center mb-6 mt-8 shrink-0">
        <div className="bg-white rounded-[25px] p-3 shadow-lg border-[3px] border-[#FFD93D] mb-3 transform hover:rotate-6 transition-transform duration-300">
           {/* Character Image */}
           <img
              src="https://raw.createusercontent.com/3843a1d0-b507-4f25-a251-c1756ad94db9/"
              alt="Kid holding calculator"
              className="w-[50px] h-[50px] rounded-xl object-cover"
            />
        </div>

        <h1 className="text-2xl font-extrabold text-[#6B4423] drop-shadow-sm mb-2">
          Calculator Kid!
        </h1>

        <div className="flex items-center bg-white px-4 py-1.5 rounded-full border-2 border-[#FFD93D] shadow-sm">
          <Star size={18} className="text-[#FFD93D] fill-[#FFD93D] mr-2" />
          <span className="text-lg font-bold text-[#6B4423]">
            Score: {score}
          </span>
          <Sparkles size={18} className="text-[#FF6B9D] ml-2" />
        </div>
      </div>

      {/* Display Screen */}
      <div className="mx-2 mb-4 bg-white rounded-2xl p-4 h-24 flex flex-col justify-center items-end shadow-[0_4px_0_0_rgba(0,0,0,0.1)] border-4 border-[#6B4423] shrink-0">
        {operation && previousValue !== null && (
          <span className="text-sm text-gray-400 font-bold mb-1">
            {previousValue} {operation}
          </span>
        )}
        <div className="w-full overflow-hidden text-right">
             <span className="text-4xl font-extrabold text-[#6B4423] tracking-wider truncate block">
                {display}
             </span>
        </div>
      </div>

      {/* Keypad */}
      <div className="flex-1 px-2 pb-4 grid grid-cols-4 grid-rows-5 gap-2 min-h-0">
        {/* Row 1 */}
        <GameButton 
            label="CLEAR" 
            onClick={handleClear} 
            variant="danger" 
            className="col-span-3"
        />
        <GameButton label="÷" onClick={() => handleOperationPress('÷')} variant="operation" />

        {/* Row 2 */}
        <GameButton label="7" onClick={() => handleNumberPress(7)} variant="number" />
        <GameButton label="8" onClick={() => handleNumberPress(8)} variant="number" />
        <GameButton label="9" onClick={() => handleNumberPress(9)} variant="number" />
        <GameButton label="×" onClick={() => handleOperationPress('×')} variant="operation" />

        {/* Row 3 */}
        <GameButton label="4" onClick={() => handleNumberPress(4)} variant="number" />
        <GameButton label="5" onClick={() => handleNumberPress(5)} variant="number" />
        <GameButton label="6" onClick={() => handleNumberPress(6)} variant="number" />
        <GameButton label="-" onClick={() => handleOperationPress('-')} variant="operation" />

        {/* Row 4 */}
        <GameButton label="1" onClick={() => handleNumberPress(1)} variant="number" />
        <GameButton label="2" onClick={() => handleNumberPress(2)} variant="number" />
        <GameButton label="3" onClick={() => handleNumberPress(3)} variant="number" />
        <GameButton label="+" onClick={() => handleOperationPress('+')} variant="operation" />

        {/* Row 5 */}
        <GameButton label="0" onClick={() => handleNumberPress(0)} variant="number" className="col-span-2" />
        <GameButton label="." onClick={handleDecimal} variant="number" />
        <GameButton label="=" onClick={handleEquals} variant="equals" />
      </div>
    </div>
  );
};

export default CalculatorGame;