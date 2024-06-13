import { describe, expect, it } from "vitest";

import { Ball } from "../../classes/Ball";
import { coll_det_bb } from "../../classes/utils";

describe('utils: coll_det_bb', () => {
  it('should return true when balls are touching', () => {

    const ball1 = new Ball(0, 0, 10, 1);
    const ball2 = new Ball(20, 0, 10, 1);

    const collisionDetected = coll_det_bb(ball1, ball2);

    expect(collisionDetected).toBe(true);
  });

  it('should return false when one ball has zero radius', () => {

    const ball1 = new Ball(0, 0, 0, 1);
    const ball2 = new Ball(20, 0, 10, 1);

    const collisionDetected = coll_det_bb(ball1, ball2);

    expect(collisionDetected).toBe(false);
  });

  it('should return true when balls are touching', () => {

    const ball1 = new Ball(0, 0, 10, 1);
    const ball2 = new Ball(20, 0, 10, 1);

    const collisionDetected = coll_det_bb(ball1, ball2);

    expect(collisionDetected).toBe(true);
  });

  it('should return false when balls are not touching', () => {

    const ball1 = new Ball(0, 0, 10, 1);
    const ball2 = new Ball(50, 50, 10, 1);

    const collisionDetected = coll_det_bb(ball1, ball2);

    expect(collisionDetected).toBe(false);
  });

  it('should return true when balls overlap completely', () => {
    const b1 = new Ball(0, 0, 10, 1);
    const b2 = new Ball(0, 0, 5, 1);
    expect(coll_det_bb(b1, b2)).to.be.true;
  });

  it('should return true when both balls have zero mass', () => {
    const b1 = new Ball(0, 0, 0, 0);
    const b2 = new Ball(0, 0, 0, 0);
    expect(coll_det_bb(b1, b2)).to.be.true;
  });
  it('should handle balls with very high velocity when testing collision detection', () => {
    const b1 = new Ball(0, 0, 100, 1);
    const b2 = new Ball(0, 0, 50, 1);
    expect(coll_det_bb(b1, b2)).to.be.true;
  });
})
