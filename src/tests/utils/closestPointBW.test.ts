import { describe, expect, it } from "vitest";

import { Ball } from "../../classes/Ball";
import { Vector } from "../../classes/Vector";
import { Wall } from "../../classes/Wall";
import { closestPointBW } from "../../classes/utils";

describe('utils: closestPointBW', () => {

  it('should return start point of wall when ball is closest to start', () => {
    const ball = new Ball(-10, 0, 10, 1);
    const wall = new Wall(0, 0, 20, 0);
    const closestPoint = closestPointBW(ball, wall);
    expect(closestPoint).toEqual(wall.start);
  });
  it('should return start point of wall when ball is exactly at the start point of the wall', () => {
    const ball = new Ball(0, 0, 10, 1);
    const wall = new Wall(0, 0, 20, 0);
    const closestPoint = closestPointBW(ball, wall);
    expect(closestPoint).toEqual(wall.start);
  });
  it('should calculate closest point when ball is directly above the wall', () => {
    const ball = new Ball(0, -20, 10, 1);
    const wall = new Wall(0, 0, 0, 20);
    const closestPoint = closestPointBW(ball, wall);
    expect(closestPoint).toEqual(new Vector(0, 0));
  });
  it('should return middle point of wall when ball is closest to the middle', () => {
    const ball = new Ball(0, 0, 10, 1);
    const wall = new Wall(-10, 0, 10, 0);
    const closestPoint = closestPointBW(ball, wall);
    expect(closestPoint).toEqual(new Vector(0, 0));
  });
  it('should return start point of wall when ball is directly to the left of the wall', () => {
    const ball = new Ball(-10, 0, 10, 1);
    const wall = new Wall(0, 0, 20, 0);
    const closestPoint = closestPointBW(ball, wall);
    expect(closestPoint).toEqual(wall.start);
  });
  it('should calculate closest point when ball is directly below the wall', () => {
    const ball = new Ball(0, 10, 10, 1);
    const wall = new Wall(0, 0, 0, 20);
    const closestPoint = closestPointBW(ball, wall);
    expect(closestPoint).toEqual(new Vector(0, 10));
  });
  it('should return start point of wall when ball is closest to start point', () => {
    const ball = new Ball(0, 0, 10, 1);
    const wall = new Wall(0, 0, 0, 0);
    const closestPoint = closestPointBW(ball, wall);
    expect(closestPoint).toEqual(wall.start);
  });
  it('should return start point of wall when ball is at a very large distance from the wall', () => {
    const ball = new Ball(-1000, -1000, 10, 1);
    const wall = new Wall(0, 0, 20, 0);
    const closestPoint = closestPointBW(ball, wall);
    expect(closestPoint).toEqual(wall.start);
  });

  it('should return end point of wall when ball is exactly at the end point', () => {
    const ball = new Ball(20, 0, 10, 1);
    const wall = new Wall(0, 0, 20, 0);
    const closestPoint = closestPointBW(ball, wall);
    expect(closestPoint).toEqual(wall.end);
  });
})
