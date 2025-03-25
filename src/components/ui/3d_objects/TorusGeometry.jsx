import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function TorusGeometry() {
    const torusRef = useRef();
    const videoRef = useRef(null);
    const [videoTexture, setVideoTexture] = useState(null);
  
    const videoUrl = "./igris.mp4";
  
    useEffect(() => {
      const video = document.createElement("video");
      video.src = videoUrl;
      video.crossOrigin = "Anonymous";
      video.loop = true;
      video.muted = true;
  
      videoRef.current = video;
  
      video.addEventListener("loadeddata", () => {
        const texture = new THREE.VideoTexture(video);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        setVideoTexture(texture);
        video.play();
      });
  
      return () => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.src = "";
          videoRef.current.load();
        }
      };
    }, []);
  
    useFrame((state, delta) => {
      if (torusRef.current) {
        torusRef.current.rotation.y += delta;
      }
    });
  
    return (
      <group position={[-4, 2, 0]}  ref={torusRef}>
        <mesh rotation={[4, 0, 0]}>
          {/* Replace cylinderGeometry with torusGeometry */}
          <torusGeometry args={[1, 0.3, 60, 60]} />
          <meshStandardMaterial
            map={videoTexture}
            side={THREE.DoubleSide}
            transparent
            roughness={0.2}
            metalness={0.2}
            emissive={0x000000}
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
    );
  }

  export default TorusGeometry