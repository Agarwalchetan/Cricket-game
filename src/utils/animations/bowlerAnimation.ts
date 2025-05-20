interface BowlerFrame {
  bodyPosition: Position;
  armAngle: number;
  legSpread: number;
}

export function getBowlerFrame(
  state: 'ready' | 'bowling' | 'followThrough',
  progress: number = 0
): BowlerFrame {
  const basePosition = { x: 200, y: 70 };

  switch (state) {
    case 'ready':
      return {
        bodyPosition: { x: basePosition.x, y: basePosition.y },
        armAngle: -Math.PI / 4,
        legSpread: 0
      };

    case 'bowling':
      // Windmill bowling action
      const windupProgress = Math.sin(progress * Math.PI);
      return {
        bodyPosition: {
          x: basePosition.x + progress * 10,
          y: basePosition.y + windupProgress * 15
        },
        armAngle: -Math.PI / 2 + (Math.PI * 2) * progress,
        legSpread: 10 * windupProgress
      };

    case 'followThrough':
      return {
        bodyPosition: { x: basePosition.x + 15, y: basePosition.y + 20 },
        armAngle: Math.PI * 1.5,
        legSpread: 15
      };
  }
}