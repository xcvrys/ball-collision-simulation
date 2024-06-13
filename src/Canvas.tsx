import React, { useCallback, useEffect, useRef } from "react";
import {
  coll_det_bb,
  coll_det_bw,
  coll_res_bb,
  coll_res_bw,
  pen_res_bb,
  pen_res_bw,
} from "./classes/utils";

import { Ball } from "./classes/Ball";
import { Vector } from "./classes/Vector";
import { Wall } from "./classes/Wall";
import { useAnimationFrame } from "./classes/useAnimationFrame";
import { useBallsStore } from "./store/balls";
import { useDebugStore } from "./store/debug";
import { useWallsStore } from "./store/walls";

const GRID_CELL_SIZE = 200;

const Canvas: React.FC = () => {
  const { debug, showShadows } = useDebugStore();
  const { balls } = useBallsStore();
  const { walls, setWalls } = useWallsStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys = useRef<{ [key: string]: boolean }>({});
  const friction = 0.075;
  const lightPositionRef = useRef(new Vector(0, 0));
  const lightSizeRef = useRef(500);
  const grid = useRef<{ [key: string]: Ball[] }>({});

  const handleResize = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Reset grid on resize
      Object.keys(grid.current).forEach((key) => {
        delete grid.current[key];
      });

      setWalls([
        new Wall(0, 0, canvas.width, 0, "#001a1c"),
        new Wall(canvas.width, 0, canvas.width, canvas.height, "#001a1c"),
        new Wall(canvas.width, canvas.height, 0, canvas.height, "#001a1c"),
        new Wall(0, canvas.height, 0, 0, "#001a1c"),
        new Wall(300, 400, 550, 200),
        new Wall(500, 600, 800, 800),
        new Wall(1200, 200, 600, 400),
      ]);
    }
  }, [setWalls]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    keys.current[e.key] = true;
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    keys.current[e.key] = false;
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const keyControl = useCallback((ball: Ball) => {
    const speed = ball.acceleration;
    ball.acc.x = keys.current["a"] ? -speed : keys.current["d"] ? speed : 0;
    ball.acc.y = keys.current["w"] ? -speed : keys.current["s"] ? speed : 0;
  }, []);

  const initializeGrid = useCallback(() => {
    balls.forEach((ball) => {
      const key = `${Math.floor(ball.pos.x / GRID_CELL_SIZE)},${Math.floor(
        ball.pos.y / GRID_CELL_SIZE
      )}`;
      if (!grid.current[key]) {
        grid.current[key] = [];
      }
      grid.current[key].push(ball);
    });
  }, [balls]);

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  const getNeighborCells = (cellKey: string): string[] => {
    const [cx, cy] = cellKey.split(",").map(Number);
    const neighbors = [];
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        neighbors.push(`${cx + dx},${cy + dy}`);
      }
    }
    return neighbors;
  };

  const mainLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach((ball) => {
      const currentKey = `${Math.floor(
        ball.pos.x / GRID_CELL_SIZE
      )},${Math.floor(ball.pos.y / GRID_CELL_SIZE)}`;
      const previousKey = ball.gridKey || "";

      if (currentKey !== previousKey) {
        if (grid.current[previousKey]) {
          const index = grid.current[previousKey].indexOf(ball);
          if (index !== -1) grid.current[previousKey].splice(index, 1);
        }

        if (!grid.current[currentKey]) {
          grid.current[currentKey] = [];
        }
        grid.current[currentKey].push(ball);

        ball.gridKey = currentKey;
      }
    });

    balls.forEach((ball) => {
      if (showShadows) ball.drawShadow(ctx, lightPositionRef.current);

      if (ball.player) {
        lightPositionRef.current = ball.pos;
        lightSizeRef.current = ball.r;
        ball.drawLight(ctx);
        keyControl(ball);
      }

      const currentKey = ball.gridKey || "";
      const neighbors = getNeighborCells(currentKey);

      neighbors.forEach((neighborKey) => {
        if (grid.current[neighborKey]) {
          grid.current[neighborKey].forEach((otherBall) => {
            if (ball !== otherBall && coll_det_bb(ball, otherBall)) {
              pen_res_bb(ball, otherBall);
              coll_res_bb(ball, otherBall);
            }
          });
        }
      });

      walls.forEach((wall) => {
        if (coll_det_bw(ball, wall)) {
          pen_res_bw(ball, wall);
          coll_res_bw(ball, wall);
        }
      });

      ball.reposition(friction);
    });

    balls.forEach((ball) => {
      ball.drawBall(ctx);
      if (debug) {
        ball.drawDebug(ctx);
      }
    });

    walls.forEach((wall) => {
      wall.drawWall(ctx);
      if (debug) {
        wall.drawDebug(ctx);
      }
    });
  }, [balls, walls, keyControl, friction, debug, showShadows]);

  useAnimationFrame(mainLoop);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default Canvas;
