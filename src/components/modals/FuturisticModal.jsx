import { useEffect } from "react";
import Homepage from "../../pages/Homepage.jsx";
import PortalVideo from "../PortalVideo.jsx";
import NotificationModal from "./NotificationModel.jsx";
import WelcomeModal from "./WelcomeModel.jsx";
import PlayerSetupModal from "./PlayerSetupModal.jsx";

import { useAudio } from "../../hooks/useAudio.jsx";
// import useAudioStore from "../../store/useAudioStore.jsx";
import useModalStore from "../../store/useModalStore.jsx";


function FuturisticModal({ setShowModal, clickSound }) {
  // const [isAccepted, setIsAccepted] = useState(false);
  // const [isEntering, setIsEntering] = useState(false);
  // const [playerName, setPlayerName] = useState("");
  // const [rank, setRank] = useState("E");
  // const [xp, setXp] = useState(0);

  // const [isSubmitted, setIsSubmitted] = useState(false);
  // const [showAssessment, setShowAssessment] = useState(false);
  // const [showPortalVideo, setShowPortalVideo] = useState(false);
  // const [playerStats, setPlayerStats] = useState(INITIAL_PLAYER_STATS);

  const {
    isAccepted,
    isEntering,
    playerName,
    showAssessment,
    showPortalVideo,
    setPlayerName,
    handleAccept,
    handleNameSubmit,
    handleEnter,
    initializeFromStorage,
    isSubmitted,
  } = useModalStore();

  const { ariseSound } = useAudio();
  // const { isMuted } = useAudioStore();


  // useEffect(() => {
  //   const storedName = localStorage.getItem("playerName");
  //   const storedRank = localStorage.getItem("rank");
  //   const storedXp = localStorage.getItem("xp");

  //   if (storedName) {
  //     setPlayerName(storedName);
  //     setRank(storedRank || "E");
  //     setXp(storedXp ? parseInt(storedXp) : 0);
  //   }
  // }, []);

  useEffect(()=> {
    initializeFromStorage();
  }, [ initializeFromStorage ]);

  // Event handlers
  const handleEnterWithSound = () => {
    ariseSound.play();
    handleEnter();
    clickSound.play();
  }

  const handleAcceptWithSound = () => {
    handleAccept();
    clickSound.play();
  }

  const handleVideoEnd = () => {
    setShowModal(true);
  }

  // const handleAccept = () => {
  //   setIsAccepted(true);
  //   clickSound.play();
  // };

  // const handleEnter = () => {
  //   ariseSound.play();
  //   clickSound.play();
  //   // setShowPortalVideo(true);
  //   setIsEntering(true);
  // };

  // const handleVideoEnd = () => {
  //   setShowPortalVideo(false);
  //   setShowModal(true);
  //   setIsEntering(true);
  // };

  // const handleNameSubmit = () => {
  //   if (playerName.trim().length === 0) {
  //     alert("Please enter a valid name!");
  //     return;
  //   }
  //   localStorage.setItem("playerName", playerName);
  //   localStorage.setItem("playerRank", rank);
  //   localStorage.setItem("playerXP", xp);
  //   setPlayerStats({
  //     ...playerStats,
  //     rank: rank,
  //     xp: xp,
  //     level: 1,
  //     fitness: 0,
  //     mental: 0,
  //     spiritual: 0,
  //     skills: 0,
  //   });

  //   setShowModal(true);
  //   setShowAssessment(true);
  //   clickSound.play();
  //   setIsSubmitted(true);

  //   // navigate('/dashboard');
  // };

  // const handleXPChange = (event) => {
  //   const newXP = parseInt(event.target.value);
  //   setXp(newXP);

  //   if (newXP >= 900) setRank("S");
  //   else if (newXP >= 800) setRank("A");
  //   else if (newXP >= 700) setRank("B");
  //   else if (newXP >= 600) setRank("C");
  //   else if (newXP >= 500) setRank("D");
  //   else setRank("E");
  // };

  // const calculateInitialRank = (stats) => {
  //   const average =
  //     (stats.fitness + stats.mental + stats.spiritual + stats.skills) / 4;
  //   if (average >= 90) return "S";
  //   if (average >= 80) return "A";
  //   if (average >= 70) return "B";
  //   if (average >= 60) return "C";
  //   if (average >= 50) return "D";
  //   return "E";
  // };

  // const handleAssessmentSubmit = (assessmentResults) => {
  //   const newStats = {
  //     ...playerStats,
  //     ...assessmentResults,
  //     rank: calculateInitialRank(assessmentResults),
  //   };
  //   setPlayerStats(newStats);
  //   setShowModal(true);
  // };

  // Render appropriate content based on current state

  const renderContent = () => {
    if (showPortalVideo) {
      return <PortalVideo onEnd={handleVideoEnd} />;
    }

    if (!isAccepted) {
      return (
        <NotificationModal
          handleAccept={handleAcceptWithSound}
          setShowModal={setShowModal}
          clickSound={clickSound}
        />
      );
    }

    if (!isEntering) {
      return <WelcomeModal handleEnter={handleEnterWithSound} isEntering={isEntering} />;
    }

    if (showAssessment) {
      return (
        <>
        <Homepage />
        </>
      );
    }

    return (
      <PlayerSetupModal
        playerName={playerName}
        setPlayerName={setPlayerName}
        handleNameSubmit={() => {
          handleNameSubmit();
          clickSound.play();
        }}
        isSubmitted={isSubmitted}
      />
    );
  };

  return (
    <>
      <div className="container flex items-center justify-center h-screen bg-transparent absolute z-50 fade-in">
        {renderContent()}
      </div>
    </>
  );
}

export default FuturisticModal;
