import { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

import {
  Bloom,
  Vignette,
  Noise,
  EffectComposer,
} from "@react-three/postprocessing";

import { useTransition } from "../hooks/useTransition";
import { useAudio } from "../hooks/useAudio";

import BackgroundVideo from "../components/ui/BackgroundVideo";
import RotatingStars from "../components/ui/3d_objects/RotatingStars";
import VideoText3D from "../components/ui/3d_objects/VideoText3D";
import TextVideoBg from "../components/ui/3d_objects/TextVideoBg";
import FuturisticModal from "../components/modals/FuturisticModal";
import { Fluid } from "@whatisjery/react-fluid-distortion";

// import useAudioStore from "../store/useAudioStore";

const WelcomePage = () => {
  const { isMuted, isMusicStarted, startMusic, toggleSound, clickSound } = useAudio();
  // const { isMuted, isMusicStarted, startMusic, toggleSound,  clickSound } = useAudioStore();
  const { isTransitioning, showText, handleTransition } = useTransition();
  const [showModal, setShowModal] = useState(false);

  // Refs
  const ariseTextRef = useRef(null);
  const soloTextRef = useRef(null);
  const startButtonRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ariseTextRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    tl.fromTo(
      soloTextRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power2.out" }
    );

    tl.fromTo(
      startButtonRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power2.out" }
    );
  });

  const handleStart = () => {
    startMusic();
    handleTransition();
    clickSound.play();
    setShowModal(true);
  };

  return (
    <div
      className={`home-container relative h-screen w-screen overflow-hidden flex justify-center items-center text-white bg-cover bg-center ${
        isTransitioning ? "transitioning" : ""
      }`}
      style={
        {
          // backgroundImage: `url(${background})`,
          //   zIndex: `${zIndex}`,
        }
      }
      onClick={() => isMusicStarted || startMusic()} //play music on any screen click
    >
      <BackgroundVideo />

      {/* Sound control button */}
      {isMusicStarted && (
        <button
          onClick={toggleSound}
          className="absolute top-4 right-4 z-999 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors duration-200 border border-cyan-400/30 cursor-pointer"
        >
          {isMuted ? (
            <FaVolumeMute className="w-6 h-6 text-cyan-400" />
          ) : (
            <FaVolumeUp className="w-6 h-6 text-cyan-400" />
          )}
        </button>
      )}

      <Canvas>
        <ambientLight intensity={0.8} />
        <directionalLight position={[0, 0, 0]} intensity={3} />
        <RotatingStars />
        <VideoText3D />
        <TextVideoBg />
        <OrbitControls enableZoom={false} />

        <EffectComposer>
          <Bloom
            intensity={2.5}
            luminanceThreshold={0.9}
            luminanceSmoothing={0.025}
            mipmapBlur={true}
          />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />

          <Fluid showBackground={true} radius={0.25} />
        </EffectComposer>
      </Canvas>

      {showText && (
        <div
          className={`overlay absolute top-[90%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] text-center ${
            !showText && "fade-out"
          }`}
        >
          <div>
            <h1 ref={ariseTextRef} className="title arise hero-heading"></h1>
            <h2 ref={soloTextRef} className="title solo"></h2>
            <button
              ref={startButtonRef}
              className="start-button cursor-pointer z-[80] arise"
              onClick={handleStart}
            >
              Start
            </button>
          </div>
        </div>
      )}

      {/* {showModal && (
        <FuturisticModal
          setShowModal={setShowModal}
          clickSound={clickSound}
          // toggleSound={toggleSound}
        />
      )} */}

      {showModal && <FuturisticModal clickSound={clickSound}  setShowModal={setShowModal}/>}
    </div>
  );
};

export default WelcomePage;
