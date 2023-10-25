import { useState } from "react";
import IQuestion from "../components/interfaces/IQuestion";
import IQuestionManager from "../components/interfaces/IQuestyonManager";
import { kanaToAlphabet } from "../components/utilities/utilities";
import IKeyPressManager from "../components/interfaces/IKeyPressManager";

// interface State {
//     currentQuestion: IQuestion
//     candidates: string[]
//     pos: number //何番目の「かな」を注目しているか
// }

// const initialState: State = {
//     currentQuestion: { kana: "", display: "" },
//     candidates: [],
//     pos: 0,
// }

export default function useQuestionManager(keyPressManager: IKeyPressManager): IQuestionManager {
    // const [state, setState] = useState<State>(initialState);

    // function _getCandidates(_state: State): string[] {
    //     let res: string[] = [];
        
    //     const targetKana = _state.currentQuestion.kana[_state.pos];
    //     ++_state.pos;
    //     if (targetKana === 'っ') {
    //         const candidates = _getCandidates(_state);
    //         candidates.forEach(candidate => {
    //             res.push(candidate[0] + candidate);
    //             kanaToAlphabet("っ")?.forEach(alphabet => {
    //                 res.push(alphabet + candidate);
    //             })
    //         });
    //     } else {
    //         const alphabet = kanaToAlphabet(_state.currentQuestion.kana[_state.pos]);
    //         if (alphabet !== undefined) {
    //             res.push(...alphabet);
    //         } else {
    //             console.error(`no alphabet!!! state: ${_state}`);
    //         }
    //     }

    //     //「ちょ」とかの場合
    //     const t = _state.pos > 0 ?  kanaToAlphabet(_state.currentQuestion.kana.slice(_state.pos - 1, _state.pos + 1)) : undefined;
    //     if (t !== undefined) {
    //         ++_state.pos;
    //         res.push(...t);
    //     }
        
    //     return res;
    // }
    
    return {
        question: "下から読んでも新聞紙",
        typedKeys: "sitak",
        unTypedKeys: "arayondemosinbunsi"
    }
}
