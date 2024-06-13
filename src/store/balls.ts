import { Ball } from "../classes/Ball";
import { create } from "zustand";
import { randInt } from "../classes/utils";

type BallsStore = {
  balls: Ball[];
  addBall: () => void;
  setBalls: (balls: Ball[]) => void;
};

const createNewBall = () => {
  const ball = new Ball(
    randInt(50, window.innerWidth - 50),
    randInt(50, window.innerHeight - 50),
    randInt(30, 50),
    randInt(1, 5)
  );
  ball.elasticity = randInt(0, 10) / 10;
  return ball;
};

const initializeBalls = (count: number) => {
  const newBalls = Array.from({ length: count }).map(createNewBall);
  newBalls[0].player = true;
  return newBalls;
};

export const useBallsStore = create<BallsStore>((set) => ({
  balls: initializeBalls(15),
  addBall: () =>
    set((state) => ({ balls: [...state.balls, createNewBall()] })),
  setBalls: (balls: Ball[]) => set({ balls }),
}));
