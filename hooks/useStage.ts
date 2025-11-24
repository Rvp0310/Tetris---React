import { useState, useEffect } from "react";

import { EMPTY_CELL, stageMaker } from "@/lib/gameHelper";
import { StageType } from "@/components/Stage";
import { PlayerType } from "./usePlayer";
import { CellType } from "@/components/Stage";
import { TetrominoKey } from "@/lib/tetrominos";


export const useStage = (player: PlayerType, resetPlayer: any): [StageType, React.Dispatch<React.SetStateAction<StageType>>, number] => {
    const [stage, setStage] = useState(stageMaker());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {

        setRowsCleared(0);
        const sweepRows = (newStage: StageType) : StageType => {
            return newStage.reduce((acc: StageType, row: CellType[]) => {
                if (row.findIndex((cell: CellType )=> cell[0] === 0) === -1){
                    setRowsCleared(prev => prev + 1);
                    acc.unshift((new Array(newStage[0].length).fill([0, "clear"])) as CellType[]);
                    return acc;
                }
                acc.push(row);
                return acc;
            }, [])
        }

        // Flush the stage
        const updateStage = (prevStage: StageType): StageType => {
            const newStage = prevStage.map(
                (row: CellType[]) => row.map(
                    (cell: CellType) => (
                        cell[1] === "clear" ? EMPTY_CELL : cell
                    )
                )
            );

            // Then Draw the Tetromino
            player.tetromino.forEach((row: TetrominoKey[], y: number) => {
                row.forEach((value: TetrominoKey, x: number) => {
                    if(value !== 0){
                        newStage[y + player.pos.y][x + player.pos.x] = [
                                value, 
                                `${player.collided ? 'merged' : 'clear'}`
                            ];
                        }
                    });
                });
                
            // check for collision
            if(player.collided){
                const newStageAfterSweep = sweepRows(newStage);
                resetPlayer();
                return newStageAfterSweep;
            }

            return newStage;

        }

        setStage((prev: StageType): StageType => updateStage(prev));
    }, [player.collided, player.pos.x, player.pos.y, player.tetromino, resetPlayer]);

    return [stage, setStage, rowsCleared];
}