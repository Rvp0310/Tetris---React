# Classic Tetris (React + TypeScript)

## Classic Tetris — Browser Edition
A minimal, complete implementation of the classic Tetris gameplay loop built with React and TypeScript.  
This version follows the traditional mechanics of Tetris: falling tetrominoes, rotation, line clearing, leveling, and game-over detection.

The current version represents the MVP, following a React-based Tetris tutorial but adapted to modern React + TS patterns and custom hooks.

---

## Current Features

- Classic falling tetromino logic  
  Pieces spawn, fall automatically, rotate, collide, and lock into the grid according to authentic Tetris rules.

- Collision detection  
  Prevents tetrominoes from clipping into walls, the floor, or existing blocks.

- Line clearing  
  Full rows are detected and removed, with the stage collapsing cleanly.

- Scoring system  
  Implements standard Tetris scoring values for clearing 1, 2, 3, or 4 lines.

- Leveling system  
  Levels increase as rows accumulate, affecting the falling speed.

- Custom hooks architecture  
  - usePlayer: Controls player movement, rotation, and active tetromino state  
  - useStage: Manages grid updates, line clearing, and merged blocks  
  - useInterval: Drives the game loop  
  - useGameStatus: Calculates score, rows cleared, and level

- Keyboard controls  
  ArrowLeft / ArrowRight: Move  
  ArrowDown: Fast drop  
  Space: Rotate

---

## Planned Enhancements

These features will be added in future versions:

- Pause functionality  
- High-score storage (localStorage or backend)  
- Next tetromino preview  

---

## Tech Stack

- React (functional components and hooks)
- TypeScript
- Custom game loop using requestAnimationFrame-style interval logic
- Modular components and hook-based architecture

---
