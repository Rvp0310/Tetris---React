export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 28;

export const stageMaker = () => {
    return Array.from(Array(STAGE_HEIGHT), () => 
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    );
};