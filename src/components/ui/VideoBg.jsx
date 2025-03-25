import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function VideoBg() {
  const videoRef = useRef(null);
  const [videoTexture, setVideoTexture] = useState(null);

  const videoUrl = "./igris.mp4";

  useEffect(() => {
    const video = document.createElement("video");
    video.src = videoUrl;
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.play();

    videoRef.current = video;

    video.addEventListener("loadeddata", () => {
      const texture = new THREE.VideoTexture(video);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      setVideoTexture(texture);
    });

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
        videoRef.current.load();
      }
    };
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -5]}>
      <planeGeometry args={[50, 50]} />
      <meshBasicMaterial map={videoTexture} />
    </mesh>
  );
}

export default VideoBg;