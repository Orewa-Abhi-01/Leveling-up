import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";
import Tooltip from "./ui/Tooltip";
import "../styles/LevelUpUI.css";

const statDescriptions = {
  STR: "Strength: Increases physical damage and carrying capacity",
  AGI: "Agility: Improves speed, dodge chance and attack speed",
  PER: "Perception: Enhances accuracy and detection abilities",
  VIT: "Vitality: Boosts HP, stamina and physical defense",
  INT: "Intelligence: Increases MP, magic power and skill efficiency",
};

const LevelUpUI = ({ onClose }) => {
  const [stats, setStats] = useState({
    STR: 48,
    AGI: 27,
    PER: 27,
    VIT: 27,
    INT: 27,
    points: 12,
  });

  // const [showTooltip, setShowTooltip] = useState("");
  const [pendingChanges, setPendingChanges] = useState({});

  const increaseStat = (stat) => {
    if (stats.points > 0) {
      setPendingChanges({
        ...pendingChanges,
        [stat]: (pendingChanges[stat] || 0) + 1,
      });
      setStats((prev) => ({
        ...prev,
        [stat]: prev[stat] + 1,
        points: prev.points - 1,
      }));
    }
  };

  const decreaseStat = (stat) => {
    if (pendingChanges[stat] > 0) {
      setPendingChanges({
        ...pendingChanges,
        [stat]: pendingChanges[stat] - 1,
      });
      setStats((prev) => ({
        ...prev,
        [stat]: prev[stat] - 1,
        points: prev.points + 1,
      }));
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-[700px] bg-gradient-to-b from-[#071B5B]/95 to-black/95 rounded-2xl shadow-lg relative text-cyan-200 border border-cyan-500/30 dialog-box"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          {/* Header Section */}
          <div className="border-b border-cyan-500/30 p-6 dialog-box">
            <h2 className="text-3xl font-bold text-center text-cyan-100 tracking-wider">
              STATUS
            </h2>
          </div>

          {/* Main Content */}
          <div className="p-6 space-y-6 dialog-box">
            {/* Character Info */}
            <div className="grid grid-cols-2 gap-4 dialog-box">
              <div className="space-y-2">
                <p className="text-lg">
                  LEVEL: <span className="text-white font-bold">18</span>
                </p>
                <p className="text-lg">
                  JOB: <span className="text-white">None</span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-lg">
                  TITLE: <span className="text-white">Wolf Assassin</span>
                </p>
                <p className="text-lg">
                  RANK: <span className="text-white">E</span>
                </p>
              </div>
            </div>

            {/* Stats Bars */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-black/30 rounded-lg dialog-box">
              <StatBar label="HP" current={2220} max={2220} color="red" />
              <StatBar label="MP" current={350} max={350} color="blue" />
              <StatBar label="Fatigue" current={0} max={100} color="yellow" />
            </div>

            {/* Stats Section */}
            <div className="space-y-4  bg-black/30 rounded-lg border border-cyan-500/30 dialog-box stats ">
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(stats).map(
                  (stat) =>
                    stat !== "points" && (
                      <StatRow
                        key={stat}
                        stat={stat}
                        value={stats[stat]}
                        pendingValue={pendingChanges[stat] || 0}
                        onIncrease={() => increaseStat(stat)}
                        onDecrease={() => decreaseStat(stat)}
                        description={statDescriptions[stat]}
                        canIncrease={stats.points > 0}
                      />
                    )
                )}
              </div>
              <div className="text-center mt-4 text-lg dialog-box ">
                Available Points:{" "}
                <span className="text-cyan-400 font-bold">{stats.points}</span>
              </div>
            </div>
          </div>
          <div className="border-t border-cyan-500/30 p-4  " />

          {/* Footer Actions */}
          <div className="footer-dialog-box flex justify-end gap-4 ">
            <button
              className="px-6 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-100 rounded-lg transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-black rounded-lg transition-colors"
              onClick={onClose}
            >
              Confirm
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Helper Components
const StatBar = ({ label, current, max, color }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-sm">
      <span>{label}</span>
      <span>
        {current}/{max}
      </span>
    </div>
    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
      <motion.div
        className={`h-full ${
          color === "red"
            ? "bg-red-500"
            : color === "blue"
            ? "bg-blue-500"
            : "bg-yellow-500"
        }`}
        initial={{ width: 0 }}
        animate={{ width: `${(current / max) * 100}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  </div>
);

const StatRow = ({
  stat,
  value,
  pendingValue,
  onIncrease,
  onDecrease,
  description,
  canIncrease,
}) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg group">
      <div className="flex items-center gap-2">
        <div
          className="relative"
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
        >
          <FaInfoCircle className="text-cyan-400/50 group-hover:text-cyan-400 transition-colors" />
          {showInfo && <Tooltip text={description} />}
        </div>
        <span>{stat}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-white font-bold">{value}</span>
        {pendingValue > 0 && (
          <span className="text-green-400 text-sm">+{pendingValue}</span>
        )}
        <div className="flex gap-1">
          <button
            onClick={onDecrease}
            className={`w-6 h-6 center rounded ${
              pendingValue > 0
                ? "bg-red-500/20 hover:bg-red-500/30 text-red-400"
                : "bg-gray-500/20 text-gray-500 cursor-not-allowed"
            }`}
            disabled={pendingValue === 0}
          >
            -
          </button>
          <button
            onClick={onIncrease}
            className={`w-6 h-6 center rounded ${
              canIncrease
                ? "bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400"
                : "bg-gray-500/20 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!canIncrease}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelUpUI;
