import React from "react";
import useKeyboardManager from "../../hooks/useKeyPressManager";
import useQuestionManager from "../../hooks/useQuestionManager";

import "./TopPage.css";

export default function TopPage() {
    const keyboardManager = useKeyboardManager();
    const questionManager = useQuestionManager(keyboardManager);

    return (
        <div className="top-page">
            <h1>Top Page</h1>
            <h3>{questionManager.question}</h3>
            <p><span className="typed-keys">{questionManager.typedKeys}</span><span className="untyped-keys">{questionManager.unTypedKeys}</span></p>
        </div>
    )
}
