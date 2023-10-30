import { useEffect, useState, useRef } from "react";
import { OrbitControls, Environment, Image } from '@react-three/drei';
import { Canvas, useLoader, Vector3 } from '@react-three/fiber';
import requests from "../../requests";
// import {ImageLo}
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
                {/* <Box position={[-1.2, 0, 0]} /> */}
                <SushiCube position={[x, 0, 0]} />
                <pointLight position={[10, 10, 10]} />
                <Environment preset="sunset" blur={0.7} background />
            </Canvas>
        </div>
    )
}

// interface BoxProps {
//     position: any
// }
// const Box = ({position}: BoxProps) => {
//     const [color, setColor] = useState<string>('hotpink')
//     return (
//         <mesh
//             onClick={() => {
//                 color === 'hotpink' ? setColor('orange') : setColor('hotpink')
//             }}>
//             {/* <Box position={[0, 0, 0]}/> */}
//             {/* <boxGeometry args={[1, 2, 3]} /> */}
//             <meshStandardMaterial color={color} />
//         </mesh>
//     )
// }

interface SushiCubeProps {
    position: Vector3
}
function SushiCube({position}: SushiCubeProps) {
    return (
        <mesh>
            <Image position={position} url={requests.fetchSushiImage} />
        </mesh>
    )
}
