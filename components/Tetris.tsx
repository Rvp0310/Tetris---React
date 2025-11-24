"use client";

import React, {useState, useRef} from "react";

// Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

// Custom Hooks
import { useInterval } from "@/hooks/useInterval";
import { usePlayer } from "@/hooks/usePlayer";
import { useStage } from "@/hooks/useStage";
import { useGameStatus } from "@/hooks/useGameStatus";

// Functions
import { isCollision, stageMaker } from "@/lib/gameHelper";

const Tetris = () => {  
    console.log("----re-render----");
    const stageRef = useRef<HTMLDivElement | null>(null);
    const [dropTime, setDropTime] = useState<number | null>(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, rotatePlayer] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, rows, level, setLevel] = useGameStatus(rowsCleared);

    const movePlayer = (dir : number) => {
        if(!isCollision(player, stage, {moveX: dir, moveY: 0})){
            updatePlayerPos({x: dir, y: 0, collided: false});
        }
    }

    const startGame = () => {
        //Reset
        if(gameOver){
            setGameOver(false);
        }
        stageRef.current?.focus();
        setStage(stageMaker());
        resetPlayer();
    }

    const drop = () => {
        if(rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            setDropTime(1000 / (level + 1) + 200);
        }

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
        setDropTime(null);
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

    useInterval(() => {
        drop();
    }, 1000);

    return(
        <div className="wrapper">
                <div style={{width: "25%"}} ref={stageRef} role="button" tabIndex={0} onKeyDown={move}>
                    <Stage stage = {stage}/>
                </div>
                <aside>
                    {
                    gameOver ? <Display text = "Game Over" gameOver = {gameOver} /> :
                    <div>
                        <Display text = {`Score ${score}`} gameOver = {gameOver} />
                        <Display text = {`Rows ${rows}`} gameOver = {gameOver} />
                        <Display text = {`Level ${level}`} gameOver = {gameOver} />
                    </div>
                    }
                    <StartButton callback = {startGame}/>
                </aside>
        </div>
    );
}

export default Tetris;