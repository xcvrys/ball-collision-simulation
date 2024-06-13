import { Wall } from "../classes/Wall";
import { create } from "zustand";

type WallsStore = {
  walls: Wall[];
  setWalls: (walls: Wall[]) => void;
  addWall: () => void;
};

export const useWallsStore = create<WallsStore>((set) => ({
  walls: [],
  setWalls: (walls: Wall[]) => set({ walls }),
  addWall: () =>
    set((state) => {
      const newWall = new Wall(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      );
      return { walls: [...state.walls, newWall] };
    }),
}));
