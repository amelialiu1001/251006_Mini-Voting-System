
import React from 'react';

interface VoteCardProps {
  label: string;
  onVote: () => void;
  disabled: boolean;
  color: string;
}

const VoteCard: React.FC<VoteCardProps> = ({ label, onVote, disabled, color }) => {
  return (
    <button
      onClick={onVote}
      disabled={disabled}
      className="w-full p-6 text-4xl font-bold text-white rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
      style={{
        backgroundColor: disabled ? '#4b5563' : color, // gray-600 when disabled
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
      }}
    >
      {label}
    </button>
  );
};

export default VoteCard;
