import axios from "axios";
import { useEffect, useState } from "react";
import IQuestion from "../components/interfaces/IQuestion";
import IQuestionGenerator from "../components/interfaces/IQuestionGenerator";
import requests from "../requests";

interface Data {
    questions: IQuestion[],
    isLoaded: boolean
}

export default function useQuestionGenerator(): IQuestionGenerator {
    const [data, setData] = useState<Data>({ questions: [], isLoaded: false });
    const [num, setNum] = useState<number>(0);

    useEffect(() => {
        axios
            .get(requests.fetchWords)
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
