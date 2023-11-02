import useGameManager from "../../hooks/useGameManager";
import useKeyboardManager from "../../hooks/useKeyPressManager";
import TypingGame from "../organisms/TypingGame";

import "./TopPage.css";

export default function TopPage() {
    const keyboardManager = useKeyboardManager();
    const gameManager = useGameManager(keyboardManager);

    return (
        <div className="top-page" tabIndex={0} onKeyDown={e => keyboardManager.handleKeyDown(e)}>
            <TypingGame gameManager={gameManager}/>
        </div>
    )
}
