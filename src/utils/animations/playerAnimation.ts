interface PlayerFrame {
  bodyPosition: Position;
  bodyWidth: number;
  bodyHeight: number;
  batAngle: number;
  batLength: number;
  legSpread: number;
}

export function getPlayerFrame(
  state: 'ready' | 'batting' | 'finished',
  progress: number = 0
): PlayerFrame {
  const basePosition = { x: 200, y: 240 };

  const baseFrame = {
    bodyPosition: basePosition,
    bodyWidth: 20,
    bodyHeight: 40,
    batLength: 35,
    legSpread: 0
  };

  switch (state) {
    case 'ready':
      return {
        ...baseFrame,
        batAngle: -Math.PI / 4,
        legSpread: 10
      };
    
    case 'batting':
      // Dynamic batting stance
      const swingProgress = Math.sin(progress * Math.PI);
      return {
        ...baseFrame,
        bodyPosition: {
          x: basePosition.x + swingProgress * 10,
          y: basePosition.y - swingProgress * 5
        },
        bodyWidth: 22,
        bodyHeight: 38,
        batAngle: -Math.PI / 4 + (Math.PI * 1.2) * progress,
        legSpread: 15 + swingProgress * 5
      };
    
    case 'finished':
      return {
        ...baseFrame,
        bodyPosition: {
          x: basePosition.x + 15,
          y: basePosition.y - 5
        },
        bodyWidth: 22,
        bodyHeight: 38,
        batAngle: Math.PI * 0.95,
        legSpread: 20
      };
  }
}