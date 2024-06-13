import { describe, expect, it } from "vitest";

import { Ball } from "../../classes/Ball";
import { Wall } from "../../classes/Wall";
import { coll_det_bw } from "../../classes/utils";

describe('utils: coll_det_bw', () => {
  it('should return true when ball is exactly touching the wall', () => {
    const ball = new Ball(50, 10, 10, 1);
    const wall = new Wall(0, 0, 100, 0);

    const collisionDetected = coll_det_bw(ball, wall);

    expect(collisionDetected).toBe(true);
  });

  it('should return false when ball has zero radius', () => {
    const ball = new Ball(50, 50, 0, 1);
    const wall = new Wall(0, 0, 100, 0);

    const collisionDetected = coll_det_bw(ball, wall);

    expect(collisionDetected).toBe(false);
  });

  it('should return true when ball is partially overlapping the wall', () => {
    const ball = new Ball(50, 0, 10, 1);
    const wall = new Wall(0, 0, 100, 0);

    const collisionDetected = coll_det_bw(ball, wall);

    expect(collisionDetected).toBe(true);
  });
  it('should return true when ball is partially overlapping the wall', () => {
    const ball = new Ball(50, 10, 10, 1);
    const wall = new Wall(0, 0, 100, 0);

    const collisionDetected = coll_det_bw(ball, wall);

    expect(collisionDetected).toBe(true);
  });

  it('should return true when ball is exactly at the start point of the wall', () => {
    const ball = new Ball(0, 0, 10, 1);
    const wall = new Wall(0, 0, 100, 0);

    const collisionDetected = coll_det_bw(ball, wall);

    expect(collisionDetected).toBe(true);
  });

  it('should return true when ball is exactly touching the wall', () => {
    const ball = new Ball(0, 0, 10, 1);
    const wall = new Wall(0, 0, 100, 0);

    const collisionDetected = coll_det_bw(ball, wall);

    expect(collisionDetected).toBe(true);
  });

  it('should return true when ball is exactly touching the wall', () => {
    const ball = new Ball(100, 0, 10, 1);
    const wall = new Wall(0, 0, 100, 0);

    const collisionDetected = coll_det_bw(ball, wall);

    expect(collisionDetected).toBe(true);
  });

  it('should return true when ball\'s center is exactly on the wall line and within the segment', () => {
    const ball = new Ball(50, 0, 10, 1);
    const wall = new Wall(0, 0, 100, 0);

    const collisionDetected = coll_det_bw(ball, wall);

    expect(collisionDetected).toBe(true);
  });

  it('should return true when ball\'s radius is extremely large compared to the wall length', () => {
    const ball = new Ball(50, 10, 1000, 1);
    const wall = new Wall(0, 0, 10, 0);

    const collisionDetected = coll_det_bw(ball, wall);

    expect(collisionDetected).toBe(true);
  });



  it('should return true when ball\'s radius is extremely large compared to the wall length', () => {
    const ball = new Ball(50, 10, 1000, 1);
    const wall = new Wall(0, 0, 10, 0);

    const collisionDetected = coll_det_bw(ball, wall);

    expect(collisionDetected).toBe(true);
  });

  it('should return true when ball is exactly touching the wall\'s end point', () => {
    const ball = new Ball(100, 0, 10, 1);
    const wall = new Wall(0, 0, 100, 0);

    const collisionDetected = coll_det_bw(ball, wall);

    expect(collisionDetected).toBe(true);
  });

  it('should return true when ball\'s center is exactly on the wall line and within the segment', () => {
    const ball = new Ball(50, 0, 10, 1);
    const wall = new Wall(0, 0, 100, 0);

    const collisionDetected = coll_det_bw(ball, wall);

    expect(collisionDetected).toBe(true);
  });
});