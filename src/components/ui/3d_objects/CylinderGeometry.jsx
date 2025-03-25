import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function CylinderGeometry() {
    const cylinderRef = useRef();

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
      if (cylinderRef.current) {
        cylinderRef.current.rotation.y += delta;
      }
    });
    return (
      <group position={[-4, 2, 0]} rotation={[0, 0.4, 0.3]} ref={cylinderRef}>
        <mesh>
          <torusGeometry args={[1.6, 1, 1.7, 60, 60, true]} />
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

  export default CylinderGeometry;




      // const textureRef = useRef(null);
  
    // const videoRef = useRef(null);
    // const [videoReady, setVideoReady] = useState(false);
    // const [error, setError] = useState(null);
  
    // useEffect(() => {
    //   const video = document.createElement("video");
    //   videoRef.current = video;
  
    //   video.src = "./igris.mp4"; // Replace with your video file path
    //   video.crossOrigin = "Anonymous";
    //   video.loop = true;
    //   video.muted = true;
  
    //  const handleCanPlay = () => {
    //     const texture = new THREE.VideoTexture(video);
    //     texture.minFilter = THREE.LinearFilter;
    //     texture.magFilter = THREE.LinearFilter;
    //     texture.generateMipmaps = false;
    //     textureRef.current = texture;
    //     setVideoReady(true);
    //   };
  
    //   const handleError = (e) => {
    //     setError("Failed to load video");
    //     console.error("Video loading error:", e);
    //   };
  
    //   video.addEventListener('canplaythrough', handleCanPlay);
    //   video.addEventListener('error', handleError);
  
    //   return () => {
    //     if (video) {
    //       video.pause();
    //       video.src = "";
    //       video.load();
    //       video.removeEventListener('canplaythrough', handleCanPlay);
    //       video.removeEventListener('error', handleError);
    //     }
    //     if (textureRef.current) {
    //       textureRef.current.dispose();
    //     }
    //   };
    // }, []);
  
    // let tex = useTexture("./igris.mp4");
  
    // Adjust texture repeat to fit the geometry properly
    // tex.wrapS = THREE.RepeatWrapping;
    // tex.wrapT = THREE.RepeatWrapping;
    // tex.repeat.set(2, 1);  // Adjust the repeat if necessary (e.g., set(1, 2) for vertical stretching)
  