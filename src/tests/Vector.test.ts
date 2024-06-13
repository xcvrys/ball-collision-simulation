import { describe, expect, it } from 'vitest'

import { Vector } from '../classes/Vector';

describe('Vector', () => {
  it('should return correct vector when adding two vectors', () => {
    const v1 = new Vector(1, 2);
    const v2 = new Vector(3, 4);
    const result = v1.add(v2);
    expect(result.x).toBe(4);
    expect(result.y).toBe(6);
  });

  it('should return the same vector when adding zero vector', () => {
    const v1 = new Vector(5, 7);
    const zeroVector = new Vector(0, 0);
    const result = v1.add(zeroVector);
    expect(result.x).toBe(5);
    expect(result.y).toBe(7);
  });

  it('should return the same vector when adding zero vector', () => {
    const v1 = new Vector(5, 7);
    const zeroVector = new Vector(0, 0);
    const result = v1.add(zeroVector);
    expect(result.x).toBe(5);
    expect(result.y).toBe(7);
  });

  it('should return correct magnitude when calculating vector magnitude', () => {
    const v = new Vector(3, 4);
    const result = v.mag();
    expect(result).toBe(5);
  });

  it('should return correct vector when subtracting two vectors', () => {
    const v1 = new Vector(3, 5);
    const v2 = new Vector(1, 2);
    const result = v1.sub(v2);
    expect(result.x).toBe(2);
    expect(result.y).toBe(3);
  });


  it('should calculate dot product of two vectors correctly', () => {
    const v1 = new Vector(1, 2);
    const v2 = new Vector(3, 4);
    const result = Vector.dot(v1, v2);
    expect(result).toBe(11);
  });

  it('should return unit vector when normalizing a vector', () => {
    const v = new Vector(3, 4);
    const result = v.unit();
    expect(result.x).toBeCloseTo(0.6);
    expect(result.y).toBeCloseTo(0.8);
  });

  it('should return correct vector when multiplying vector by scalar', () => {
    const v1 = new Vector(2, 3);
    const scalar = 2;
    const result = v1.mult(scalar);
    expect(result.x).toBe(4);
    expect(result.y).toBe(6);
  });

  it('should return correct value when calculating cross product of two vectors', () => {
    const v1 = new Vector(2, 3);
    const v2 = new Vector(4, 5);
    const result = v1.cross(v2);
    expect(result).toBe(-2);
  });

  it('should return zero magnitude for zero vector', () => {
    const zeroVec = new Vector(0, 0);
    const result = zeroVec.mag();
    expect(result).toBe(0);
  });

  it('should return zero magnitude for zero vector', () => {
    const zeroVec = new Vector(0, 0);
    const result = zeroVec.mag();
    expect(result).toBe(0);
  });
  it('should return zero vector when subtracting a vector from itself', () => {
    const v = new Vector(3, 5);
    const result = v.sub(v);
    expect(result.x).toBe(0);
    expect(result.y).toBe(0);
  });

  it('should return zero when calculating dot product of orthogonal vectors', () => {
    const v1 = new Vector(1, 0);
    const v2 = new Vector(0, 1);
    const result = Vector.dot(v1, v2);
    expect(result).toBe(0);
  });

  it('should return zero vector when multiplying vector by zero', () => {
    const v1 = new Vector(3, 4);
    const zeroVector = new Vector(0, 0);
    const result = v1.mult(0);
    expect(result.x).toBe(zeroVector.x);
    expect(result.y).toBe(zeroVector.y);
  });

  it('should return zero vector when normalizing zero vector', () => {
    const zeroVec = new Vector(0, 0);
    const result = zeroVec.unit();
    expect(result.x).toBe(0);
    expect(result.y).toBe(0);
  });

  it('should return zero when calculating cross product of parallel vectors', () => {
    const v1 = new Vector(2, 3);
    const v2 = new Vector(4, 6);
    const result = v1.cross(v2);
    expect(result).toBe(0);
  });

  it('should return correct squared magnitude when calculating', () => {
    const v = new Vector(3, 4);
    const result = v.magSquared();
    expect(result).toBe(25);
  });


  it('should return correct value when calculating dot product of two vectors', () => {
    const v1 = new Vector(2, 3);
    const v2 = new Vector(4, 5);
    const result = Vector.dot(v1, v2);
    expect(result).toBe(23);
  });

});