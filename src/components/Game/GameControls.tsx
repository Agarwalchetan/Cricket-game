import React from 'react';

interface GameControlsProps {
  onHit: () => void;
  onReset: () => void;
}

export function GameControls({ onHit, onReset }: GameControlsProps) {
  return (
    <div className="flex gap-4">
      <button
        onClick={onHit}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Hit Ball
      </button>
      <button
        onClick={onReset}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Reset Game
      </button>
    </div>
  );
}