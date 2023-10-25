import { useEffect, useState } from "react";
import { useKeyPressEvent } from "react-use";

import IKeyPressManager, { IKeyDownInfo } from "../components/interfaces/IKeyPressManager";

const initialKeyDownInfo: IKeyDownInfo = {
    count: 0,
    key: ""
}

export default function useKeyboardManager(): IKeyPressManager {
    const [keyDownInfo, setKeydownInfo] = useState<IKeyDownInfo>(initialKeyDownInfo);
    
    useKeyPressEvent(() => true, _handleKeydown, _handleKeyup);

    function _handleKeydown(e: KeyboardEvent) {
        setKeydownInfo(prev => {
            const newKeydownInfo = {
                count: prev.count + 1,
                key: e.key
            };
            return newKeydownInfo;
        });
    }
    
    function _handleKeyup(e: KeyboardEvent) {

    }

    return {
        keyDownInfo
    }
}
