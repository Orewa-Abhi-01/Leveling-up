import * as THREE from "three";

function TextGlow() {
    return (
      <mesh position={[2.2, 0.6, 0]} scale={[6, 1.3, 1.1]}>
        <planeGeometry />
        <meshBasicMaterial
          color={[0.4, 0.8, 1]}
          transparent
          // opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    );
  }
  
  export default TextGlow;