import { Vector } from './Vector';

export class Ball {
  pos: Vector;
  r: number;
  m: number;
  inv_m: number;
  elasticity: number;
  vel: Vector;
  acc: Vector;
  acceleration: number;
  player: boolean;
  shadow_length: number;
  gridKey: string | undefined;

  constructor(x: number, y: number, r: number, m: number) {
    this.pos = new Vector(x, y);
    this.r = r;
    this.m = m;
    this.inv_m = this.m === 0 ? 0 : 1 / this.m;
    this.elasticity = 1;
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);
    this.acceleration = 1;
    this.player = false;
    this.shadow_length = 750;
    this.gridKey = undefined;
  }

  drawBall(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = this.player ? "#d9ff5d" : "#ecfb5c";
    ctx.fill();
    ctx.closePath();
  }

  drawDebug(ctx: CanvasRenderingContext2D) {
    // Draw the ball boundary
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.closePath();

    // Draw velocity vector
    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y);
    ctx.lineTo(this.pos.x + this.vel.x * 10, this.pos.y + this.vel.y * 10); // Scale for visibility
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.closePath();

    // Draw acceleration vector
    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y);
    ctx.lineTo(this.pos.x + this.acc.x * 10, this.pos.y + this.acc.y * 10); // Scale for visibility
    ctx.strokeStyle = "green";
    ctx.stroke();
    ctx.closePath();

    // Draw bounding box
    ctx.beginPath();
    ctx.rect(this.pos.x - this.r, this.pos.y - this.r, this.r * 2, this.r * 2);
    ctx.strokeStyle = "purple";
    ctx.stroke();
    ctx.closePath();

    // Display mass, elasticity, friction, and position
    ctx.font = "12px Josefin Sans";
    ctx.fillStyle = "white";
    ctx.fillText(`Mass: ${this.m}`, this.pos.x + this.r + 5, this.pos.y - this.r - 10);
    ctx.fillText(`Elasticity: ${this.elasticity}`, this.pos.x + this.r + 5, this.pos.y - this.r);
    ctx.fillText(`Position: (${this.pos.x.toFixed(2)}, ${this.pos.y.toFixed(2)})`, this.pos.x + this.r + 5, this.pos.y - this.r + 10);
    ctx.fillText(`Velocity: (${this.vel.x.toFixed(2)}, ${this.vel.y.toFixed(2)})`, this.pos.x + this.r + 5, this.pos.y - this.r + 20);
    ctx.fillText(`Acceleration: (${this.acc.x.toFixed(2)}, ${this.acc.y.toFixed(2)})`, this.pos.x + this.r + 5, this.pos.y - this.r + 30);

    // Draw center point
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 2, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }

  reposition(friction: number) {
    this.acc = this.acc.unit().mult(this.acceleration);
    this.vel = this.vel.add(this.acc);
    this.vel = this.vel.mult(1 - friction);
    this.pos = this.pos.add(this.vel);
  }

  drawLight = (ctx: CanvasRenderingContext2D) => {
    const lightSize = this.shadow_length;
    const lightColor = "rgba(255, 255, 255, 0.2)";

    ctx.save();
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, lightSize, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(
      this.pos.x,
      this.pos.y,
      0,
      this.pos.x,
      this.pos.y,
      lightSize
    );
    gradient.addColorStop(0, lightColor);
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.globalCompositeOperation = "lighter";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  };
  drawShadow(ctx: CanvasRenderingContext2D, lightPosition: Vector) {
    if (this.player) return;

    const angles: number[] = [];
    const points: { startX: number; startY: number; endX: number; endY: number; }[] = [];

    const segments = 6;

    for (let i = 0; i < segments; i++) {
      const angle = (Math.PI * 2 * i) / segments;
      const startX = this.pos.x + this.r * Math.cos(angle);
      const startY = this.pos.y + this.r * Math.sin(angle);

      const angleFromLight = Math.atan2(startY - lightPosition.y, startX - lightPosition.x);

      const endX = startX + this.shadow_length * Math.cos(angleFromLight);
      const endY = startY + this.shadow_length * Math.sin(angleFromLight);

      angles.push(angleFromLight);
      points.push({
        startX: startX,
        startY: startY,
        endX: endX,
        endY: endY
      });
    }

    ctx.save();
    for (let i = points.length - 1; i >= 0; i--) {
      const n = i === 0 ? points.length - 1 : i - 1;
      ctx.beginPath();
      ctx.moveTo(points[i].startX, points[i].startY);
      ctx.lineTo(points[n].startX, points[n].startY);
      ctx.lineTo(points[n].endX, points[n].endY);
      ctx.lineTo(points[i].endX, points[i].endY);
      ctx.fillStyle = "rgba(0, 26, 28, 1)";
      ctx.fill();
    }
    ctx.restore();
  }
}
