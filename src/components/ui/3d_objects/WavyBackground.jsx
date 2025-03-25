import { useRef } from 'react';
import { MeshWobbleMaterial } from '@react-three/drei';

function WavyBackground() {
    const meshRef = useRef();
  
    return (
      <mesh ref={meshRef} position={[0, 0, -5]} scale={[20, 10, 1]}>
        <planeGeometry />
        <MeshWobbleMaterial 
          factor={0.4} 
          speed={2} 
          color="#000520"
          transparent
          opacity={0.8}
        />
      </mesh>
    );
  }

  export default WavyBackground;