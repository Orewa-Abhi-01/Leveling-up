import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { Text3D, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function TextVideoBg() {
  const textRef = useRef();
  const videoRef = useRef();
  const [videoTexture, setVideoTexture] = useState(null);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = "./jinwooBg.mp4"; // Place your video in public/videos folder
    video.crossOrigin = "anonymous";
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

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.5) ;
      textRef.current.position.z = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <Center position={[0, -1.5, 0]}>
      <Text3D
        ref={textRef}
        font="/fonts/Orbitron_Regular.json"
        size={0.9}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        letterSpacing={0.15}

        // castShadow 
        // receiveShadow
       

      >
        SOLO LEVELING
        <meshStandardMaterial
          map={videoTexture}
          toneMapped={true}
          transparent
          metalness={0.8}
          roughness={0.2}
         color={[0.25, 0.25, 1]}
          emissive={[0.1, 0.1, 0.7]}
          emissiveIntensity={1.5}
          // toneMapped={true}
          // transparent
          // metalness={0.8}
          // roughness={0.2}
          // emissive={[0.25, 0.25, 0.25]}
          // emissiveIntensity={1.5}

          // color={[1, 0.7, 1]}
          // opacity={15}
          // roughnessMap={videoTexture}
          // metalnessMap={videoTexture}
          // normalMap={videoTexture}
          // envMap={videoTexture}
          // wireframe
          // side
          // envMapIntensity={5}
          // clearcoat={1}
          // clearcoatRoughness={0.2}
          // outline
          // outlineColor={[1, 1, 1]}
          // outlineWidth={0.1}
          
          
        />
      </Text3D>
    </Center>
  );
}

export default TextVideoBg;