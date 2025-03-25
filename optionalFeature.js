// function VideoBg() {
//   const videoRef = useRef(null);
//   const [videoTexture, setVideoTexture] = useState(null);

//   const videoUrl = "./igris.mp4";

//   useEffect(() => {
//     const video = document.createElement("video");
//     video.src = videoUrl;
//     video.crossOrigin = "anonymous";
//     video.loop = true;
//     video.muted = true;
//     video.play();

//     videoRef.current = video;

//     video.addEventListener("loadeddata", () => {
//       const texture = new THREE.VideoTexture(video);
//       texture.minFilter = THREE.LinearFilter;
//       texture.magFilter = THREE.LinearFilter;
//       texture.generateMipmaps = false;
//       setVideoTexture(texture);
//     });

//     return () => {
//       if (videoRef.current) {
//         videoRef.current.pause();
//         videoRef.current.src = "";
//         videoRef.current.load();
//       }
//     };
//   }, []);

//   return (
//     <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -5]}>
//       <planeGeometry args={[50, 50]} />
//       <meshBasicMaterial map={videoTexture} />
//     </mesh>
//   );
// }

// const VideoBackground = () => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.play();
//     }
//   }, []);

//   return (
//     <video
//       ref={videoRef}
//       className="absolute top-0 left-0 min-w-full min-h-full w-auto h-auto object-cover -z-1"
//       autoPlay
//       loop
//       muted
//       playsInline
//       style={{ filter: "brightness(0.6)" }}
//     >
//       <source src="/jinwooBg.mp4" type="video/mp4" />
//     </video>
//   );
// };

// Add this after your FloatingText component
// function TextGlow() {
//   return (
//     <mesh position={[2.2, 0.6, 0]} scale={[6, 1.3, 1.1]}>
//       <planeGeometry />
//       <meshBasicMaterial
//         color={[0.4, 0.8, 1]}
//         transparent
//         // opacity={0.2}
//         blending={THREE.AdditiveBlending}
//       />
//     </mesh>
//   );
// }

// function FloatingText() {
//   const textRef = useRef();
//   const materialRef = useRef();

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();

//     if (textRef.current) {
//       textRef.current.position.x = Math.sin(t) * 0.4;
//       textRef.current.position.y = Math.tan(t * 0.8) * 0.1;
//     }

//     if (materialRef.current) {
//       materialRef.current.emissiveIntensity = 0.5 + Math.sin(t * 2) * 0.2;
//     }
//   });

//   return (
//     <Center position={[0, 3, 0]}>
//       {/* <TextGlow/> */}
//       <Text3D
//         ref={textRef}
//         font="/fonts/Orbitron_Regular.json"
//         size={1}
//         height={0.2}
//         curveSegments={12}
//         bevelEnabled
//         bevelThickness={0.02}
//         bevelSize={0.02}
//         bevelOffset={0}
//         bevelSegments={5}
//       >
//         Level Up
//         <meshStandardMaterial
//           color={[0.1, 0.8, 1]}
//           emissive={[0.2, 0.5, 1]}
//           emissiveIntensity={0.5}
//           metalness={0.8}
//           roughness={0.2}
//         />
//       </Text3D>
//     </Center>
//   );
// }

// function CylinderGeometry() {
//   const cylinderRef = useRef();
//   // const textureRef = useRef(null);

//   // const videoRef = useRef(null);
//   // const [videoReady, setVideoReady] = useState(false);
//   // const [error, setError] = useState(null);

//   // useEffect(() => {
//   //   const video = document.createElement("video");
//   //   videoRef.current = video;

//   //   video.src = "./igris.mp4"; // Replace with your video file path
//   //   video.crossOrigin = "Anonymous";
//   //   video.loop = true;
//   //   video.muted = true;

//   //  const handleCanPlay = () => {
//   //     const texture = new THREE.VideoTexture(video);
//   //     texture.minFilter = THREE.LinearFilter;
//   //     texture.magFilter = THREE.LinearFilter;
//   //     texture.generateMipmaps = false;
//   //     textureRef.current = texture;
//   //     setVideoReady(true);
//   //   };

