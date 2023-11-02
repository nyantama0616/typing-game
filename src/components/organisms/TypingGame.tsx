import { useState } from 'react';
import { OrbitControls, Environment, Image, Text } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { useEffect } from 'react';
import { Vector3 } from "three";
import { IGameManager } from '../../interfaces/IGameManager';
import SushiMesh from '../compounds/SushiMesh';
import "./TypingGame.css";

interface TypingGameProps {
    gameManager: IGameManager
}
export default function TypingGame({ gameManager }: TypingGameProps) {
    const START_SUSHI_X = -5.5;
    const END_SUSHI_X = 5.5;
    const [x, setX] = useState(0);

    useEffect(() => {
        gameManager.timeLimitManager.start();
    }, []);

    useEffect(() => {
        setX(_lerp(START_SUSHI_X, END_SUSHI_X, gameManager.timeLimitManager.passedTimeOnSet / gameManager.timeLimitManager.LIMIT_ON_SET));
    }, [gameManager.timeLimitManager.passedTimeOnSet]);

    function _lerp(start: number, end: number, ease: number) {
        return start * (1 - ease) + end * ease;
    }

    return (
        <div className="typing-game">
            <Canvas>
                <OrbitControls />
                <SushiMesh position={new Vector3(x, 0, 0)} />
                <pointLight position={[10, 10, 10]} />
                <Environment preset="sunset" blur={0.7} background />
            </Canvas>
            <div className='question'>
                <h1>{gameManager.questionManager.question}</h1>
                <h3><span className="typed-keys">{gameManager.questionManager.typedKeys}</span><span className="untyped-keys">{gameManager.questionManager.unTypedKeys}</span></h3>
            </div>
        </div>
    )
}
