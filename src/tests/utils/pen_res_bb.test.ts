import { describe, expect, it } from "vitest";

import { Ball } from "../../classes/Ball";
import { pen_res_bb } from "../../classes/utils";

describe('utils: pen_res_bb', () => {
  it('should correctly resolve penetration when two balls overlap', () => {
    const ball1 = new Ball(0, 0, 10, 1);
    const ball2 = new Ball(15, 0, 10, 1);

    pen_res_bb(ball1, ball2);

    expect(ball1.pos.x).toBeLessThan(0);
    expect(ball2.pos.x).toBeGreaterThan(15);
  });


  it('should adjust positions of both balls based on their inverse masses', () => {
    const ball1 = new Ball(0, 0, 10, 1);
    const ball2 = new Ball(15, 0, 10, 1);

    pen_res_bb(ball1, ball2);

    expect(ball1.pos.x).toBeLessThan(0);
    expect(ball2.pos.x).toBeGreaterThan(15);
  });

  it('should correctly resolve penetration when one ball is stationary', () => {
    const stationaryBall = new Ball(0, 0, 10, 0);
    const movingBall = new Ball(15, 0, 10, 1);

    pen_res_bb(stationaryBall, movingBall);

    expect(stationaryBall.pos.x).toBe(0);
    expect(movingBall.pos.x).toBeGreaterThan(15);
  });

  it('should move balls apart in the correct direction', () => {
    const ball1 = new Ball(0, 0, 10, 1);
    const ball2 = new Ball(15, 0, 10, 1);

    pen_res_bb(ball1, ball2);

    expect(ball1.pos.x).toBeLessThan(0);
    expect(ball2.pos.x).toBeGreaterThan(15);
  });

  it('should calculate penetration depth accurately when two balls overlap', () => {
    const ball1 = new Ball(0, 0, 10, 1);
    const ball2 = new Ball(15, 0, 10, 1);

    pen_res_bb(ball1, ball2);

    expect(ball1.pos.x).toBeLessThan(0);
    expect(ball2.pos.x).toBeGreaterThan(15);
  });


  it('should handle cases where balls are just touching (no overlap)', () => {
    const ball1 = new Ball(0, 0, 10, 1);
    const ball2 = new Ball(20, 0, 10, 1);

    pen_res_bb(ball1, ball2);

    expect(ball1.pos.x).toBe(0);
    expect(ball2.pos.x).toBe(20);
  });

});
