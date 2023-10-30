import React, { useEffect } from "react";
import useKeyboardManager from "../../hooks/useKeyPressManager";
import useQuestionGenerator from "../../hooks/useQuestionGenerator";
import useQuestionManager from "../../hooks/useQuestionManager";
import TypingGame from "../organisms/TypingGame";

import "./TopPage.css";

export default function TopPage() {
    const keyboardManager = useKeyboardManager();
    const questionGenerator = useQuestionGenerator();
    const questionManager = useQuestionManager(keyboardManager, questionGenerator);

    return (
        <div className="top-page" tabIndex={0} onKeyDown={e => keyboardManager.handleKeyDown(e)}>
            <TypingGame questionManager={questionManager}/>
        </div>
    )
}
