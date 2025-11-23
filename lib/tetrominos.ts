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
    color: [0, 210, 255],
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: [255, 225, 40],
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0],
    ],
    color: [80, 220, 120],
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
      [0, 0, 0],
    ],
    color: [235, 70, 95],
  },
  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0],
    ],
    color: [60, 120, 255],
  },
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"],
    ],
    color: [255, 140, 30]
  },
  T: {
    shape: [
      ["T", "T", "T"],
      [0, "T", 0],
      [0, 0, 0],
    ],
    color: [255, 140, 30]
  }
};

export const randomTetromino = () => {
  const tetrominos = "IJLOSTZ";
  const randTetromino = 
    tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino as TetrominoKey];
};
