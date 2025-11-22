import React from "react";
import Cell from "./Cell";

import { TetrominoKey } from "@/lib/tetrominos";
import { STAGE_WIDTH } from "@/lib/gameHelper";
import { STAGE_HEIGHT } from "@/lib/gameHelper";

type CellType = [TetrominoKey, string]; 
type StageType = CellType[][];

const Stage = ({stage}: {stage: StageType }) => {
    return(
        <div className = 'stage' style={{display: "grid", gridTemplateRows: `repeat(${STAGE_HEIGHT}, calc(15vw / ${STAGE_WIDTH}))`, gridTemplateColumns: `repeat(${STAGE_WIDTH}, 1fr)`}}>
            {stage.map((row, y) => row.map((cell, x) => <Cell key = {`${x}-${y}`} type = {cell[0]} />))}
        </div>
    );
}

export default Stage;