import React from 'react';

interface CalculatorDisplayProps {
  value: string;
  error: string | null;
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ value, error }) => {
  const displayText = error || value;
  
  return (
    <div className="w-full mb-6 glass-effect rounded-xl shadow-lg border border-white/20">
      <div className={`
        flex
        justify-end
        items-center
        h-20
        px-6
        font-mono
        text-right
        overflow-x-auto
        whitespace-nowrap
        ${error ? 'text-red-500' : 'text-gray-800'}
      `}>
        <span className="text-3xl font-semibold tracking-wider">{displayText}</span>
      </div>
    </div>
  );
};

export default CalculatorDisplay;