import { GameState } from '../types/game';
import { calculateBallPath } from './animations/ballAnimation';
import { getPlayerFrame } from './animations/playerAnimation';
import { drawField } from './drawings/fieldDrawer';
import { drawPitch } from './drawings/pitchDrawer';
import { drawBowler } from './drawings/bowlerDrawer';
import { drawNonStriker } from './drawings/nonStrikerDrawer';

export function drawGame(ctx: CanvasRenderingContext2D, gameState: GameState) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  // Draw field elements
  drawField(ctx, gameState.isDarkMode);
  drawPitch(ctx, gameState.isDarkMode);
  
  // Draw players
  drawBowler(ctx, gameState.bowlerState, gameState.isDarkMode);
  drawNonStriker(ctx, gameState.isDarkMode);
  
  if (gameState.isAnimating && gameState.shotType) {
    const progress = Math.min((Date.now() % 1000) / 1000, 1);
    const ballPos = calculateBallPath(
      { x: 200, y: 250 },
      gameState.shotType,
      progress
    );
    drawBall(ctx, ballPos, gameState.isDarkMode);
  } else {
    drawBall(ctx, gameState.ballPosition, gameState.isDarkMode);
  }
  
  drawPlayer(ctx, gameState.playerState, gameState.isDarkMode);
}

function drawBall(
  ctx: CanvasRenderingContext2D,
  position: { x: number; y: number },
  isDark: boolean
) {
  ctx.beginPath();
  ctx.arc(position.x, position.y, 5, 0, Math.PI * 2);
  ctx.fillStyle = isDark ? '#fff' : 'red';
  ctx.fill();
  ctx.closePath();
}

function drawPlayer(
  ctx: CanvasRenderingContext2D,
  playerState: 'ready' | 'batting' | 'finished',
  isDark: boolean
) {
  const progress = playerState === 'batting' ? (Date.now() % 500) / 500 : 0;
  const frame = getPlayerFrame(playerState, progress);
  
  // Player body
  ctx.fillStyle = isDark ? '#fff' : '#000';
  ctx.fillRect(
    190,
    220,
    frame.bodyWidth,
    frame.bodyHeight
  );
  
  // Bat
  ctx.save();
  ctx.translate(200, 240);
  ctx.rotate(frame.batAngle);
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(0, -5, 30, 5);
  ctx.restore();
}