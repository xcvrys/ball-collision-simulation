import { describe, expect, it } from 'vitest'

import { Ball } from '../classes/Ball';

describe('Ball', () => {
  it('should correctly instantiate with given parameters', () => {
    const ball = new Ball(10, 20, 5, 2);
    expect(ball.pos.x).toBe(10);
    expect(ball.pos.y).toBe(20);
    expect(ball.r).toBe(5);
    expect(ball.m).toBe(2);
    expect(ball.inv_m).toBe(0.5);
    expect(ball.elasticity).toBe(1);
    expect(ball.vel.x).toBe(0);
    expect(ball.vel.y).toBe(0);
    expect(ball.acc.x).toBe(0);
    expect(ball.acc.y).toBe(0);
    expect(ball.acceleration).toBe(1);
    expect(ball.player).toBe(false);
    expect(ball.shadow_length).toBe(750);
    expect(ball.gridKey).toBeUndefined();
  });

  it('should behave correctly when mass is zero', () => {
    const ball = new Ball(10, 20, 5, 0);
    expect(ball.m).toBe(0);
    expect(ball.inv_m).toBe(0);
    ball.reposition(0.1);
    expect(ball.vel.x).toBe(0);
    expect(ball.vel.y).toBe(0);
    expect(ball.pos.x).toBe(10);
    expect(ball.pos.y).toBe(20);
  });
});