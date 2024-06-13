import { describe, expect, it } from "vitest";

import { Ball } from "../../classes/Ball";
import { Vector } from "../../classes/Vector";
import { Wall } from "../../classes/Wall";
import { coll_res_bw } from "../../classes/utils";

describe('utils: coll_res_bw', () => {
  it('should not change ball velocity when ball has zero mass', () => {
    const ball = new Ball(50, 50, 10, 0);
    ball.vel = new Vector(10, 0);
    const wall = new Wall(0, 0, 100, 0);

    coll_res_bw(ball, wall);

    expect(ball.vel.x).toBeCloseTo(10);
    expect(ball.vel.y).toBeCloseTo(0);
  });

  it('should change ball velocity correctly upon collision with a wall when ball is at rest', () => {
    const ball = new Ball(50, 50, 10, 1);
    const wall = new Wall(0, 0, 100, 0);

    coll_res_bw(ball, wall);

    expect(ball.vel.x).toBeCloseTo(0);
    expect(ball.vel.y).toBeCloseTo(0);
  });

  it('should calculate new velocity correctly when hitting wall at an angle', () => {
    const ball = new Ball(50, 50, 10, 1);
    ball.vel = new Vector(10, 10);
    const wall = new Wall(0, 0, 100, 100);

    coll_res_bw(ball, wall);

    expect(ball.vel.x).toBeCloseTo(-10);
    expect(ball.vel.y).toBeCloseTo(-10);
  });

});
