import { useEffect, useState } from "react";

import IKeyPressManager, { IKeyDownInfo } from "../interfaces/IKeyPressManager";

const initialKeyDownInfo: IKeyDownInfo = {
    count: 0,
    key: ""
}

export default function useKeyboardManager(): IKeyPressManager {
    const [keyDownInfo, setKeydownInfo] = useState<IKeyDownInfo>(initialKeyDownInfo);

    function handleKeyDown(e: React.KeyboardEvent<Element>) {
        console.log(`${e.key} from useKeyPress`);
        setKeydownInfo(prev => {
            const newKeydownInfo = {
                count: prev.count + 1,
                key: e.key
            };
            
            return newKeydownInfo;
        });
    }

    return {
        keyDownInfo,
        handleKeyDown
    }
}
