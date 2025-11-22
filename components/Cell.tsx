import React from "react";

import { TETROMINOS } from "@/lib/tetrominos";
import { TetrominoKey } from "@/lib/tetrominos";

const Cell = ({type}: {type: TetrominoKey}) => {
    const [r, g, b] = TETROMINOS[type].color;
    return(
        <div className = 'cell' style={{backgroundColor: `rgba(${r}, ${g}, ${b}, 0.95)`, border: `rgba(${r}, ${g}, ${b}, 0.1)`, borderBottomColor: `rgba(${r}, ${g}, ${b}, 1)`, borderTopColor: `rgba(${r}, ${g}, ${b}, 0.1)`, borderRightColor: `rgba(${r}, ${g}, ${b}, 1)`, borderLeftColor: `rgba(${r}, ${g}, ${b}, 0.3)`}}>
        </div>
    );
}

export default Cell;