export interface Position {
  x: number;
  y: number;
  scale?: number;
}

export interface Player {
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  isStriker: boolean;
}

export interface GameState {
  score: number;
  wickets: number;
  ballPosition: Position;
  playerState: 'ready' | 'batting' | 'finished';
  bowlerState: 'ready' | 'bowling' | 'followThrough';
  shotType: 'straight' | 'cover' | 'pull' | null;
  isAnimating: boolean;
  currentBatsman: Player;
  nonStriker: Player;
  lastEvent: 'none' | 'four' | 'six' | 'out';
  isDarkMode: boolean;
  ballsInOver: number;
}