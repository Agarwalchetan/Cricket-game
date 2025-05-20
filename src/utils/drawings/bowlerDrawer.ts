import { Position } from '../../types/game';
import { getBowlerFrame } from '../animations/bowlerAnimation';

export function drawBowler(
  ctx: CanvasRenderingContext2D,
  state: 'ready' | 'bowling' | 'followThrough',
  isDark: boolean,
  progress: number = 0
) {
  const frame = getBowlerFrame(state, progress);
  const { bodyPosition, armAngle, legSpread } = frame;
  
  const color = isDark ? '#fff' : '#000';
  
  // Draw legs
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(bodyPosition.x - 5, bodyPosition.y);
  ctx.lineTo(bodyPosition.x - 5 - legSpread, bodyPosition.y + 20);
  ctx.moveTo(bodyPosition.x + 5, bodyPosition.y);
  ctx.lineTo(bodyPosition.x + 5 + legSpread, bodyPosition.y + 20);
  ctx.stroke();

  // Body
  ctx.fillStyle = color;
  ctx.fillRect(
    bodyPosition.x - 10,
    bodyPosition.y - 20,
    20,
    40
  );
  
  // Bowling arm
  ctx.beginPath();
  ctx.moveTo(bodyPosition.x, bodyPosition.y - 10);
  ctx.lineTo(
    bodyPosition.x + Math.cos(armAngle) * 25,
    bodyPosition.y - 10 + Math.sin(armAngle) * 25
  );
  ctx.stroke();
}