import React from 'react';

interface ResultsBarProps {
  label: string;
  votes: number;
  percentage: number;
  color: string;
  votesSuffix: string;
}

const ResultsBar: React.FC<ResultsBarProps> = ({ label, votes, percentage, color, votesSuffix }) => {
  return (
    <div className="w-full mb-4">
      <div className="flex justify-between items-center mb-1 text-lg font-semibold">
        <span>{label}</span>
        <span className="text-gray-300">{votes} {votesSuffix} ({percentage.toFixed(1)}%)</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-8 overflow-hidden shadow-inner">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-3 text-white font-bold"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        >
        </div>
      </div>
    </div>
  );
};

export default ResultsBar;
