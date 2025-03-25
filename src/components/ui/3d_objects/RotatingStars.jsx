import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

const RotatingStars = () => {
  const starsRef = useRef();

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.003;
      // starsRef.current.rotation.x += 0.002;
      // starsRef.current.rotation.z += 0.001;
    }
  });

  return (
    <Stars
      radius={120}
      depth={50}
      count={4000}
      factor={4}
      saturation={0}
      ref={starsRef}
    />
  );
};

export default RotatingStars; 