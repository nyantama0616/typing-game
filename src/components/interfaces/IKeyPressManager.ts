export default interface IKeyPressManager {
    keyDownInfo: IKeyDownInfo
}

export interface IKeyDownInfo {
    count: number //キーが今までに押された回数. 多分countがないと、前回と同じキーを押された時にstateが更新されない
    key: string //どのキーが押されたか
}
