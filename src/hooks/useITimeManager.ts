import { useState, useRef } from "react";
import ITimeManager from "../interfaces/ITimeManager";

const INTERVAL = 33;

export default function useTimeManager(): ITimeManager {
    const [time, setTime] = useState(0);
    const intervalRef = useRef<NodeJS.Timer | null>(null)

    function start() {
        if (intervalRef.current) clearInterval(intervalRef.current); //連続でstart()が呼ばれた時のため
        
        intervalRef.current = setInterval(() => {
            setTime(prev => prev + INTERVAL);
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
        setTime(0);
    }

    return {
        time,
        start,
        stop,
        reset,
        toggle
    }
}
