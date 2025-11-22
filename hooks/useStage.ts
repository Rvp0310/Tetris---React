import { useState } from "react";

import { stageMaker } from "@/lib/gameHelper";

export const useStage = (player: any) => {
    const [stage, setStage] = useState(stageMaker());

    return [stage, setStage];
}