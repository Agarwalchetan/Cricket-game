import { HitResult } from '../types/game';

export function calculateHitResult(): HitResult {
  const random = Math.random();
  
  // 10% chance of getting out
  if (random < 0.1) {
    return { runs: 0, isOut: true, shotType: 'straight' };
  }
  
  // Shot type calculation
  const shots: ('straight' | 'cover' | 'pull')[] = ['straight', 'cover', 'pull'];
  const shotType = shots[Math.floor(Math.random() * shots.length)];
  
  // Increased boundary chances
  const boundaryRandom = Math.random();
  let runs;
  
  if (boundaryRandom < 0.35) { // 35% chance for four
    runs = 4;
  } else if (boundaryRandom < 0.55) { // 20% chance for six
    runs = 6;
  } else if (boundaryRandom < 0.75) { // 20% chance for 2 or 3 runs
    runs = Math.floor(Math.random() * 2) + 2;
  } else { // 25% chance for 0 or 1 run
    runs = Math.floor(Math.random() * 2);
  }
  
  return { runs, isOut: false, shotType };
}