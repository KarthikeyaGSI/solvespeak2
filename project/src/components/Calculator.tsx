import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Trash2, Clock, X } from 'lucide-react';
import CalculatorButton from './CalculatorButton';
import CalculatorDisplay from './CalculatorDisplay';
import HistoryPanel from './HistoryPanel';

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [currentCalculation, setCurrentCalculation] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [spokenText, setSpokenText] = useState<string | null>(null);
  
  const recognition = useRef<SpeechRecognition | null>(null);
  
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';
      
      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setSpokenText(`"${transcript}"`);
        handleVoiceInput(transcript);
        
        setTimeout(() => {
          setSpokenText(null);
        }, 3000);
      };
      
      recognition.current.onerror = () => {
        setIsListening(false);
        setError('Voice recognition failed. Please try again.');
        setTimeout(() => setError(null), 3000);
      };
      
      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognition.current) {
        recognition.current.abort();
      }
    };
  }, []);
  
  const toggleListening = () => {
    if (!recognition.current) {
      setError('Speech recognition is not supported in your browser.');
      return;
    }
    
    if (isListening) {
      recognition.current.abort();
      setIsListening(false);
    } else {
      try {
        recognition.current.start();
        setIsListening(true);
        setError(null);
      } catch (error) {
        setError('Failed to start voice recognition.');
      }
    }
  };
  
  const handleVoiceInput = (transcript: string) => {
    let processedInput = transcript
      .replace('plus', '+')
      .replace('minus', '-')
      .replace('times', '*')
      .replace('multiplied by', '*')
      .replace('divided by', '/')
      .replace('equals', '=')
      .replace('equal', '=')
      .replace('x', '*')
      .replace('add', '+')
      .replace('subtract', '-')
      .replace('multiply', '*')
      .replace('divide', '/')
      .replace(/\s/g, '');
    
    if (processedInput.includes('=')) {
      processedInput = processedInput.split('=')[0];
      calculateResult(processedInput);
    } else {
      setCurrentCalculation(processedInput);
      setDisplayValue(processedInput);
    }
  };
  
  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setDisplayValue('0');
      setCurrentCalculation('');
    } else if (value === '=') {
      calculateResult(currentCalculation);
    } else {
      const newCalculation = currentCalculation === '' && '+-*/'.includes(value) 
        ? displayValue + value 
        : currentCalculation + value;
      
      setCurrentCalculation(newCalculation);
      setDisplayValue(newCalculation);
    }
  };
  
  const calculateResult = (expression: string) => {
    if (!expression) return;
    
    try {
      const sanitizedExpression = expression.replace(/[^0-9+\-*/().]/g, '');
      const result = eval(sanitizedExpression).toString();
      const calculationText = `${sanitizedExpression} = ${result}`;
      
      setDisplayValue(result);
      setCurrentCalculation('');
      setHistory(prev => [calculationText, ...prev]);
    } catch (error) {
      setError('Invalid expression. Please try again.');
      setTimeout(() => setError(null), 3000);
    }
  };
  
  const clearHistory = () => {
    setHistory([]);
  };
  
  const keypad = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
    ['C']
  ];
  
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
      {spokenText && (
        <div className="w-full mb-4 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-medium animate-fade-in-out">
            You said: {spokenText}
          </span>
        </div>
      )}
      
      <CalculatorDisplay 
        value={displayValue} 
        error={error}
      />
      
      <div className="flex justify-between items-center w-full px-4 mb-6">
        <button 
          onClick={toggleListening}
          className={`
            relative flex items-center justify-center w-14 h-14 rounded-2xl
            ${isListening 
              ? 'bg-gradient-to-br from-red-500 to-red-600 animate-pulse' 
              : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
            }
            text-white transition-all duration-300 focus:outline-none
            shadow-lg button-press border border-white/10
          `}
          aria-label={isListening ? "Stop listening" : "Start listening"}
        >
          {isListening ? 
            <Mic className="w-6 h-6" /> : 
            <MicOff className="w-6 h-6" />
          }
          {isListening && (
            <span className="absolute -inset-1 rounded-2xl border-2 border-red-400 animate-ping opacity-75"></span>
          )}
        </button>
        
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center justify-center w-14 h-14 rounded-2xl
              glass-effect text-gray-700 hover:bg-white/30 transition-colors
              focus:outline-none shadow-lg button-press border border-white/10"
            aria-label="Show history"
          >
            <Clock className="w-6 h-6" />
          </button>
          
          <button 
            onClick={clearHistory}
            className="flex items-center justify-center w-14 h-14 rounded-2xl
              glass-effect text-gray-700 hover:bg-white/30 transition-colors
              focus:outline-none shadow-lg button-press border border-white/10"
            disabled={history.length === 0}
            aria-label="Clear history"
          >
            <Trash2 className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4 w-full p-6 glass-effect rounded-2xl shadow-lg border border-white/10">
        {keypad.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {row.map((button) => (
              <CalculatorButton 
                key={button} 
                value={button} 
                onClick={() => handleButtonClick(button)}
                span={button === 'C' ? 4 : 1}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      
      <HistoryPanel 
        history={history}
        isVisible={showHistory}
        onClose={() => setShowHistory(false)}
        onClear={clearHistory}
      />
    </div>
  );
};

export default Calculator;