import { OrbitControls, Environment, Image, Text } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { Vector3 } from "three";
import IQuestionManager from '../../interfaces/IQuestyonManager';
import SushiMesh from '../compounds/SushiMesh';
import "./TypingGame.css";

interface TypingGameProps {
    questionManager: IQuestionManager
}
export default function TypingGame({questionManager}: TypingGameProps) {
    return (
        <div className="typing-game">
            <Canvas>
                <OrbitControls />
                <SushiMesh position={new Vector3(0, 0, 0)} />
                <pointLight position={[10, 10, 10]} />
                <Environment preset="sunset" blur={0.7} background />
            </Canvas>
            <div className='question'>
                <h1>{questionManager.question}</h1>
                <h3><span className="typed-keys">{questionManager.typedKeys}</span><span className="untyped-keys">{questionManager.unTypedKeys}</span></h3>
            </div>
        </div>
    )
}
