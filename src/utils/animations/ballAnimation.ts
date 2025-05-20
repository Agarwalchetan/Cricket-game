import { Position } from '../../types/game';

export function calculateBallPath(
  startPos: Position,
  shotType: 'straight' | 'cover' | 'pull',
  progress: number
): Position {
  const paths = {
    straight: {
      x: startPos.x,
      y: startPos.y - progress * 250,
      scale: 1 - progress * 0.5
    },
    cover: {
      x: startPos.x + progress * 200,
      y: startPos.y - progress * 200,
      scale: 1 - progress * 0.5
    },
    pull: {
      x: startPos.x - progress * 200,
      y: startPos.y - progress * 200,
      scale: 1 - progress * 0.5
    }
  };

  const path = paths[shotType];
  
  // Add arc to the ball path
  const arcHeight = Math.sin(progress * Math.PI) * 50;
  path.y -= arcHeight;

  return {
    x: path.x,
    y: path.y,
    scale: path.scale
  };
}