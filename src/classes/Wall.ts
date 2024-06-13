import { Vector } from './Vector';

export class Wall {
  start: Vector;
  end: Vector;
  strokeStyle: string;

  constructor(x1: number, y1: number, x2: number, y2: number, strokeStyle: string = "#ecfb5c") {
    this.start = new Vector(x1, y1);
    this.end = new Vector(x2, y2);
    this.strokeStyle = strokeStyle;
  }

  drawWall(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.strokeStyle = this.strokeStyle
    ctx.stroke();
    ctx.closePath();
  }

  wallUnit(): Vector {
    return this.end.subtr(this.start).unit();
  }

  drawDebug(ctx: CanvasRenderingContext2D) {
    // Draw the wall
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.strokeStyle = this.strokeStyle;
    ctx.stroke();
    ctx.closePath();

    // Draw start point
    ctx.beginPath();
    ctx.arc(this.start.x, this.start.y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    // Draw end point
    ctx.beginPath();
    ctx.arc(this.end.x, this.end.y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();

    // Draw direction vector
    const midX = (this.start.x + this.end.x) / 2;
    const midY = (this.start.y + this.end.y) / 2;
    const unitVec = this.wallUnit().mult(10); // Scale for visibility

    ctx.beginPath();
    ctx.moveTo(midX, midY);
    ctx.lineTo(midX + unitVec.x, midY + unitVec.y);
    ctx.strokeStyle = "green";
    ctx.stroke();
    ctx.closePath();

    // Display start, end points, and unit vector
    ctx.font = "12px Josefin Sans";
    ctx.fillStyle = "white";
    ctx.fillText(`Start: (${this.start.x.toFixed(2)}, ${this.start.y.toFixed(2)})`, this.start.x + 5, this.start.y - 10);
    ctx.fillText(`End: (${this.end.x.toFixed(2)}, ${this.end.y.toFixed(2)})`, this.end.x + 5, this.end.y - 10);
    ctx.fillText(`Unit Vector: (${unitVec.x.toFixed(2)}, ${unitVec.y.toFixed(2)})`, midX + 5, midY + 20);
  }
}
