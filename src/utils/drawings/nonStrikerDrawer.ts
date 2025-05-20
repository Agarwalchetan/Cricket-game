export function drawNonStriker(ctx: CanvasRenderingContext2D, isDark: boolean) {
  const x = 160;
  const y = 180;

  // Body
  ctx.fillStyle = isDark ? '#fff' : '#000';
  ctx.fillRect(x - 10, y - 20, 20, 40);
  
  // Bat
  ctx.save();
  ctx.translate(x - 5, y);
  ctx.rotate(-Math.PI / 4);
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(0, -2.5, 25, 5);
  ctx.restore();
}