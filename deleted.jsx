import { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls} from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Howl } from "howler";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

import {
  Bloom,
  Vignette,
  Noise,
  EffectComposer,
} from "@react-three/postprocessing";


// Assets
import clickSoundFile from "./assets/music/click-for-game-menu.mp3";
import bgMusicFile from "./assets/music/DARK-ARIA-LV2.mp3";
// import bgImage from "./assets/background.jpg";
// import newBgImage from "./assets/notificationBg.jpg";

// Components
import FuturisticModal from "./components/FuturisticModal";

import RotatingStars from "./components/ui/3d_objects/RotatingStars";
import VideoText3D from "./components/ui/3d_objects/VideoText3D";
import TextVideoBg from "./components/ui/3d_objects/TextVideoBg";

// Distortion
import { Fluid } from "@whatisjery/react-fluid-distortion";
import BackgroundVideo from "./components/ui/BackgroundVideo";

const App = () => {
  // State management
  const [showModal, setShowModal] = useState(false);
  // const [background, setBackground] = useState(bgImage);
  const [zIndex, setZIndex] = useState(0);
  const [showText, setShowText] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMusicStarted, setIsMusicStarted] = useState(false);

  // Refs
  const bgMusicRef = useRef(null);
  const ariseTextRef = useRef(null);
  const soloTextRef = useRef(null);
  const startButtonRef = useRef(null);

  // Sound effects
  const clickSound = new Howl({
    src: [clickSoundFile],
    volume: 1,
  });

  // Initialize background music
  useEffect(() => {
    bgMusicRef.current = new Howl({
      src: [bgMusicFile],
      volume: 0.5,
      loop: true,
      autoplay: false,
    });

    return () => bgMusicRef.current?.unload();
  }, []);

  // Sound control functions
  const startMusic = () => {
    if (!isMusicStarted) {
      bgMusicRef.current?.play();
      setIsMusicStarted(true);
    }
  };

  const toggleSound = () => {
    if (bgMusicRef.current) {
      if (isMuted) {
        bgMusicRef.current.play();
      } else {
        bgMusicRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  // Animations
  useGSAP(() => {
    gsap.fromTo(
      ariseTextRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      soloTextRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power2.out" }
    );

    gsap.fromTo(
      startButtonRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power2.out" }
    );
  });

  // Event handlers
  function handleStart() {
    startMusic();
    setIsTransitioning(true);
    clickSound.play();

    setTimeout(() => {
      setShowText(false);
    }, 200);

    setTimeout(() => {
      // setBackground(newBgImage);
      setZIndex(50);
    }, 50);

    setTimeout(() => {
      setShowModal(true);
      setIsTransitioning(true);
    }, 1000);
  }

  // function handleCompleteQuest(xpReward){
  //   setPlayerXP((prevXP) => {
  //     const newXP = prevXP + xpReward;
  //     if (newXP >= playerLevel * 100) {
  //       setPlayerLevel(playerLevel + 1);
  //       return newXP - playerLevel * 100;
  //     }
  //     return newXP;
  //   });
  //   setActiveQuest(null);
  // }

  return (
    <div
      className={`home-container relative h-screen w-screen overflow-hidden flex justify-center items-center text-white bg-cover bg-center ${
        isTransitioning ? "transitioning" : ""
      }`}
      style={{
        // backgroundImage: `url(${background})`,
        zIndex: `${zIndex}`,
      }}
      onClick={startMusic} //play music on any screen click
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
        <directionalLight position={[0, 5, 5]} intensity={2} />
        <RotatingStars />

        <VideoText3D />

        <TextVideoBg />

        <OrbitControls enableZoom={false} />

        <EffectComposer>
          <Bloom
            intensity={1.5} // The bloom intensity.
            luminanceThreshold={0.9} // luminance threshold. Raise this value to mask out darker elements in the scene.
            luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
            mipmapBlur={true} // Enables or disables mipmap blur.
          />
          {/* your effects go here */}
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
          <Fluid showBackground={true} radius={0.15} />
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
              className="start-button cursor-pointer z-[80]"
              onClick={handleStart}
            >
              Start
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <FuturisticModal
          setShowModal={setShowModal}
          clickSound={clickSound}
          toggleSound={toggleSound}
        />
      )}
    </div>
  );
};

