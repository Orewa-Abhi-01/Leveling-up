import { useMemo, useState, useRef, useEffect } from "react";
import {  useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { Text3D, Center } from "@react-three/drei";

function VideoText3D() {
  const textRef = useRef();
  const [videoTexture, setVideoTexture] = useState(null);
  // const materialRef = useRef();

  // Load the font
  // const font = useLoader(THREE.FontLoader, "/fonts/Orbitron_Regular.json");

  useEffect(() => {
    // Create video element
    const video = document.createElement("video");
    video.src = "./videos/background.mp4"; // Use your video path
    video.crossOrigin = "Anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    // When video is ready, create texture
    video.addEventListener("loadeddata", () => {
      const texture = new THREE.VideoTexture(video);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      setVideoTexture(texture);
      video.play();
    });

    return () => {
      video.pause();
      video.src = "";
      video.load();
    };
  }, []);

  // Animate the text
  // useFrame(({ clock }) => {
  //   const t = clock.getElapsedTime();

  //   if (textRef.current) {
  //     textRef.current.position.y = Math.sin(t * 0.5) * 0.1;
  //     textRef.current.position.x = Math.sin(t) * 0.4;
  //   }
  // });

  // Create material with custom shader to use video texture
  const videoMaterial = useMemo(() => {
    if (!videoTexture) return null;

    // Create shader material that shows video inside text
    return new THREE.ShaderMaterial({
      uniforms: {
        videoTexture: { value: videoTexture },
        time: { value: 0 },
      },
      vertexShader: `
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
      fragmentShader: `
            uniform sampler2D videoTexture;
            uniform float time;
            varying vec2 vUv;
            
            void main() {
              vec2 uv = vUv;
              vec4 videoColor = texture2D(videoTexture, uv);
              
              // Add some effects to make it more interesting
              float brightness = 1.2 + 0.2 * sin(time);
              videoColor.rgb *= brightness;
              
              gl_FragColor = videoColor;
            }
          `,
      side: THREE.DoubleSide,
    });
  }, [videoTexture]);

  useFrame(({ clock }) => {
    if (videoMaterial) {
      videoMaterial.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <Center position={[-2.2, -0.5, 0]}>
      {videoMaterial && (
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
          material={videoMaterial}
        >
          ARISE
        </Text3D>
      )}
    </Center>
  );
}

export default VideoText3D;