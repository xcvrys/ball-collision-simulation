import { Ball } from './Ball';
import { Vector } from './Vector';
import { Wall } from './Wall';

export function closestPointBW(b1: Ball, w1: Wall): Vector {
  const ballToWallStart = w1.start.subtr(b1.pos);
  if (Vector.dot(w1.wallUnit(), ballToWallStart) > 0) {
    return w1.start;
  }

  const wallEndToBall = b1.pos.subtr(w1.end);
  if (Vector.dot(w1.wallUnit(), wallEndToBall) > 0) {
    return w1.end;
  }

  const closestDist = Vector.dot(w1.wallUnit(), ballToWallStart);
  const closestVect = w1.wallUnit().mult(closestDist);
  return w1.start.subtr(closestVect);
}

export function coll_det_bb(b1: Ball, b2: Ball): boolean {
  return b1.r + b2.r >= b2.pos.subtr(b1.pos).mag();
}

export function coll_det_bw(b1: Ball, w1: Wall): boolean {
  const ballToClosest = closestPointBW(b1, w1).subtr(b1.pos);
  return ballToClosest.mag() <= b1.r;
}

export function pen_res_bb(b1: Ball, b2: Ball) {
  const dist = b1.pos.subtr(b2.pos);
  const pen_depth = b1.r + b2.r - dist.mag();
  const pen_res = dist.unit().mult(pen_depth / (b1.inv_m + b2.inv_m));
  b1.pos = b1.pos.add(pen_res.mult(b1.inv_m));
  b2.pos = b2.pos.add(pen_res.mult(-b2.inv_m));
}

export function pen_res_bw(b1: Ball, w1: Wall) {
  const penVect = b1.pos.subtr(closestPointBW(b1, w1));
  b1.pos = b1.pos.add(penVect.unit().mult(b1.r - penVect.mag()));
}

export function coll_res_bb(b1: Ball, b2: Ball) {
  const normal = b1.pos.subtr(b2.pos).unit();
  const relVel = b1.vel.subtr(b2.vel);
  const sepVel = Vector.dot(relVel, normal);
  const new_sepVel = -sepVel * Math.min(b1.elasticity, b2.elasticity);

  const vsep_diff = new_sepVel - sepVel;
  const impulse = vsep_diff / (b1.inv_m + b2.inv_m);
  const impulseVec = normal.mult(impulse);

  b1.vel = b1.vel.add(impulseVec.mult(b1.inv_m));
  b2.vel = b2.vel.add(impulseVec.mult(-b2.inv_m));
}

export function coll_res_bw(b1: Ball, w1: Wall) {
  const normal = b1.pos.subtr(closestPointBW(b1, w1)).unit();
  const sepVel = Vector.dot(b1.vel, normal);
  const new_sepVel = -sepVel * b1.elasticity;
  const vsep_diff = sepVel - new_sepVel;
  b1.vel = b1.vel.add(normal.mult(-vsep_diff));
}

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
