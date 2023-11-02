import { useEffect } from "react";
import { IGameManager } from "../interfaces/IGameManager";
import useQuestionGenerator from "./useQuestionGenerator";
import useQuestionManager from "./useQuestionManager";
import useTimeLimitManager from "./useTimeLimitManager";
import IKeyPressManager from "../interfaces/IKeyPressManager";
import useTimeManager from "./useITimeManager";

export default function useGameManager(keyboardManager: IKeyPressManager): IGameManager {
    const timeManager = useTimeManager();
    const questionGenerator = useQuestionGenerator();
    const questionManager = useQuestionManager(keyboardManager, questionGenerator);
    const timeLimitManager = useTimeLimitManager(timeManager);

    useEffect(() => {
        if (timeLimitManager.passedTimeOnSet > timeLimitManager.LIMIT_ON_SET) {
            timeLimitManager.resetPassedTimeOnSet();
            questionManager.next();
        }
    }, [timeLimitManager.passedTimeOnSet]);

    useEffect(() => {
        if (questionManager.isCompleted) {
            timeLimitManager.resetPassedTimeOnSet();
            questionManager.next();
        }
    }, [questionManager.isCompleted]);

    return {
        questionManager,
        timeLimitManager
    }
}
