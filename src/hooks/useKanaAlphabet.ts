import { useState, useEffect } from "react";
import requests from "../requests";
import axios from "axios";

interface State {
    kanaAlphabetDict: { [key: string]: string[] } | null,
    isLoaded: boolean
}

export default function useKanaAlphabet() {
    const [state, setState] = useState<State>({ kanaAlphabetDict: null, isLoaded: false})
    
    useEffect(() => {
        // サーバから「かな」と「ローマ字」の対応表を取ってきて、kanaAlphabetDictにsetする
        axios
            .get(requests.fetchKanaAlphabet)
            .then(res => {
                const dict: { [key: string]: string[] } = {};
                const kana_alphabet: { [key: string]: string } = res.data["kana_alphabet"];
                for (let key in kana_alphabet) {
                    dict[key] = kana_alphabet[key].split(" ");
                }

                setState(_ => {
                    console.log(dict);
                    
                    return {
                        kanaAlphabetDict: dict,
                        isLoaded: true
                    }
                })
            });
    }, []);

    function kanaToAlphabet(kana: string) {
        return state.kanaAlphabetDict![kana];
    }

    return {
        kanaToAlphabet,
        isLoaded: state.isLoaded
    };
}
