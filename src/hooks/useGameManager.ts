import { IGameManager } from "../interfaces/IGameManager";
import ITimeManager from "../interfaces/ITimeManager";
import useKeyboardManager from "./useKeyPressManager";
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

    return {
        questionManager,
        timeLimitManager
    }
}
