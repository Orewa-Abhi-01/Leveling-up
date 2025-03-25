import "../../styles/Navbar.css";
const Navbar = ({
  playerName,
  playerRank,
  handleDailyQuest,
  handleStoryOpen,
  handleShowSkillTree,
  handlePlayerHUD,
}) => {
  return (
    // container bg-black/80 backdrop-blur-sm border-b border-cyan-400/30 fixed left-0   rounded-lg
    <nav>
      <div className="mx-auto ">
        <div className="flex items-center justify-between h-16  ">
          <span className="items-center nav-title">
            LevelUp
          </span>

          <div className="nav-items">
            <div className="nav-items-inner">
              <span className="text-cyan-400">
                Player: {playerName || "Unknown"}
              </span>
              <span className="text-cyan-400">Rank: {playerRank}</span>
            </div>
            <div className="cursor-pointer btns-div flex gap-4">
              <button
                onClick={handleDailyQuest}
                className="bg-cyan-400 text-black rounded-md transition hover:bg-blue-300"
              >
                Daily Quest
              </button>
              <button onClick={handleStoryOpen}>Story Panel</button>
              <button onClick={handleShowSkillTree}>Skill Tree</button>
              <button onClick={handlePlayerHUD}>Player HUD</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
