import React from 'react';

type ButtonVariant = 'number' | 'operation' | 'danger' | 'equals';

interface GameButtonProps {
  label: string | React.ReactNode;
  onClick: () => void;
  variant: ButtonVariant;
  className?: string;
}

const GameButton: React.FC<GameButtonProps> = ({ label, onClick, variant, className = '' }) => {
  let baseStyles = "relative flex items-center justify-center rounded-2xl shadow-[0_4px_0_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[4px] transition-all duration-100 border-[3px] select-none touch-manipulation";
  let colorStyles = "";
  let textStyles = "text-2xl font-extrabold";

  switch (variant) {
    case 'number':
      colorStyles = "bg-[#FFD93D] border-[#FFC700]";
      textStyles += " text-[#6B4423]";
      break;
    case 'operation':
      colorStyles = "bg-[#FF6B9D] border-[#FF4081]";
      textStyles += " text-white";
      break;
    case 'danger':
      colorStyles = "bg-[#FF6B6B] border-[#FF4444]";
      textStyles += " text-white text-xl"; // Slightly smaller for CLEAR text
      break;
    case 'equals':
      colorStyles = "bg-[#4ECDC4] border-[#00D9FF]";
      textStyles += " text-white";
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${colorStyles} ${className}`}
      type="button"
    >
      <span className={textStyles}>{label}</span>
    </button>
  );
};

export default GameButton;