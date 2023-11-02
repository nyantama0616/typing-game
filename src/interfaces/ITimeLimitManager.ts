export default interface ITimeLimitManager {
    LIMIT_ON_SET: number //1セットの制限時間
    remainingTime: number //ゲームの残り時間
    passedTimeOnSet: number //1セットの経過時間
    start(): void //制限時間の管理スタート
    resetPassedTimeOnSet(): void //1セットの経過時間を0に
}
