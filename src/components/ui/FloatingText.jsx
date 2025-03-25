import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function FloatingText() {
  const textRef = useRef();
  const materialRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (textRef.current) {
      textRef.current.position.x = Math.sin(t) * 0.4;
      textRef.current.position.y = Math.tan(t * 0.8) * 0.1;
    }

    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 0.5 + Math.sin(t * 2) * 0.2;
    }
  });

  return (
    <Center position={[0, 3, 0]}>
      {/* <TextGlow/> */}
      <Text3D
        ref={textRef}
        font="/fonts/Orbitron_Regular.json"
        size={1}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        Level Up
        <meshStandardMaterial
          color={[0.1, 0.8, 1]}
          emissive={[0.2, 0.5, 1]}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Text3D>
    </Center>
  );
}

export default FloatingText;