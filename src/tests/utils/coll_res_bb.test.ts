import { describe, expect, it } from "vitest";

import { Ball } from "../../classes/Ball";
import { Vector } from "../../classes/Vector";
import { coll_res_bb } from "../../classes/utils";

describe('utils: coll_res_bb', () => {

  it('should exchange velocities correctly when colliding balls have equal mass and elasticity', () => {
    const ball1 = new Ball(0, 0, 10, 1);
    const ball2 = new Ball(20, 0, 10, 1);

    ball1.vel = new Vector(1, 0);
    ball2.vel = new Vector(-1, 0);

    coll_res_bb(ball1, ball2);

    expect(ball1.vel.x).toBeCloseTo(-1);
    expect(ball1.vel.y).toBeCloseTo(0);
    expect(ball2.vel.x).toBeCloseTo(1);
    expect(ball2.vel.y).toBeCloseTo(0);
  });

  it('should reverse velocities when balls move directly towards each other', () => {
    const ball1 = new Ball(0, 0, 10, 1);
    const ball2 = new Ball(20, 0, 10, 1);

    ball1.vel = new Vector(1, 0);
    ball2.vel = new Vector(-1, 0);

    coll_res_bb(ball1, ball2);

    expect(ball1.vel.x).toBeCloseTo(-1);
    expect(ball1.vel.y).toBeCloseTo(0);
    expect(ball2.vel.x).toBeCloseTo(1);
    expect(ball2.vel.y).toBeCloseTo(0);
  });


  it('should remain stationary when balls have zero initial relative velocity', () => {
    const ball1 = new Ball(0, 0, 10, 1);
    const ball2 = new Ball(20, 0, 10, 1);

    ball1.vel = new Vector(0, 0);
    ball2.vel = new Vector(0, 0);

    coll_res_bb(ball1, ball2);

    expect(ball1.vel.x).toBeCloseTo(0);
    expect(ball1.vel.y).toBeCloseTo(0);
    expect(ball2.vel.x).toBeCloseTo(0);
    expect(ball2.vel.y).toBeCloseTo(0);
  });



  it('should handle overlapping positions without errors', () => {
    const ball1 = new Ball(0, 0, 10, 1);
    const ball2 = new Ball(0, 0, 10, 1);

    ball1.vel = new Vector(1, 0);
    ball2.vel = new Vector(-1, 0);

    coll_res_bb(ball1, ball2);

    expect(ball1.vel.x).toBeCloseTo(1);
    expect(ball1.vel.y).toBeCloseTo(0);
    expect(ball2.vel.x).toBeCloseTo(-1);
    expect(ball2.vel.y).toBeCloseTo(0);
  });


  it('should adjust velocities correctly for balls with extremely high velocities', () => {
    const ball1 = new Ball(0, 0, 10, 1);
    const ball2 = new Ball(10000, 0, 10, 1);

    ball1.vel = new Vector(1000, 0);
    ball2.vel = new Vector(-1000, 0);

    coll_res_bb(ball1, ball2);

    expect(ball1.vel.x).toBeCloseTo(-1000);
    expect(ball1.vel.y).toBeCloseTo(0);
    expect(ball2.vel.x).toBeCloseTo(1000);
    expect(ball2.vel.y).toBeCloseTo(0);
  });

  it('should stop after collision when elasticity is zero', () => {
    const ball1 = new Ball(0, 0, 10, 1);
    const ball2 = new Ball(20, 0, 10, 1);

    ball1.vel = new Vector(1, 0);
    ball2.vel = new Vector(-1, 0);
    ball1.elasticity = 0;
    ball2.elasticity = 0;

    coll_res_bb(ball1, ball2);

    expect(ball1.vel.x).toBeCloseTo(0);
    expect(ball1.vel.y).toBeCloseTo(0);
    expect(ball2.vel.x).toBeCloseTo(0);
    expect(ball2.vel.y).toBeCloseTo(0);
  });
});

