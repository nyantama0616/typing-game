import React from "react";
export default interface IKeyPressManager {
    keyDownInfo: IKeyDownInfo //押されたキーの情報
    handleKeyDown(e: React.KeyboardEvent<Element>): void //この関数をdiv要素などのonKeyDownにセットする
}

export interface IKeyDownInfo {
    count: number //キーが今までに押された回数. 多分countがないと、前回と同じキーを押された時にstateが更新されない
    key: string //どのキーが押されたか
}
