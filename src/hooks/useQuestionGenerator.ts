import { useState } from "react";
import IQuestionGenerator from "../components/interfaces/IQuestionGenerator";

const questions = [
    {
        kana: "しゃもじ",
        display: "しゃもじ"
    },
    {
        kana: "じゃっく",
        display: "ジャック"
    },
];

export default function useQuestionGenerator(): IQuestionGenerator {
    const [num, setNum] = useState<number>(0);

    function getNextQuestion() {
        setNum(prev => {
            return prev + 1;
        });
        return questions[num % questions.length];
    }

    return {
        getNextQuestion
    }
}
