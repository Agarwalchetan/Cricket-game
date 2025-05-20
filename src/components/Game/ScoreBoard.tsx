import React from 'react';

interface ScoreBoardProps {
  score: number;
  wickets: number;
  isDark: boolean;
}

export function ScoreBoard({ score, wickets, isDark }: ScoreBoardProps) {
  return (
    <div className={`px-6 py-3 rounded-lg text-center ${
      isDark ? 'bg-gray-800' : 'bg-white shadow-lg'
    }`}>
      <div className="text-2xl font-bold">
        {score} / {wickets}
      </div>
      <div className="text-sm opacity-75">
        {wickets < 10 ? 'Click to bat!' : 'Game Over!'}
      </div>
    </div>
  );
}