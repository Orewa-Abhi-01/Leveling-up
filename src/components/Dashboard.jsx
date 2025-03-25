// // import { motion } from 'framer-motion';
// import LevelUpUI from "./LevelUpUI";
// import "../styles/dashboard.css";
// import { useState } from "react";

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
//   const xpToNextLevel = 1000;

//   const [showLevelUpUI, setShowLevelUpUI] = useState(true);

//   const onClose = () => {
//     setShowLevelUpUI(false);
//     console.log("Level Up UI closed",showLevelUpUI);

//   };

//   const handleLevelUp = () => {
//     if (playerXP >= xpToNextLevel) {
//       onLevelUp();
//     }
//   };
//   return (
//     <div className=" dashboard" onClick={handleLevelUp}>
//       {/* Level Up UI Trigger */}
//       <button onClick={() => setShowLevelUpUI(!showLevelUpUI)}>
//         showLevelUpUI
//       </button>
//       {showLevelUpUI && <LevelUpUI onClose={onClose} />}

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
//             <p className="text-3xl text-cyan-400">
//               {playerXP} / {xpToNextLevel}
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* XP Progress Bar */}
//       <section className="bg-black/60 border border-cyan-400/30 rounded-xl p-6">
//         <h3 className="text-2xl font-bold text-cyan-400 mb-4">XP Progress</h3>
//         <div className="relative h-4 bg-gray-800 rounded">
//           <div
//             className="absolute h-full bg-cyan-400 rounded"
//             style={{ width: `${(playerXP / xpToNextLevel) * 100}%` }}
//           />
//         </div>
//       </section>

//       {/* Stats Grid */}
//       <section className="grid grid-cols-1 md:grid-cols-2  gap-6  stats-card">
//         <StatCard title="Fitness" value={playerFitness} />
//         <StatCard title="Mental" value={playerMental} />
//         <StatCard title="Spiritual" value={playerMental} />
//         <StatCard title="Skills" value={playerMental} />
//       </section>

