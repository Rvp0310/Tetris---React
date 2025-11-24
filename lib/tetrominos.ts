export type TetrominoKey = 0 | "I" | "O" | "S" | "Z" | "J" | "L" | "T";

export const TETROMINOS: Record<
  TetrominoKey,
  {
    shape: TetrominoKey[][];
    color: number[];
  }
> = {
  0: {
    shape: [[0]],
    color: [25, 25, 35],
  },
  I: {
    shape: [
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
    ],
    color: [  0, 255, 255],
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: [255, 220,  90],
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0],
    ],
    color: [ 50, 230, 140],
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
      [0, 0, 0],
    ],
    color: [255,  80, 120],
  },
  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0],
    ],
    color: [ 90, 140, 255],
  },
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"],
    ],
    color: [255, 165,  60]
  },
  T: {
    shape: [
      ["T", "T", "T"],
      [0, "T", 0],
      [0, 0, 0],
    ],
    color: [200, 100, 255]
  }
};

export const randomTetromino = () => {
  const tetrominos = "IJLOSTZ";
  const randTetromino = 
    tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino as TetrominoKey];
};
