import { Image } from '@react-three/drei';
import { Vector3 } from "three";
import requests from '../../requests';

interface SushiCubeProps {
    position: Vector3
}
export default function SushiMesh({ position }: SushiCubeProps) {
    return (
        <mesh>
            <Image position={position} url={requests.fetchSushiImage} />
        </mesh>
    )
}