//       {/* Achievements */}
//       <section className="bg-black/60 border border-cyan-400/30 rounded-xl p-6">
//         <h2 className="text-2xl font-bold text-cyan-400 mb-4">Achievements</h2>
//         {playerAchievements.length === 0 ? (
//           <p className="text-gray-400">
//             No achievements yet. Start your journey!
//           </p>
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {playerAchievements.map((achievement, index) => (
//               <div key={index} className="text-center">
//                 {/* Achievement content */}
//                 <span className="text-cyan-400">{achievement}</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Quests */}
//       <section className="bg-black/60 border border-cyan-400/30 rounded-xl p-6">
//         <h2 className="text-2xl font-bold text-cyan-400 mb-4">Quests</h2>
//         {playerQuests.length === 0 ? (
//           <p className="text-gray-400">No quests yet. Start your adventure!</p>
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {playerQuests.map((quest, index) => (
//               <div key={index} className="text-center">
//                 {/* Quest content */}
//                 <span className="text-cyan-400">{quest.name}</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default Dashboard;

// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";
// import {
//   FaInfoCircle,
//   FaTrophy,
//   FaRunning,
//   FaBrain,
//   FaChartLine,
// } from "react-icons/fa";
// import {
//   GiMeditation,
//   GiSkills,
//   GiSpellBook,
//   GiStairsGoal,
// } from "react-icons/gi";
// import LevelUpUI from "../components/LevelUpUI";

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
//   const [selectedTab, setSelectedTab] = useState("overview");
//   const [showStats, setShowStats] = useState(false);

//   // const [showLevelUpUI, setShowLevelUpUI] = useState(true);

//   // const onClose = () => {
//   //   setShowLevelUpUI(false);
//   //   console.log("Level Up UI closed", showLevelUpUI);
//   // };

//   console.log(showStats);

//   return (
//     <motion.div
//       className="w-full bg-gradient-to-b from-[#071B5B]/95 to-black/95 rounded-2xl shadow-lg text-cyan-200 border border-cyan-500/30"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       {/* Header Section with Tabs */}
//       <div className="border-b border-cyan-500/30">
//         <h2 className="text-3xl font-bold text-center text-cyan-100 tracking-wider p-6">
//           DASHBOARD
//         </h2>
//         {/* <LevelUpUI onClose={onClose} /> */}
//         <div className="flex px-6 -mb-px">
//           {/* <button onClick={() => setShowLevelUpUI(!showLevelUpUI)}>
//             showLevelUpUI
//           </button> */}
//           {["overview", "stats", "achievements", "quests"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setSelectedTab(tab)}
//               className={`px-4 py-2 mr-2 transition-colors rounded-t-lg ${
//                 selectedTab === tab
//                   ? "bg-cyan-500/20 text-cyan-300 border-t border-x border-cyan-500/30"
//                   : "text-cyan-400/60 hover:text-cyan-300"
//               }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={selectedTab}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           transition={{ duration: 0.2 }}
//           className="p-6 space-y-6"
//         >
//           {selectedTab === "overview" && (
//             <>
//               <div className="grid grid-cols-2 gap-4">
//                 <StatCard
//                   icon={<FaTrophy className="text-yellow-500 text-2xl" />}
//                   label="RANK"
//                   value={playerRank}
//                   subValue={`Level ${playerLevel}`}
//                   onClick={() => setShowStats(true)}
//                 />
//                 <StatCard
//                   icon={<FaRunning className="text-green-500 text-2xl" />}
//                   label="FITNESS"
//                   value={`${playerFitness}%`}
//                   subValue="Physical Progress"
//                 />
//               </div>

//               <div className="space-y-4 p-4 bg-black/30 rounded-lg backdrop-blur-sm">
//                 <ProgressBar
//                   label="Experience"
//                   current={playerXP}
//                   max={100}
//                   color="cyan"
//                   showGlowEffect={true}
//                 />
//                 <ProgressBar
//                   label="Mental Progress"
//                   current={playerMental}
//                   max={100}
//                   color="purple"
//                   showGlowEffect={true}
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <StatsPanel
//                   title="Active Quests"
//                   items={playerQuests.slice(0, 3)}
//                   icon={<GiSkills className="text-cyan-400 text-xl" />}
//                 />
//                 <StatsPanel
//                   title="Recent Achievements"
//                   items={playerAchievements.slice(0, 3)}
//                   icon={<GiMeditation className="text-purple-400 text-xl" />}
//                 />
//               </div>
//             </>
//           )}

//           {selectedTab === "stats" && (
//             <DetailedStats
//               stats={{
//                 Strength: 65,
//                 Agility: 45,
//                 Intelligence: 80,
//                 Vitality: 55,
//                 Spirit: 70,
//               }}
//             />
//           )}

//           {selectedTab === "achievements" && (
//             <AchievementsList achievements={playerAchievements} />
//           )}

//           {selectedTab === "quests" && <QuestsList quests={playerQuests} />}
//         </motion.div>
//       </AnimatePresence>

//       {/* Footer */}
//       <div className="border-t border-cyan-500/30 p-4">
//         <button
//           onClick={onLevelUp}
//           className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black rounded-lg transition-colors font-bold
//             relative overflow-hidden group"
//         >
//           <span className="relative z-10">Level Up</span>
//           <motion.div
//             className="absolute inset-0 bg-cyan-400"
//             initial={{ x: "-100%" }}
//             animate={{ x: "100%" }}
//             transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//             style={{ opacity: 0.2 }}
//           />
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// // Enhanced Helper Components
// const DetailedStats = ({ stats }) => (
//   <div className="grid grid-cols-1 gap-4">
//     {Object.entries(stats).map(([stat, value]) => (
//       <div
//         key={stat}
//         className="bg-black/30 rounded-lg p-4 border border-cyan-500/30"
//       >
//         <div className="flex justify-between items-center mb-2">
//           <span className="text-cyan-300">{stat}</span>
//           <span className="text-white font-bold">{value}</span>
//         </div>
//         <motion.div className="h-2 bg-gray-700 rounded-full overflow-hidden">
//           <motion.div
//             className="h-full bg-cyan-500"
//             initial={{ width: 0 }}
//             animate={{ width: `${value}%` }}
//             transition={{ duration: 1, ease: "easeOut" }}
//           />
//         </motion.div>
//       </div>
//     ))}
//   </div>
// );

// // Enhanced ProgressBar with glow effect
// const ProgressBar = ({ label, current, max, color, showGlowEffect }) => (
//   <div className="space-y-1">
//     <div className="flex justify-between text-sm">
//       <span>{label}</span>
//       <span>
//         {current}/{max}
//       </span>
//     </div>
//     <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
//       <motion.div
//         className={`h-full ${
//           color === "cyan"
//             ? "bg-gradient-to-r from-cyan-500 to-blue-500"
//             : "bg-gradient-to-r from-purple-500 to-pink-500"
//         } ${showGlowEffect ? "shadow-glow" : ""}`}
//         initial={{ width: 0 }}
//         animate={{ width: `${(current / max) * 100}%` }}
//         transition={{ duration: 1, ease: "easeOut" }}
//       />
//     </div>
//   </div>
// );

// // Add these new components
// const AchievementsList = ({ achievements }) => (
//   <div className="grid gap-4">
//     {achievements.map((achievement, index) => (
//       <motion.div
//         key={index}
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: index * 0.1 }}
//         className="bg-black/30 p-4 rounded-lg border border-cyan-500/30 flex items-center gap-3"
//       >
//         <GiStairsGoal className="text-yellow-500 text-xl" />
//         <span>{achievement}</span>
//       </motion.div>
//     ))}
//   </div>
// );

// const QuestsList = ({ quests }) => (
//   <div className="grid gap-4">
//     {quests.map((quest, index) => (
//       <motion.div
//         key={index}
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: index * 0.1 }}
//         className="bg-black/30 p-4 rounded-lg border border-cyan-500/30 flex items-center gap-3"
//       >
//         <GiSpellBook className="text-cyan-400 text-xl" />
//         <span>{quest}</span>
//       </motion.div>
//     ))}
//   </div>
// );

// // Helper Components
// const StatCard = ({ icon, label, value, subValue }) => (
//   <div className="p-4 bg-black/30 rounded-lg border border-cyan-500/30">
//     <div className="flex items-center gap-3">
//       {icon}
//       <div>
//         <h3 className="text-sm text-cyan-400">{label}</h3>
//         <p className="text-2xl font-bold text-white">{value}</p>
//         <p className="text-sm text-cyan-300/60">{subValue}</p>
//       </div>
//     </div>
//   </div>
// );

// const StatsPanel = ({ title, items, icon }) => (
//   <div className="p-4 bg-black/30 rounded-lg border border-cyan-500/30">
//     <div className="flex items-center gap-2 mb-3">
//       {icon}
//       <h3 className="text-lg font-semibold">{title}</h3>
//     </div>
//     <ul className="space-y-2">
//       {items.length > 0 ? (
//         items.map((item, index) => (
//           <li key={index} className="text-sm text-cyan-300/80">
//             • {item}
//           </li>
//         ))
//       ) : (
//         <li className="text-sm text-cyan-300/50">No items to display</li>
//       )}
//     </ul>
//   </div>
// );

// // Keep existing helper components...
// // ...existing StatCard, StatsPanel components...

// export default Dashboard;


import { motion } from "framer-motion";
import { FaTrophy, FaRunning, FaBrain } from "react-icons/fa";
import { GiMeditation, GiSkills } from "react-icons/gi";
import { useState } from "react";
import LevelUpUI from "./LevelUpUI";
import "../styles/dashboard.css";

// Stats Card Component (with Progress Bar)
const StatCard = ({ title, value, max = 100, icon }) => (
  <div className="bg-black/40 border border-cyan-400/30 rounded-lg p-4">
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <h3 className="text-cyan-400 text-lg">{title}</h3>
    </div>
    <div className="relative h-2 bg-gray-700 rounded">
      <div
        className="absolute h-full bg-cyan-400 rounded"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
    <span className="text-sm text-gray-300 mt-1">
      {value} / {max}
    </span>
  </div>
);

// Progress Bar Component (with Animation)
const ProgressBar = ({ label, current, max, color }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-sm">
      <span>{label}</span>
      <span>{current}/{max}</span>
    </div>
    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
      <motion.div
        className={`h-full ${color === "cyan" ? "bg-cyan-500" : "bg-purple-500"}`}
        initial={{ width: 0 }}
        animate={{ width: `${(current / max) * 100}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  </div>
);

const Dashboard = ({
  playerLevel,
  playerXP,
  playerRank,
  playerFitness,
  playerMental,
  playerAchievements,
  playerQuests,
  onLevelUp,
}) => {
  const xpToNextLevel = 1000;
  const [showLevelUpUI, setShowLevelUpUI] = useState(true);

  const onClose = () => {
    setShowLevelUpUI(false);
  };

  const handleLevelUp = () => {
    if (playerXP >= xpToNextLevel) {
      onLevelUp();
    }
  };

  return (
    <motion.div
      className="w-full bg-gradient-to-b from-[#071B5B]/95 to-black/95 rounded-2xl shadow-lg text-cyan-200 border border-cyan-500/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Level Up UI Trigger */}
      <button
        onClick={() => setShowLevelUpUI(!showLevelUpUI)}
        className="absolute top-4 right-4 px-4 py-2 bg-cyan-500 rounded-lg text-black font-bold transition-colors hover:bg-cyan-600"
      >
        Level Up UI
      </button>
      {showLevelUpUI && <LevelUpUI onClose={onClose} />}

      {/* Player Overview */}
      <section className="bg-black/60 border border-cyan-400/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Player Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-gray-400">Level</p>
            <p className="text-3xl text-cyan-400">{playerLevel}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400">Rank</p>
            <p className="text-3xl text-cyan-400">{playerRank}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400">XP</p>
            <p className="text-3xl text-cyan-400">
              {playerXP} / {xpToNextLevel}
            </p>
          </div>
        </div>
      </section>

      {/* XP Progress Bar */}
      <section className="bg-black/60 border border-cyan-400/30 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-cyan-400 mb-4">XP Progress</h3>
        <ProgressBar label="XP" current={playerXP} max={xpToNextLevel} color="cyan" />
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 stats-card">
        <StatCard title="Fitness" value={playerFitness} max={100} icon={<FaRunning className="text-green-500" />} />
        <StatCard title="Mental" value={playerMental} max={100} icon={<FaBrain className="text-purple-500" />} />
      </section>

      {/* Achievements */}
      <section className="bg-black/60 border border-cyan-400/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Achievements</h2>
        {playerAchievements.length === 0 ? (
          <p className="text-gray-400">No achievements yet. Start your journey!</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {playerAchievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <span className="text-cyan-400">{achievement}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quests */}
      <section className="bg-black/60 border border-cyan-400/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Quests</h2>
        {playerQuests.length === 0 ? (
          <p className="text-gray-400">No quests yet. Start your adventure!</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {playerQuests.map((quest, index) => (
              <div key={index} className="text-center">
                <span className="text-cyan-400">{quest.name}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Level Up Button */}
      <div className="border-t border-cyan-500/30 p-4">
        <button
          onClick={handleLevelUp}
          className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black rounded-lg transition-colors font-bold"
        >
          Level Up
        </button>
      </div>
    </motion.div>
  );
};

export default Dashboard;
