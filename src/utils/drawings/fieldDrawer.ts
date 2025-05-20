export function drawField(ctx: CanvasRenderingContext2D, isDark: boolean) {
  // Sky
  const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
  if (isDark) {
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
  } else {
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#B0E0E6');
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  // Ground
  ctx.fillStyle = isDark ? '#1f4037' : '#90EE90';
  ctx.beginPath();
  ctx.ellipse(
    ctx.canvas.width / 2,
    ctx.canvas.height - 50,
    200,
    80,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();
  
  // Boundary line
  ctx.strokeStyle = isDark ? '#ffffff50' : '#00000030';
  ctx.lineWidth = 2;
  ctx.stroke();
}