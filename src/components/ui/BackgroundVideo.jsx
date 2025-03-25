import { useRef, useEffect } from "react";

const BackgroundVideo = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute top-0 left-0 min-w-full min-h-full w-auto h-auto object-cover -z-1"
      autoPlay
      loop
      muted
      playsInline
      style={{ filter: "brightness(0.6)" }}
    >
      <source src="/videos/jinwooBg.mp4" type="video/mp4" />
    </video>
  );
};

export default BackgroundVideo;