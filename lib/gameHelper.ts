import { CellType, StageType } from "@/components/Stage";
import { PlayerType } from "@/hooks/usePlayer";

export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;
export const EMPTY_CELL = [0, "clear"] as CellType;

export const stageMaker = () => {
    return Array.from({length: STAGE_HEIGHT}, () => 
                Array.from(
                    {length: STAGE_WIDTH}, () => [0, "clear"] as CellType
                )
            );
};

export const isCollision = (player: PlayerType, stage: StageType, pos:{moveX: number, moveY: number}) : boolean => {
    for (let y = 0; y < player.tetromino.length; y += 1){
        for(let x = 0; x < player.tetromino[y].length; x += 1){
            const cell = player.tetromino[y][x];
            if(cell !== 0){
                const newY = y + player.pos.y + pos.moveY;
                const newX = x + player.pos.x + pos.moveX;
                if(
                    !(stage[newY] &&
                    stage[newY][newX]) ||
                    stage[newY][newX][1] !== "clear"
                ){
                    return true;
                }
            }
            
        }
    }
    return false;
};