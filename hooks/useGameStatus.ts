import { useState, useEffect, useCallback, Dispatch, SetStateAction } from "react";

export const useGameStatus = (rowsCleared: number): [number, number, number, Dispatch<SetStateAction<number>>] => {
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);

    const linePoints = [40, 100, 300, 1200];

    useEffect (() => {
        if(rowsCleared > 0){
            rowsCleared = rowsCleared / 2;  // because the row cleared is double in development mode
            setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1));
            setRows(prev => prev + rowsCleared);  
        }
    },[rowsCleared]);

    return [score, rows, level, setLevel];
}
