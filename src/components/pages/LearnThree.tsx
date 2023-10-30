import { useEffect, useState, useRef } from "react";
import { OrbitControls, Environment, Image, Text } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { Vector3 } from "three";
import requests from "../../requests";
import "./LearnThree.css";
export default function LearnThree() {
    const [x, setX] = useState(-10);
    const [time, setTime] = useState(0);
    const intervalRef = useRef<NodeJS.Timer | null>(null);
    useEffect(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setX(prev => {
                let newX = prev + 0.1;
                if (newX > 10) newX = -10;
                return newX;
            });
        }, 33);
    }, []);
    return (
        <div className="learn-three">
            <h1>Learn Three</h1>
            <Canvas>
                <OrbitControls />
                <QuestionMesh text="hello" position={new Vector3(0, 1, 0)}/>
                <SushiMesh position={new Vector3(x, 0, 0)} />
                <pointLight position={[10, 10, 10]} />
                <Environment preset="sunset" blur={0.7} background />
            </Canvas>
        </div>
    )
}

interface SushiCubeProps {
    position: Vector3
}
function SushiMesh({position}: SushiCubeProps) {
    return (
        <mesh>
            <Image position={position} url={requests.fetchSushiImage} />
        </mesh>
    )
}
 
interface QuestionMeshProps {
    text: string,
    position: Vector3
}
function QuestionMesh({ text, position }: QuestionMeshProps) {
    const position2 = position.clone().add(new Vector3(0, -2, 0));
    return (
        <mesh>
            <Text position={position}
                color="#000"
                fontSize={2}
            >
                {text}
            </Text>
            <Text position={position2}
                color="#000"
                fontSize={1}
            >
                {text}
            </Text>
        </mesh>
    )
}
