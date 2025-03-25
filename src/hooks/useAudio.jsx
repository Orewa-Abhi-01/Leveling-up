// import { useState, useRef, useEffect } from "react";
// import { Howl } from "howler";
// import clickSoundFile from "../assets/music/click-for-game-menu.mp3";
// import bgMusicFile from "../assets/music/DARK-ARIA-LV2.mp3";
// import arise from "../assets/music/arise_solo_leveling.mp3";

// export const useAudio = () => {
//   const [isMuted, setIsMuted] = useState(false);
//   const [isMusicStarted, setIsMusicStarted] = useState(false);
//   const bgMusicRef = useRef(null);
  

//   // Sound effects
//   const clickSound = new Howl({
//     src: [clickSoundFile],
//     volume: 1,
//   });

//   //latest addition from FuturisticModal.jsx
//   const ariseSound = new Howl({
//     src: [arise],
//     loop: false,
//     volume: 0.5,
//     duration: 5000,
//   });

//   useEffect(() => {
//     bgMusicRef.current = new Howl({
//       src: [bgMusicFile],
//       volume: 0.5,
//       loop: true,
//       autoplay: false,
//     });

//     return () => bgMusicRef.current?.unload();
//   }, []);

//   const startMusic = () => {
//     if (!isMusicStarted) {
//       bgMusicRef.current?.play();
//       setIsMusicStarted(true);
//     }
//   };

//   const toggleSound = () => {
//     if (bgMusicRef.current) {
//       if (isMuted) {
//         bgMusicRef.current.play();
//       } else {
//         bgMusicRef.current.pause();
//       }
//       setIsMuted(!isMuted);
//     }
//   };

//   return { isMuted, setIsMuted, isMusicStarted, setIsMusicStarted, bgMusicRef, clickSound , startMusic, toggleSound, ariseSound };
// };

import useAudioStore from "../store/useAudioStore";
export const useAudio = () => {
  const {
    isMuted,
    isMusicStarted,
    bgMusic,
    clickSound,
    ariseSound,
    startMusic,
    toggleSound,
  } = useAudioStore();

  return {
    isMuted,
    isMusicStarted,
    bgMusicRef: { current: bgMusic },
    clickSound,
    ariseSound,
    startMusic,
    toggleSound,
  };
};