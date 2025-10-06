import React from 'react';
import { TimerIcon } from '../constants';

interface TimerDisplayProps {
  seconds: number;
  isVotingOpen: boolean;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ seconds, isVotingOpen }) => {
  const isEnding = seconds <= 5 && isVotingOpen;
  
  return (
    <div 
      className={`flex items-center justify-center p-2 rounded-lg transition-colors duration-300`}
      style={isEnding ? { backgroundColor: '#4a0e0c' } : {}}
    >
      <TimerIcon className={`h-8 w-8 mr-3 transition-colors duration-300 ${isEnding ? 'text-red-200' : 'text-gray-400'}`} />
      <span className={`text-3xl font-mono font-bold tracking-wider ${isEnding ? 'text-red-200 animate-pulse' : 'text-white'}`}>
        {seconds.toString().padStart(2, '0')}s
      </span>
    </div>
  );
};

export default TimerDisplay;