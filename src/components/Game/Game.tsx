import React, { useEffect, useRef } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { drawGame } from '../../utils/gameRenderer';
import { GameControls } from './GameControls';
import { ScoreBoard } from './ScoreBoard';
import { BatsmanStats } from './BatsmanStats';
import { EventAnimation } from './EventAnimation';

export function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { gameState, hitBall, resetGame, toggleDarkMode } = useGameState();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      drawGame(ctx, gameState);
      requestAnimationFrame(render);
    };

    render();
  }, [gameState]);

  return (
    <div className={`flex flex-col items-center gap-4 p-4 min-h-screen transition-colors ${
      gameState.isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
    }`}>
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">2D Cricket</h1>
        <button
          onClick={toggleDarkMode}
          className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          {gameState.isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
      
      <ScoreBoard score={gameState.score} wickets={gameState.wickets} isDark={gameState.isDarkMode} />
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className={`border-2 rounded-lg ${
            gameState.isDarkMode ? 'border-gray-700' : 'border-gray-300'
          }`}
        />
        <EventAnimation event={gameState.lastEvent} />
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
        <BatsmanStats
          player={gameState.currentBatsman}
          label="Striker"
          isDark={gameState.isDarkMode}
        />
        <BatsmanStats
          player={gameState.nonStriker}
          label="Non-striker"
          isDark={gameState.isDarkMode}
        />
      </div>
      
      <GameControls
        onHit={hitBall}
        onReset={resetGame}
        isDark={gameState.isDarkMode}
      />
    </div>
  );
}