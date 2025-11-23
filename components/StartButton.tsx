import React from "react";

const StartButton = ({callback}: {callback: () => void}) => {
    return(
        <div className = 'start' onClick={callback}>
            Start
        </div>
    );
}

export default StartButton;