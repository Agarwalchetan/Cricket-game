import { useState, useCallback } from 'react';
import { GameState, Player } from '../types/game';
import { calculateHitResult } from '../utils/gameLogic';

const createPlayer = (name: string, isStriker: boolean = false): Player => ({
  name,
  runs: 0,
  balls: 0,
  fours: 0,
  sixes: 0,
  isStriker
});

const initialState: GameState = {
  score: 0,
  wickets: 0,
  ballPosition: { x: 200, y: 250 },
  playerState: 'ready',
  bowlerState: 'ready',
  shotType: null,
  isAnimating: false,
  currentBatsman: createPlayer('Batsman 1', true),
  nonStriker: createPlayer('Batsman 2', false),
  lastEvent: 'none',
  isDarkMode: false,
  ballsInOver: 0
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const toggleDarkMode = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isDarkMode: !prev.isDarkMode
    }));
  }, []);

  const rotateStrike = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentBatsman: { ...prev.currentBatsman, isStriker: !prev.currentBatsman.isStriker },
      nonStriker: { ...prev.nonStriker, isStriker: !prev.nonStriker.isStriker }
    }));
  }, []);

  const updateBatsmanStats = useCallback((runs: number, isOut: boolean) => {
    setGameState(prev => {
      const updatedBatsman = {
        ...prev.currentBatsman,
        runs: prev.currentBatsman.runs + runs,
        balls: prev.currentBatsman.balls + 1,
        fours: runs === 4 ? prev.currentBatsman.fours + 1 : prev.currentBatsman.fours,
        sixes: runs === 6 ? prev.currentBatsman.sixes + 1 : prev.currentBatsman.sixes,
      };

      // Rotate strike for odd runs or after over
      const shouldRotateStrike = 
        (runs % 2 === 1) || 
        (prev.ballsInOver + 1 === 6);

      const newBallsInOver = (prev.ballsInOver + 1) % 6;

      return {
        ...prev,
        currentBatsman: shouldRotateStrike ? prev.nonStriker : updatedBatsman,
        nonStriker: shouldRotateStrike ? updatedBatsman : prev.nonStriker,
        ballsInOver: newBallsInOver,
        lastEvent: runs === 4 ? 'four' : runs === 6 ? 'six' : isOut ? 'out' : 'none'
      };
    });
  }, []);

  const hitBall = useCallback(() => {
    if (gameState.isAnimating || gameState.wickets >= 10) return;

    const result = calculateHitResult();
    
    setGameState(prev => ({
      ...prev,
      isAnimating: true,
      playerState: 'batting',
      bowlerState: 'bowling',
      shotType: result.shotType
    }));

    // Animation sequence
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        playerState: 'finished',
        bowlerState: 'followThrough'
      }));
    }, 500);

    setTimeout(() => {
      updateBatsmanStats(result.runs, result.isOut);
      setGameState(prev => ({
        ...prev,
        score: result.isOut ? prev.score : prev.score + result.runs,
        wickets: result.isOut ? prev.wickets + 1 : prev.wickets,
        isAnimating: false,
        playerState: 'ready',
        bowlerState: 'ready',
        shotType: null
      }));
    }, 1000);
  }, [gameState.isAnimating, gameState.wickets, updateBatsmanStats]);

  const resetGame = useCallback(() => {
    setGameState(initialState);
  }, []);

  return { gameState, hitBall, resetGame, toggleDarkMode };
}