export default App;



// import { motion } from 'framer-motion';
// import LevelUpUI from './LevelUpUI';

// // StatCard Component for reusable progress bars
// const StatCard = ({ title, value, max = 100 }) => (
//   <div className="bg-black/40 border border-cyan-400/30 rounded-lg p-4">
//     <h3 className="text-cyan-400 text-lg mb-2">{title}</h3>
//     <div className="relative h-2 bg-gray-700 rounded">
//       <div 
//         className="absolute h-full bg-cyan-400 rounded"
//         style={{ width: `${(value / max) * 100}%` }}
//       />
//     </div>
//     <span className="text-sm text-gray-300 mt-1">
//       {value} / {max}
//     </span>
//   </div>
// );

// const Dashboard = ({
//   playerLevel,
//   playerXP,
//   playerRank,
//   playerFitness,
//   playerMental,
//   playerAchievements,
//   playerQuests,
//   onLevelUp,
// }) => {
//   const xpToNextLevel = 1000; // This can be dynamic depending on your level-up logic

//   // Handle Level Up (trigger the level-up UI)
//   const handleLevelUp = () => {
//     if (playerXP >= xpToNextLevel) {
//       onLevelUp(); // Trigger level-up behavior
//     }
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="grid gap-6"
//       onClick={handleLevelUp} // Just an example of triggering level-up
//     >
//       {/* Level-Up UI Trigger */}
//       <LevelUpUI />

//       {/* Player Overview */}
//       <section className="bg-black/60 border border-cyan-400/30 rounded-xl p-6">
//         <h2 className="text-2xl font-bold text-cyan-400 mb-4">Player Status</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="text-center">
//             <p className="text-gray-400">Level</p>
//             <p className="text-3xl text-cyan-400">{playerLevel}</p>
//           </div>
//           <div className="text-center">
//             <p className="text-gray-400">Rank</p>
//             <p className="text-3xl text-cyan-400">{playerRank}</p>
//           </div>
//           <div className="text-center">
//             <p className="text-gray-400">XP</p>
//             <p className="text-3xl text-cyan-400">{playerXP} / {xpToNextLevel}</p>
//           </div>
//         </div>
//       </section>

//       {/* XP Progress Bar */}
//       <section className="bg-black/60 border border-cyan-400/30 rounded-xl p-6">
//         <h3 className="text-xl text-cyan-400">XP Progress</h3>
//         <div className="relative h-2 bg-gray-700 rounded">
//           <div 
//             className="absolute h-full bg-cyan-400 rounded"
//             style={{ width: `${(playerXP / xpToNextLevel) * 100}%` }}
//           />
//         </div>
//       </section>

//       {/* Stats Grid */}
//       <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <StatCard title="Fitness" value={playerFitness} />
//         <StatCard title="Mental" value={playerMental} />
//       </section>

//       {/* Achievements */}
//       <section className="bg-black/60 border border-cyan-400/30 rounded-xl p-6">
//         <h2 className="text-2xl font-bold text-cyan-400 mb-4">Achievements</h2>
//         {playerAchievements.length === 0 ? (
//           <p className="text-gray-400">No achievements yet. Start your journey!</p>
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {playerAchievements.map((achievement, index) => (
//               <div key={index} className="text-center">
//                 {/* Display Achievement */}
//                 <span className="text-cyan-400">{achievement}</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Quests */}
//       <section className="bg-black/60 border border-cyan-400/30 rounded-xl p-6">
//         <h3 className="text-xl text-cyan-400">Current Quests</h3>
//         {playerQuests.length === 0 ? (
//           <p className="text-gray-400">No active quests. Start one!</p>
//         ) : (
//           <div className="grid gap-4">
//             {playerQuests.map((quest, index) => (
//               <div key={index} className="text-cyan-400">{quest.name}</div>
//             ))}
//           </div>
//         )}
//       </section>
//     </motion.div>
//   );
// };

// export default Dashboard;



