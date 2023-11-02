export default interface ITimeManager {
    start(): void //開始
    stop(): void //一時停止
    reset(): void //停止し、timeを0に
    toggle(): void //start or stop
    time: Time
}

export interface Time {
    current: number, //ms
    prev: number,
    delta: number
}
