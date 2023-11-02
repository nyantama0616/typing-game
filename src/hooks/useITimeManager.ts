import { useState, useRef } from "react";
import ITimeManager from "../interfaces/ITimeManager";

const INTERVAL = 33;

interface State {
    currentTime: number
    prevTime: number
}

const initialState = {
    currentTime: 0,
    prevTime: 0
}

export default function useTimeManager(): ITimeManager {
    const [state, setState] = useState<State>(initialState);
    const [prevTime, setPrevTime] = useState(0);
    const intervalRef = useRef<NodeJS.Timer | null>(null)

    function start() {
        if (intervalRef.current) clearInterval(intervalRef.current); //連続でstart()が呼ばれた時のため
        
        intervalRef.current = setInterval(() => {
            setState(prev => {
                const newState = {
                    currentTime: prev.currentTime + INTERVAL,
                    prevTime: prev.currentTime
                };
                return newState;
            });
            // console.log(1);
            
        }, INTERVAL);
    }
    
    function stop() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    function toggle() {
        if (intervalRef.current) {
            stop();
        } else {
            start();
        }
    }
    
    function reset() {
        stop();
        setState(initialState);
    }

    return {
        start,
        stop,
        reset,
        toggle,
        time: {
            current: state.currentTime,
            prev: state.prevTime,
            delta: state.currentTime - state.prevTime,
        }
    }
}
