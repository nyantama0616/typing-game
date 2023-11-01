import axios from "axios";
import { useEffect, useState } from "react";
import IQuestion from "../interfaces/IQuestion";
import IQuestionGenerator from "../interfaces/IQuestionGenerator";
import requests from "../requests";

const LIMIT_WORDS_COUNT = 100;
interface Data {
    questions: IQuestion[],
    isLoaded: boolean
}

export default function useQuestionGenerator(): IQuestionGenerator {
    const [data, setData] = useState<Data>({ questions: [], isLoaded: false });
    const [num, setNum] = useState<number>(0);

    useEffect(() => {
        const config = {
            params: {
                shuffle: true,
                limit: LIMIT_WORDS_COUNT
            }
        };

        axios
            .get(requests.fetchWords, config)
            .then(res => {
                const words: string[][] = res.data["words"];
                const questions: IQuestion[] = words.map(x => {
                    return {
                        kana: x[0],
                        display: x[1]
                    }
                });
                
                setData(_ => {
                    return {
                        questions: questions,
                        isLoaded: true
                    }
                });
            });
    }, []);

    function getNextQuestion() {
        const question = data.questions[num % data.questions.length];
        setNum(prev => {
            return prev + 1;
        });
        return question;
    }

    return {
        getNextQuestion,
        isLoaded: data.isLoaded
    }
}

export function useQuestionGeneratorTest(): IQuestionGenerator {
    const [num, setNum] = useState<number>(0);

    const questions = [
        // {
        //     kana: "かんきつるい",
        //     display: "柑橘類"
        // },
        // {
        //     kana: "あんにんどうふ",
        //     display: "杏仁豆腐"
        // },
        // {
        //     kana: "ぱっくんちょ",
        //     display: "ぱっくんちょ"
        // },
        {
            kana: "こんやはこんにゃく",
            display: "今夜はこんにゃく"
        },
    ]
    function getNextQuestion() {
        const question = questions[num % questions.length];
        setNum(prev => {
            return prev + 1;
        });
        return question;
    }

    return {
        getNextQuestion,
        isLoaded: true
    }
}
