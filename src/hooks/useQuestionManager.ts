import { useEffect, useState } from "react";
import IQuestion from "../interfaces/IQuestion";
import IQuestionManager from "../interfaces/IQuestionManager";
import IKeyPressManager from "../interfaces/IKeyPressManager";
import IQuestionGenerator from "../interfaces/IQuestionGenerator";
import useKanaAlphabet from "./useKanaAlphabet";

interface State {
    currentQuestion: IQuestion
    candidates: string[]
    pos: number //何番目の「かな」を注目しているか
    returnValue: ReturnValue
}

interface ReturnValue {
    question: string
    typedKeys: string
    unTypedKeys: string
    isCompleted: boolean
}

const initialReturnValue: ReturnValue = {
    question: "",
    typedKeys: "",
    unTypedKeys: "",
    isCompleted: false
}

const initialState: State = {
    currentQuestion: { kana: "", display: "" },
    candidates: [],
    pos: 0,
    returnValue: initialReturnValue
}

export default function useQuestionManager(keyPressManager: IKeyPressManager, questionGenerator: IQuestionGenerator): IQuestionManager {
    const [state, setState] = useState<State>(initialState);
    const { kanaToAlphabet, isLoaded } = useKanaAlphabet();

    useEffect(() => {
        if (!questionGenerator.isLoaded) return;
        
        //最初のQuestionをセット
        setState(prev => {
            const newState = { ...prev };
            _nextQuestion(newState);
            
            return newState;
        });
    }, [questionGenerator.isLoaded]);

    //キーが押された場合の処理
    useEffect(() => {
        if (!isLoaded || state.returnValue.isCompleted) return;
        
        setState(prev => {
            const newState = { ...prev };

            if (_checkKeyDown(keyPressManager.keyDownInfo.key, newState)) { //もし押されたキーが正しかったら
                newState.returnValue.question = state.currentQuestion.display;
                newState.returnValue.typedKeys += keyPressManager.keyDownInfo.key;
                newState.returnValue.unTypedKeys = _getUnTypedKeys(newState);
            }

            if (newState.candidates.length === 0) { //候補がなくなったら次の「かな」へ
                if (newState.pos >= newState.currentQuestion.kana.length) { //すべての「かな」をタイプし終えたら、next()が呼ばれるまで何もしない
                    newState.returnValue.isCompleted = true;
                    return newState;
                }

                newState.candidates = _getCandidates(newState);
                newState.returnValue.unTypedKeys = _getUnTypedKeys(newState);
            }
            
            return newState;
        });
    }, [keyPressManager.keyDownInfo]);

    function _getCandidates(_state: State): string[] {
        let res: string[] = [];
        
        const targetKana = _state.currentQuestion.kana[_state.pos];
        
        ++_state.pos;

        if (targetKana === 'っ') {
            const candidates = _getCandidates(_state);
            candidates.forEach(candidate => {
                res.push(candidate[0] + candidate);
                kanaToAlphabet("っ")?.forEach(alphabet => {
                    res.push(alphabet + candidate);
                })
            });
            return res;
        } else if (targetKana === "ん" && _state.pos < _state.currentQuestion.kana.length) {
            const candidates = _getCandidates(_state);
            candidates.forEach(candidate => {
                if (candidate[0] !== "n" && candidate[0] !== "y") {
                    res.push("n" + candidate);
                }

                kanaToAlphabet("ん")?.forEach(alphabet => {
                    res.push(alphabet + candidate);
                });
            });
            return res;
        }

        const t = 0 < _state.pos && _state.pos < _state.currentQuestion.kana.length ?  kanaToAlphabet(_state.currentQuestion.kana.slice(_state.pos - 1, _state.pos + 1)) : undefined;
        const alphabet = kanaToAlphabet(targetKana);
        if (alphabet === undefined) {
            console.log(_state);
            console.error(`no alphabet!!! targetKana: ${targetKana}`);
        }
        if (t !== undefined) { //例: ちょ
            res.push(...t); //例: ["tyo", "cho"]
            
            const targetKana2 = _state.currentQuestion.kana[_state.pos];
            const alphabet2 = kanaToAlphabet(targetKana2);
            if (alphabet2 === undefined) {
                console.log(_state);
                console.error(`no alphabet!!! targetKana2: ${targetKana2}`);
            }
            //例: ["tilyo", "tixyo", "chilyo", "chixyo"]
            alphabet!.forEach(alpha => {
                alphabet2!.forEach(alpha2 => {
                    res.push(alpha + alpha2); //例: 
                });
            });
            ++_state.pos;
        } else {
            res.push(...alphabet!);
        }

        return res;
    }

    function _getUnTypedKeys(_state: State) {
        let res = _state.candidates.length > 0 ? _state.candidates[0] : "";
        
        const n = _state.currentQuestion.kana.length;
        for (let i = _state.pos; i < n; i++) {
            try {
                res += kanaToAlphabet(_state.currentQuestion.kana[i])![0];
            } catch (e) {
                const errorInfo = {
                    state: _state,
                    i: i
                };
                console.log(errorInfo);
                throw e;
            }
        }
        
        return res;
    }

    function _checkKeyDown(key: string, _state: State) {
        let newCandidates: string[] = [];
        let flag: boolean = false;
        for (let i = 0; i < _state.candidates.length; i++) {
            if (key === _state.candidates[i][0]) { //正解
                flag = true;
                const n = _state.candidates[i].length;
                if (n > 1) {
                    const x = _state.candidates[i].slice(1, n);
                    newCandidates.push(x);
                }
            }
        }

        if (flag) {
            _state.candidates = newCandidates;
        }
        return flag;
    }

    function _nextQuestion(_state: State) {
        _state.pos = 0;
        _state.candidates = [];
        _state.currentQuestion = questionGenerator.getNextQuestion();

        _state.returnValue = {
            question: _state.currentQuestion.display,
            typedKeys: "",
            unTypedKeys: "",
            isCompleted: false
        };

        _state.candidates = _getCandidates(_state);

        _state.returnValue.question = _state.currentQuestion.display;
        _state.returnValue.unTypedKeys = _getUnTypedKeys(_state);
    }

    function next() {
        setState(prev => {
            const newState = { ...prev };
            _nextQuestion(newState);
            return newState;
        });
    }
    
    return {
        ...state.returnValue,
        next
    }
}
