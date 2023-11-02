import { useEffect, useState } from "react";
import ITimeLimitManager from "../interfaces/ITimeLimitManager";
import ITimeManager from "../interfaces/ITimeManager";

interface State {
    remainingTime: number
    passedTimeOnSet: number
}

const initialState = {
    remainingTime: 0,
    passedTimeOnSet: 0
}

const LIMIT_ON_SET = 5000; //ms

export default function useTimeLimitManager(timeManager: ITimeManager): ITimeLimitManager {
    const [state, setState] = useState<State>(initialState);

    useEffect(() => {
        if (timeManager.time.delta === 0) return;
        
        setState(prev => {
            const newState = { ...prev };
            newState.remainingTime -= timeManager.time.delta;
            newState.passedTimeOnSet += timeManager.time.delta;
            return newState;
        });
    }, [timeManager.time.current]);
    
    function start() {
        timeManager.start();
    }

    function resetPassedTimeOnSet() {
        setState(prev => {
            const newState = { ...prev };
            newState.passedTimeOnSet = 0;
            return newState;
        });
    }

    return {
        LIMIT_ON_SET,
        ...state,
        start,
        resetPassedTimeOnSet
    }
}
