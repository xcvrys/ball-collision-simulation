import { describe, expect, it } from 'vitest'

import { Wall } from '../classes/Wall';

describe('Wall', () => {

  it('should create wall with correct start and end points', () => {
    const wall = new Wall(0, 0, 10, 10);
    expect(wall.start.x).toBe(0);
    expect(wall.start.y).toBe(0);
    expect(wall.end.x).toBe(10);
    expect(wall.end.y).toBe(10);
  });

  it('should create wall with zero length when start and end points are the same', () => {
    const wall = new Wall(5, 5, 5, 5);
    expect(wall.start.x).toBe(5);
    expect(wall.start.y).toBe(5);
    expect(wall.end.x).toBe(5);
    expect(wall.end.y).toBe(5);
    expect(wall.wallUnit().mag()).toBe(0);
  })
});