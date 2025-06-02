import React from 'react';
import Calculator from './components/Calculator';
import { Volume2 } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-md mb-6">
        <div className="flex items-center justify-center">
          <div className="glass-effect p-4 rounded-2xl flex items-center space-x-3">
            <Volume2 className="text-blue-600 w-8 h-8" />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Voice Calculator
            </h1>
          </div>
        </div>
        <p className="text-white text-center text-lg font-medium drop-shadow-lg mt-4">
          Speak your calculations or use the keypad
        </p>
      </header>
      
      <main className="w-full max-w-md glass-effect rounded-2xl shadow-2xl overflow-hidden p-6 border border-white/20">
        <Calculator />
      </main>
      
      <footer className="mt-8 text-white text-center">
        <p className="text-lg font-medium drop-shadow-lg">Click the microphone button and speak your calculation</p>
        <p className="mt-2 text-white/80">Try saying: "5 plus 7" or "12 times 4 equals"</p>
      </footer>
    </div>
  );
}

export default App;