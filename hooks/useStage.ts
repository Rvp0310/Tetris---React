import { useState, useEffect } from "react";

import { EMPTY_CELL, stageMaker } from "@/lib/gameHelper";
import { StageType } from "@/components/Stage";
import { PlayerType } from "./usePlayer";
import { CellType } from "@/components/Stage";
import { TetrominoKey } from "@/lib/tetrominos";


export const useStage = (player: PlayerType, resetPlayer: any): [StageType, React.Dispatch<React.SetStateAction<StageType>>] => {
    const [stage, setStage] = useState(stageMaker());

    useEffect(() => {
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
                resetPlayer();
            }

            return newStage;

        }

        setStage((prev: StageType): StageType => updateStage(prev));
    }, [player.collided, player.pos.x, player.pos.y, player.tetromino, resetPlayer]);

    return [stage, setStage];
}