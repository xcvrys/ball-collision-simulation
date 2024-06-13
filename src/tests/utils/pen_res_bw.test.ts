import { describe, expect, it } from "vitest";

import { Ball } from "../../classes/Ball";
import { Vector } from "../../classes/Vector";
import { Wall } from "../../classes/Wall";
import { pen_res_bw } from "../../classes/utils";

describe('utils: pen_res_bw', () => {
  it('should not change ball\'s position when already on wall boundary', () => {
    const ball = new Ball(50, 50, 10, 1);
    const wall = new Wall(50, 50, 150, 150);
    const initialPosition = new Vector(ball.pos.x, ball.pos.y);
    pen_res_bw(ball, wall);
    expect(ball.pos.x).toBe(initialPosition.x);
    expect(ball.pos.y).toBe(initialPosition.y);
  });
});