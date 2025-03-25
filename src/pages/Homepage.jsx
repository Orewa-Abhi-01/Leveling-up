// import { useState } from "react";
import "../styles/Homepage.css";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/ui/Navbar";
import QuestSystem from "../components/game/QuestSystem";
import StoryPanel from "../components/game/StoryPanel";
import PlayerHUD from "../components/game/PlayerHUD";
import SkillTree from "../components/game/SkillTree";
import Dashboardd from "./Dashboardd";

import  useHomepageStore  from "../store/useHomepageStore";

const Homepage = () => {
  const { isQuestOpen, isShowingDashboard, isStoryPanelOpen, isSkillTreeShown, showPlayerHUD, handleDailyQuest, handleStoryOpen, handleShowSkillTree, handlePlayerHUD } = useHomepageStore();
  // const [isQuestOpen, setIsQuestOpen] = useState(false);
  // const [isShowingDashboard, setIsShowingDashboard] = useState(true);
  // const [isStoryPanelOpen, setIsStoryPanelOpen] = useState(false);
  // const [isSkillTreeShown, setIsSkillTreeShown] = useState(false);
  // const [showPlayerHUD, setShowPlayerHUD] = useState(false);

  // function handleDailyQuest() {
  //   setIsQuestOpen((prevIsQuestOpen) => {
  //     if (prevIsQuestOpen) {
  //       setIsShowingDashboard(true); // Show Dashboard when Quest System closes
  //     } else {
  //       setIsShowingDashboard(false); // Hide Dashboard when Quest System opens
  //     }
  //     return !prevIsQuestOpen;
  //   });
  //   setIsShowingDashboard(false); // Hide Dashboard when a modal opens
  //   setIsSkillTreeShown(false);
  //   setIsStoryPanelOpen(false);
  //   setShowPlayerHUD(false);
  // }

  // function handleStoryOpen() {
  //   setIsStoryPanelOpen((prevIsStoryPanelOpen) => {
  //     if (prevIsStoryPanelOpen) {
  //       setIsShowingDashboard(true); // Show Dashboard when Story Panel closes
  //     } else {
  //       setIsShowingDashboard(false); // Hide Dashboard when Story Panel opens
  //     }
  //     return !prevIsStoryPanelOpen;
  //   });
  //   setIsSkillTreeShown(false);
  //   setIsQuestOpen(false);
  //   setShowPlayerHUD(false);
  // }

  // function handleShowSkillTree() {
  //   setIsSkillTreeShown((prevIsSkillTreeShown) => {
  //     if (prevIsSkillTreeShown) {
  //       setIsShowingDashboard(true); // Show Dashboard when Skill Tree closes
  //     } else {
  //       setIsShowingDashboard(false); // Hide Dashboard when Skill Tree opens
  //     }
  //     return !prevIsSkillTreeShown;
  //   });
  //   setIsQuestOpen(false);
  //   setShowPlayerHUD(false);
  //   setIsStoryPanelOpen(false);
  // }

  // function handlePlayerHUD() {
  //   setShowPlayerHUD((prevShowPlayerHUD) => {
  //     if (prevShowPlayerHUD) {
  //       setIsShowingDashboard(true); // Show Dashboard when Player HUD closes
  //     } else {
  //       setIsShowingDashboard(false); // Hide Dashboard when Player HUD opens
  //     }
  //     return !prevShowPlayerHUD;
  //   });
  //   setIsStoryPanelOpen(false);
  //   setIsSkillTreeShown(false);
  //   setIsQuestOpen(false);
  // }
  return (
    <>
      <Navbar
          playerName="Player1"
          playerRank="E"
          handleDailyQuest={handleDailyQuest}
          handleStoryOpen={handleStoryOpen}
          handleShowSkillTree={handleShowSkillTree}
          handlePlayerHUD={handlePlayerHUD}
        />
      {/*  */}
      <div className=" absolute top-16  mx-auto w-[85%]  rounded-lg bg-gradient-to-b from-[#071B5B] to-black text-white">
        
        <div className="w-[100%] main rounded-2xl ">

          <div className="story-panel ">
            {isStoryPanelOpen && <StoryPanel />}
          </div>

          {isSkillTreeShown && <SkillTree />}

          {showPlayerHUD && <PlayerHUD playerLevel={1} playerXP={0} />}

          {isQuestOpen && <QuestSystem />}

  
          <div className="dashboard">
            {isShowingDashboard && (
              <Dashboard
                playerLevel={1}
                playerXP={0}
                playerRank={"E"}
                playerFitness={0}
                playerMental={0}
                playerAchievements={[
                  "First Quest Completed",
                  "Level 10 Reached",
                  "Beginner Training Done"
                ]}
                playerQuests={[
                  "Complete Daily Workout",
                  "Meditate for 10 minutes",
                  "Study New Skill"
                ]}
                onLevelUp={handleDailyQuest}
              />
            )}

            <Dashboardd/>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