//   //   const handleError = (e) => {
//   //     setError("Failed to load video");
//   //     console.error("Video loading error:", e);
//   //   };

//   //   video.addEventListener('canplaythrough', handleCanPlay);
//   //   video.addEventListener('error', handleError);

//   //   return () => {
//   //     if (video) {
//   //       video.pause();
//   //       video.src = "";
//   //       video.load();
//   //       video.removeEventListener('canplaythrough', handleCanPlay);
//   //       video.removeEventListener('error', handleError);
//   //     }
//   //     if (textureRef.current) {
//   //       textureRef.current.dispose();
//   //     }
//   //   };
//   // }, []);

//   // let tex = useTexture("./igris.mp4");

//   // Adjust texture repeat to fit the geometry properly
//   // tex.wrapS = THREE.RepeatWrapping;
//   // tex.wrapT = THREE.RepeatWrapping;
//   // tex.repeat.set(2, 1);  // Adjust the repeat if necessary (e.g., set(1, 2) for vertical stretching)

//   const videoRef = useRef(null);
//   const [videoTexture, setVideoTexture] = useState(null);

//   const videoUrl = "./igris.mp4";

//   useEffect(() => {
//     const video = document.createElement("video");
//     video.src = videoUrl;
//     video.crossOrigin = "Anonymous";
//     video.loop = true;
//     video.muted = true;

//     videoRef.current = video;

//     video.addEventListener("loadeddata", () => {
//       const texture = new THREE.VideoTexture(video);
//       texture.minFilter = THREE.LinearFilter;
//       texture.magFilter = THREE.LinearFilter;
//       texture.generateMipmaps = false;
//       setVideoTexture(texture);
//       video.play();
//     });

//     return () => {
//       if (videoRef.current) {
//         videoRef.current.pause();
//         videoRef.current.src = "";
//         videoRef.current.load();
//       }
//     };
//   }, []);

//   useFrame((state, delta) => {
//     if (cylinderRef.current) {
//       cylinderRef.current.rotation.y += delta;
//     }
//   });
//   return (
//     <group position={[-4, 2, 0]} rotation={[0, 0.4, 0.3]} ref={cylinderRef}>
//       <mesh>
//         <torusGeometry args={[1.6, 1, 1.7, 60, 60, true]} />
//         <meshStandardMaterial
//           map={videoTexture}
//           side={THREE.DoubleSide}
//           transparent
//           roughness={0.2}
//           metalness={0.2}
//           emissive={0x000000}
//           emissiveIntensity={0.5}
//         />
//       </mesh>
//     </group>
//   );
// }

// function TorusGeometry() {
//   const torusRef = useRef();
//   const videoRef = useRef(null);
//   const [videoTexture, setVideoTexture] = useState(null);

//   const videoUrl = "./igris.mp4";

//   useEffect(() => {
//     const video = document.createElement("video");
//     video.src = videoUrl;
//     video.crossOrigin = "Anonymous";
//     video.loop = true;
//     video.muted = true;

//     videoRef.current = video;

//     video.addEventListener("loadeddata", () => {
//       const texture = new THREE.VideoTexture(video);
//       texture.minFilter = THREE.LinearFilter;
//       texture.magFilter = THREE.LinearFilter;
//       texture.generateMipmaps = false;
//       setVideoTexture(texture);
//       video.play();
//     });

//     return () => {
//       if (videoRef.current) {
//         videoRef.current.pause();
//         videoRef.current.src = "";
//         videoRef.current.load();
//       }
//     };
//   }, []);

//   useFrame((state, delta) => {
//     if (torusRef.current) {
//       torusRef.current.rotation.y += delta;
//     }
//   });

