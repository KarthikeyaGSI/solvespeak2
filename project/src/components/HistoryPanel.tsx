import React from 'react';
import { X, Trash2 } from 'lucide-react';

interface HistoryPanelProps {
  history: string[];
  isVisible: boolean;
  onClose: () => void;
  onClear: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ 
  history, 
  isVisible, 
  onClose,
  onClear
}) => {
  return (
    <div 
      className={`
        fixed top-0 right-0 h-full w-80 glass-effect shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-x-0' : 'translate-x-full'}
        flex flex-col border-l border-white/20
      `}
    >
      <div className="flex justify-between items-center p-4 border-b border-white/20">
        <h2 className="text-xl font-semibold text-gray-800">History</h2>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Close history"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p className="text-center">No calculations yet</p>
            <p className="text-sm mt-2">Your history will appear here</p>
          </div>
        ) : (
          <ul className="divide-y divide-white/20">
            {history.map((item, index) => (
              <li key={index} className="p-4 hover:bg-white/10 transition-colors">
                <p className="font-mono text-gray-800">{item}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {history.length > 0 && (
        <div className="p-4 border-t border-white/20">
          <button
            onClick={onClear}
            className="flex items-center justify-center w-full py-3 px-4 rounded-xl
              bg-gradient-to-r from-red-500 to-red-600 text-white
              hover:from-red-600 hover:to-red-700
              transition-colors button-press"
          >
            <Trash2 className="w-5 h-5 mr-2" />
            Clear History
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryPanel;