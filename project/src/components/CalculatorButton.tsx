import React from 'react';

interface CalculatorButtonProps {
  value: string;
  onClick: () => void;
  span?: number;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ value, onClick, span = 1 }) => {
  const isOperator = ['+', '-', '*', '/', '='].includes(value);
  const isClear = value === 'C';
  
  const getButtonStyle = () => {
    if (isOperator) {
      return "bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700";
    } else if (isClear) {
      return "bg-gradient-to-br from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700";
    } else {
      return "bg-white/80 text-gray-800 hover:bg-white";
    }
  };
  
  return (
    <button
      className={`
        ${getButtonStyle()}
        col-span-${span}
        h-14
        rounded-xl
        shadow-lg
        font-medium
        text-xl
        transition-all
        duration-150
        button-press
        backdrop-blur-sm
        border
        border-white/10
        focus:outline-none
        focus:ring-2
        focus:ring-blue-400
        focus:ring-opacity-50
        flex
        items-center
        justify-center
      `}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default CalculatorButton;