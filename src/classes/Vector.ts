export class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(v: Vector): Vector {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  subtr(v: Vector): Vector {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  mag(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  mult(n: number): Vector {
    return new Vector(this.x * n, this.y * n);
  }

  normal(): Vector {
    return new Vector(-this.y, this.x).unit();
  }

  unit(): Vector {
    const mag = this.mag();
    return mag === 0 ? new Vector(0, 0) : new Vector(this.x / mag, this.y / mag);
  }

  sub(other: Vector): Vector {
    return new Vector(this.x - other.x, this.y - other.y);
  }

  cross(other: Vector): number {
    return this.x * other.y - this.y * other.x;
  }

  dot(other: Vector): number {
    return this.x * other.x + this.y * other.y;
  }

  magSquared(): number {
    return this.x * this.x + this.y * this.y;
  }
  drawVec(ctx: CanvasRenderingContext2D, start_x: number, start_y: number, n: number, color: string) {
    ctx.beginPath();
    ctx.moveTo(start_x, start_y);
    ctx.lineTo(start_x + this.x * n, start_y + this.y * n);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }

  static dot(v1: Vector, v2: Vector): number {
    return v1.x * v2.x + v1.y * v2.y;
  }
}
