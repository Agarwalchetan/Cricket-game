export function drawPitch(ctx: CanvasRenderingContext2D, isDark: boolean) {
  // Pitch rectangle
  ctx.fillStyle = isDark ? '#d4b483' : '#D2B48C';
  ctx.fillRect(180, 100, 40, 150);
  
  // Crease lines
  ctx.strokeStyle = isDark ? '#ffffff80' : '#00000050';
  ctx.lineWidth = 1;
  
  // Batting crease
  ctx.beginPath();
  ctx.moveTo(170, 220);
  ctx.lineTo(230, 220);
  ctx.stroke();
  
  // Bowling crease
  ctx.beginPath();
  ctx.moveTo(170, 120);
  ctx.lineTo(230, 120);
  ctx.stroke();
  
  // Stumps
  const stumpsColor = isDark ? '#fff' : '#000';
  drawStumps(ctx, 195, 220, stumpsColor); // Batting end
  drawStumps(ctx, 195, 120, stumpsColor); // Bowling end
}

function drawStumps(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  
  // Draw three stumps
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(x + i * 5, y);
    ctx.lineTo(x + i * 5, y - 15);
    ctx.stroke();
  }
  
  // Draw bails
  ctx.beginPath();
  ctx.moveTo(x - 1, y - 15);
  ctx.lineTo(x + 11, y - 15);
  ctx.stroke();
}