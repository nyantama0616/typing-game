export default interface IQuestionManager {
    question: string //例: 「下から読んでも新聞紙」
    typedKeys: string //例: sitak
    unTypedKeys: string //例: arayondemosinbunsi
    isCompleted: boolean //現在の問題がタイピング完了しているかどうか
    next(): void //次の問題へ
}