//   return (
//     <group position={[-4, 2, 0]}  ref={torusRef}>
//       <mesh rotation={[4, 0, 0]}>
//         {/* Replace cylinderGeometry with torusGeometry */}
//         <torusGeometry args={[1, 0.3, 60, 60]} />
//         <meshStandardMaterial
//           map={videoTexture}
//           side={THREE.DoubleSide}
//           transparent
//           roughness={0.2}
//           metalness={0.2}
//           emissive={0x000000}
//           emissiveIntensity={0.5}
//         />
//       </mesh>
//     </group>
//   );
// }





<div>

{showModal && (
  <FuturisticModal
    setShowModal={setShowModal}
    // clickSound={clickSound}
    // toggleSound={toggleSound}
  />
)}
</div>



// -------------------------------------------------------------------------------------------------------------------------------------
  // content from futuristicModal.jsx
// // Constants
// const INITIAL_PLAYER_STATS = {
//   rank: "E",
//   xp: 0,
//   level:1,
//   maxXp: 100,
//   fitness: 0,
//   mental: 0,
//   spiritual: 0,
//   skills: 0,
// };

// const RANK_VALUES = {
//   E: 0,
//   D: 1,
//   C: 2,
//   B: 3,
//   A: 4,
//   S: 5,
// };

// Sub-components for different modal states
// const NotificationModal = ({ handleAccept, setShowModal }) => (
//   <div className="modall absolute text-center text-cyan-400 border border-[#071B5B] rounded-lg shadow-lg bg-black/90">
//     <div className="absolute inset-0 border-2 border-cyan-400 rounded-lg animate-pulse -z-10" />
//     <h2 className="title text-[3rem] font-bold border-b">NOTIFICATION</h2>
//     <p className="message text-2xl flex-wrap">
//       You have acquired the qualifications to be a{" "}
//       <span className="highlight italic text-blue-300">Player</span>. Will you accept?
//     </p>
//     <div className="btn-container flex justify-center gap-4">
//       <button
//         className="accept cursor-pointer bg-cyan-400 text-black rounded-md transition hover:bg-blue-300"
//         onClick={handleAccept}
//       >
//         Accept
//       </button>
//       <button
//         className="delete text-cyan-400 border border-cyan-400 rounded-md transition hover:bg-cyan-400 hover:text-black"
//         onClick={() => setShowModal(false)}
//       >
//         Decline
//       </button>
//     </div>
//     {/* <WavyBackground /> */}
//   </div>
// );

// const WelcomeModal = ({ handleEnter, isEntering }) => (
//   <div
//     className={`modall text-center border border-[#071B5B] rounded-xl shadow-lg bg-black/40 p-8 ${
//       isEntering ? "fade-out" : "fade-in"
//     }`}
//   >
//     <div className="text-white text-2xl flex flex-col justify-evenly items-center">
//       <h2 className="title text-4xl">Welcome, Hunter!</h2>
//       <p className="mt-6 message">
//         Join and level up yourself in this world of endless possibilities.
//       </p>
//       <button
//         className="cursor-pointer bg-cyan-400 text-black rounded-md transition hover:bg-blue-300 accept"
//         onClick={handleEnter}
//       >
//         Enter
//       </button>
//     </div>
//   </div>
// );

// const PlayerSetupModal = ({ 
//   playerName, 
//   setPlayerName, 
//   handleNameSubmit, 
//   isSubmitted 
// }) => (
//   <div className="modall text-center border border-[#071B5B] rounded-xl shadow-lg bg-black/40 p-8">
//     <div className="text-white text-2xl flex flex-col justify-evenly items-center">
//       <h2 className="title text-4xl mb-6">Create Your Player</h2>
//       <input
//         type="text"
//         value={playerName}
//         onChange={(e) => setPlayerName(e.target.value)}
//         placeholder="Enter your name"
//         className="player-name-input p-2 rounded bg-gray-800 text-white border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
//       />
//       <button
//         className="cursor-pointer bg-cyan-400 text-black rounded-md transition hover:bg-blue-300 accept mt-4"
//         onClick={handleNameSubmit}
//         disabled={isSubmitted}
//       >
//         {isSubmitted ? "Processing..." : "Submit"}
//       </button>
//     </div>
//   </div>
// );







// 