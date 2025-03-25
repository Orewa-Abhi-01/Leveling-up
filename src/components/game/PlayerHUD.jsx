// import { useEffect, useState } from "react";

const PlayerHUD = ({ playerLevel, playerXP }) => {
  const xpRequired = playerLevel * 100; // XP needed to level up
  const xpPercentage = (playerXP / xpRequired) * 100;

  return (
    <div className=" top-32 left-4 p-4 bg-black/70 border border-cyan-400 rounded-lg text-white w-72">
      <h2 className="text-xl font-bold text-cyan-400">Player Stats</h2>
      <p className="text-lg">Level: <span className="text-blue-300">{playerLevel}</span></p>
      
      {/* XP Bar */}
      <div className="relative w-full h-4 mt-2 bg-gray-800 rounded-md">
        <div
          className="absolute top-0 left-0 h-full bg-cyan-400 rounded-md transition-all duration-300"
          style={{ width: `${xpPercentage}%` }}
        />
      </div>
      <p className="text-sm mt-1">XP: {playerXP} / {xpRequired}</p>
    </div>
  );
};

export default PlayerHUD;
