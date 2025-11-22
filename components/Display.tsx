import React from "react";

const Display = ({gameOver, text}: {text: string, gameOver: boolean}) => {
    return (
        <div className = 'field' style={{color: gameOver? 'red' : '#999'}}>
            {text}
        </div>
    );
}

export default Display;