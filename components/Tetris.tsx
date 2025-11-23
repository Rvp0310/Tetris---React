"use client";

import React, {useState} from "react";

// Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

// Custom Hooks
import { usePlayer } from "@/hooks/usePlayer";
import { useStage } from "@/hooks/useStage";

// Functions
import { randomTetromino } from "@/lib/tetrominos";
import { isCollision, stageMaker } from "@/lib/gameHelper";

const Tetris = () => {  
    console.log("----re-render----");
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, rotatePlayer] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

    const movePlayer = (dir : number) => {
        if(!isCollision(player, stage, {moveX: dir, moveY: 0})){
            updatePlayerPos({x: dir, y: 0, collided: false});
        }
    }

    const startGame = () => {
        //Reset
        setStage(stageMaker());
        resetPlayer();
    }

    const drop = () => {
        if(!isCollision(player, stage, {moveX: 0, moveY: 1})){
            updatePlayerPos({x: 0, y: 1, collided: false});
        } else {
            if(player.pos.y < 1){
                console.log("GAME OVER");
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({x: 0, y: 0, collided: true});
        }
    }

    const dropPlayer = () => {
        drop()
    }

    const move = (e: React.KeyboardEvent) => {
        e.preventDefault();
        if(!gameOver){
            if (e.key === "ArrowLeft"){
                movePlayer(-1);
            } else if (e.key === "ArrowRight"){
                movePlayer(1);
            } else if (e.key === "ArrowDown"){
                dropPlayer();
            } else if (e.key === " ") {
                rotatePlayer(stage, 1);
            }
        }
    }

    console.log("stage", stage);

    return(
        <div className="wrapper" role="button" tabIndex={0} onKeyDown={move}>
                <Stage stage = {stage} />
                <aside>
                    {
                    gameOver ? <Display text = "Game Over" gameOver = {gameOver} /> :
                    <div>
                        <Display text = "Score" gameOver = {gameOver} />
                        <Display text = "Rows" gameOver = {gameOver} />
                        <Display text = "Level" gameOver = {gameOver} />
                    </div>
                    }
                    <StartButton callback = {startGame} />
                </aside>
        </div>
    );
}

export default Tetris;