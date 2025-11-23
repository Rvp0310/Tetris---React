import { useCallback, useState } from "react";

import { randomTetromino, TetrominoKey, TETROMINOS } from "@/lib/tetrominos";
import { isCollision, STAGE_WIDTH } from "@/lib/gameHelper";
import { StageType } from "@/components/Stage";

export type PlayerType = {
    pos: {
        x: number,
        y: number
    },
    tetromino: TetrominoKey[][],
    collided: boolean
}

type moveType = {
    x: number,
    y: number,
    collided: boolean
}

export const usePlayer = () : [PlayerType, (currMove: moveType) => void, () => void, (stage: StageType, dir: number) => void] => {
    const [player, setPlayer] = useState({
        pos: {
            x: 0,
            y: 0
        },
        tetromino: TETROMINOS[0].shape, 
        collided: false
    });

    const rotate = (matrix: TetrominoKey[][], dir: number) => {
        const rotatedTetro = matrix[0].map((_, colIndex) =>
            matrix.map(row => row[colIndex]) 
        );

        if (dir > 0)
            return rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse();
    }

    const playerRotate = (stage: StageType, dir: number) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        const pos = clonedPlayer.pos.x;
        let offset = 1;
        while(isCollision(clonedPlayer, stage, {moveX: 0, moveY: 0})){
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1: -1));
            if(offset > clonedPlayer.tetromino[0].length){
                rotate(clonedPlayer.tetromino, -1)
                clonedPlayer.pos.x = pos;
                return;
            }
        }

        setPlayer(clonedPlayer);
    }

    const updatePlayerPos = (currMove: moveType) => {
        setPlayer(prev => ({
                ...prev,
                pos: {
                    x: (prev.pos.x + currMove.x),
                    y: (prev.pos.y + currMove.y)
                },
                collided: currMove.collided
            }))
    }

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: {
                x: STAGE_WIDTH / 2 - 2,
                y: 0
            },
            tetromino: randomTetromino().shape,
            collided: false
        })
    }, [])

    return [player, updatePlayerPos, resetPlayer, playerRotate];
}