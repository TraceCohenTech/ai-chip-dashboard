'use client';

import { useEffect, useRef } from 'react';

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = 900;
    };
    resize();
    window.addEventListener('resize', resize);

    const pad = { x: 80, y: 100 };
    const pinCount = { top: 14, bottom: 14, left: 10, right: 10 };

    interface Particle {
      x: number;
      y: number;
      tx: number;
      ty: number;
      speed: number;
      progress: number;
      color: string;
      path: { x: number; y: number }[];
      pathIdx: number;
      size: number;
    }

    const particles: Particle[] = [];
    const colors = ['#00D4FF', '#00FF88', '#FFB800', '#4488FF', '#FF6B35'];

    function makePath(startX: number, startY: number, endX: number, endY: number) {
      const points = [{ x: startX, y: startY }];
      const midX = (startX + endX) / 2 + (Math.random() - 0.5) * 100;
      const midY = (startY + endY) / 2 + (Math.random() - 0.5) * 60;

      if (Math.random() > 0.5) {
        points.push({ x: midX, y: startY });
        points.push({ x: midX, y: midY });
        points.push({ x: endX, y: midY });
      } else {
        points.push({ x: startX, y: midY });
        points.push({ x: midX, y: midY });
        points.push({ x: midX, y: endY });
      }
      points.push({ x: endX, y: endY });
      return points;
    }

    function spawnParticle() {
      const side = Math.floor(Math.random() * 4);
      let sx = 0, sy = 0;
      const cx = w / 2, cy = h / 2;
      const dieW = Math.min(w * 0.4, 500);
      const dieH = Math.min(h * 0.45, 350);

      if (side === 0) { sx = pad.x + Math.random() * (w - pad.x * 2); sy = pad.y; }
      else if (side === 1) { sx = pad.x + Math.random() * (w - pad.x * 2); sy = h - pad.y; }
      else if (side === 2) { sx = pad.x; sy = pad.y + Math.random() * (h - pad.y * 2); }
      else { sx = w - pad.x; sy = pad.y + Math.random() * (h - pad.y * 2); }

      const ex = cx - dieW / 2 + Math.random() * dieW;
      const ey = cy - dieH / 2 + Math.random() * dieH;

      particles.push({
        x: sx, y: sy,
        tx: ex, ty: ey,
        speed: 0.003 + Math.random() * 0.004,
        progress: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        path: makePath(sx, sy, ex, ey),
        pathIdx: 0,
        size: 1.5 + Math.random() * 2,
      });
    }

    for (let i = 0; i < 40; i++) spawnParticle();

    let offset = 0;
    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      offset += 0.4;
      frame++;

      const cx = w / 2;
      const cy = h / 2;
      const dieW = Math.min(w * 0.4, 500);
      const dieH = Math.min(h * 0.45, 350);

      // Die outline with glow
      const pulse = Math.sin(frame * 0.02) * 0.3 + 0.7;
      ctx.save();
      ctx.shadowColor = `rgba(0, 212, 255, ${0.15 * pulse})`;
      ctx.shadowBlur = 30;
      ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * pulse})`;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(cx - dieW / 2, cy - dieH / 2, dieW, dieH);
      ctx.restore();

      // Inner die grid
      const gridSize = 40;
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.04)';
      ctx.lineWidth = 0.5;
      for (let x = cx - dieW / 2 + gridSize; x < cx + dieW / 2; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, cy - dieH / 2);
        ctx.lineTo(x, cy + dieH / 2);
        ctx.stroke();
      }
      for (let y = cy - dieH / 2 + gridSize; y < cy + dieH / 2; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(cx - dieW / 2, y);
        ctx.lineTo(cx + dieW / 2, y);
        ctx.stroke();
      }

      // Die labels
      ctx.font = '10px monospace';
      ctx.fillStyle = 'rgba(0, 212, 255, 0.15)';
      ctx.textAlign = 'center';
      const labels = ['ALU', 'SRAM', 'I/O', 'PHY', 'NPU', 'MAC', 'DMA', 'PLL', 'SERDES'];
      let li = 0;
      for (let gx = cx - dieW / 2 + gridSize; gx < cx + dieW / 2 - gridSize; gx += gridSize * 2) {
        for (let gy = cy - dieH / 2 + gridSize; gy < cy + dieH / 2 - gridSize; gy += gridSize * 2) {
          if (li < labels.length) {
            ctx.fillText(labels[li % labels.length], gx + gridSize / 2, gy + gridSize / 2 + 3);
            li++;
          }
        }
      }

      // Pins — top
      for (let i = 0; i < pinCount.top; i++) {
        const px = cx - dieW / 2 + (i + 1) * (dieW / (pinCount.top + 1));
        const py = cy - dieH / 2;
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.12 + Math.sin(frame * 0.03 + i) * 0.06})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 6]);
        ctx.lineDashOffset = -offset;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px, py - 50 - Math.sin(i * 0.8) * 30);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = `rgba(0, 212, 255, ${0.2 + Math.sin(frame * 0.04 + i) * 0.1})`;
        ctx.beginPath();
        ctx.arc(px, py - 50 - Math.sin(i * 0.8) * 30, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pins — bottom
      for (let i = 0; i < pinCount.bottom; i++) {
        const px = cx - dieW / 2 + (i + 1) * (dieW / (pinCount.bottom + 1));
        const py = cy + dieH / 2;
        ctx.strokeStyle = `rgba(0, 255, 136, ${0.12 + Math.sin(frame * 0.03 + i) * 0.06})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 6]);
        ctx.lineDashOffset = -offset;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px, py + 50 + Math.sin(i * 0.7) * 25);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = `rgba(0, 255, 136, ${0.2 + Math.sin(frame * 0.04 + i) * 0.1})`;
        ctx.beginPath();
        ctx.arc(px, py + 50 + Math.sin(i * 0.7) * 25, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pins — left
      for (let i = 0; i < pinCount.left; i++) {
        const px = cx - dieW / 2;
        const py = cy - dieH / 2 + (i + 1) * (dieH / (pinCount.left + 1));
        ctx.strokeStyle = `rgba(255, 184, 0, ${0.12 + Math.sin(frame * 0.025 + i) * 0.06})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 6]);
        ctx.lineDashOffset = -offset;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px - 60 - Math.sin(i * 0.9) * 30, py);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = `rgba(255, 184, 0, ${0.2 + Math.sin(frame * 0.04 + i) * 0.1})`;
        ctx.beginPath();
        ctx.arc(px - 60 - Math.sin(i * 0.9) * 30, py, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pins — right
      for (let i = 0; i < pinCount.right; i++) {
        const px = cx + dieW / 2;
        const py = cy - dieH / 2 + (i + 1) * (dieH / (pinCount.right + 1));
        ctx.strokeStyle = `rgba(68, 136, 255, ${0.12 + Math.sin(frame * 0.025 + i) * 0.06})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 6]);
        ctx.lineDashOffset = -offset;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + 60 + Math.sin(i * 0.9) * 30, py);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = `rgba(68, 136, 255, ${0.2 + Math.sin(frame * 0.04 + i) * 0.1})`;
        ctx.beginPath();
        ctx.arc(px + 60 + Math.sin(i * 0.9) * 30, py, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Corner markers
      const cornerSize = 12;
      const corners = [
        [cx - dieW / 2, cy - dieH / 2],
        [cx + dieW / 2, cy - dieH / 2],
        [cx - dieW / 2, cy + dieH / 2],
        [cx + dieW / 2, cy + dieH / 2],
      ];
      corners.forEach(([x, y]) => {
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.3 * pulse})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, cornerSize, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = `rgba(0, 212, 255, ${0.08 * pulse})`;
        ctx.fill();
      });

      // Animate particles along paths
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          particles.splice(i, 1);
          spawnParticle();
          continue;
        }

        const pathLen = p.path.length - 1;
        const segIdx = Math.min(Math.floor(p.progress * pathLen), pathLen - 1);
        const segT = (p.progress * pathLen) - segIdx;
        const from = p.path[segIdx];
        const to = p.path[segIdx + 1];

        p.x = from.x + (to.x - from.x) * segT;
        p.y = from.y + (to.y - from.y) * segT;

        // Trail
        ctx.save();
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Faint trace line
        ctx.strokeStyle = `${p.color}08`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (let j = 0; j < p.path.length; j++) {
          if (j === 0) ctx.moveTo(p.path[j].x, p.path[j].y);
          else ctx.lineTo(p.path[j].x, p.path[j].y);
        }
        ctx.stroke();
      }

      requestAnimationFrame(draw);
    };

    const raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full pointer-events-none"
      style={{ height: 900, opacity: 0.85 }}
    />
  );
}
