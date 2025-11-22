"use client";

import React, {useState} from "react";

// Functions
import { stageMaker } from "@/lib/gameHelper";

// Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

// Custom Hooks
import { usePlayer } from "@/hooks/usePlayer";
import { useStage } from "@/hooks/useStage";

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player] = usePlayer();
    const [stage, setStage] = useStage(player);

    return(
        <div className="wrapper">
                <Stage stage = {stageMaker()} />
                <aside>
                    <Display text = "Score" gameOver = {false} />
                    <Display text = "Rows" gameOver = {false} />
                    <Display text = "Level" gameOver = {false} />
                    <StartButton callback = "callback" />
                </aside>
        </div>
    );
}

export default Tetris;