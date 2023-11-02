import IQuestionManager from "./IQuestionManager";
import ITimeLimitManager from "./ITimeLimitManager";

export interface IGameManager {
    questionManager: IQuestionManager
    timeLimitManager: ITimeLimitManager
}
