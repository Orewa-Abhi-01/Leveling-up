import { useState, useEffect } from 'react';
import { FaTrophy, FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';

// Mock data - in a real app, this would come from a database
const mockLeaderboardData = [
  { id: 1, name: "ShadowHunter", rank: "S", level: 45, xp: 8750, avatarUrl: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "DarkKnight", rank: "A", level: 42, xp: 8200, avatarUrl: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "MysticMage", rank: "S", level: 41, xp: 8100, avatarUrl: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "BladeMaster", rank: "B", level: 39, xp: 7800, avatarUrl: "https://i.pravatar.cc/150?img=4" },
  { id: 5, name: "PhantomThief", rank: "A", level: 38, xp: 7600, avatarUrl: "https://i.pravatar.cc/150?img=5" },
  { id: 6, name: "ElementalWizard", rank: "C", level: 36, xp: 7200, avatarUrl: "https://i.pravatar.cc/150?img=6" },
  { id: 7, name: "CrimsonArcher", rank: "B", level: 35, xp: 7000, avatarUrl: "https://i.pravatar.cc/150?img=7" },
  { id: 8, name: "SteelGuardian", rank: "D", level: 33, xp: 6600, avatarUrl: "https://i.pravatar.cc/150?img=8" },
  { id: 9, name: "WinterWolf", rank: "C", level: 31, xp: 6200, avatarUrl: "https://i.pravatar.cc/150?img=9" },
  { id: 10, name: "StormRider", rank: "E", level: 29, xp: 5800, avatarUrl: "https://i.pravatar.cc/150?img=10" },
];

// Rank colors for visual distinction
const getRankColor = (rank) => {
  switch (rank) {
    case 'S': return 'text-purple-400';
    case 'A': return 'text-cyan-400';
    case 'B': return 'text-blue-400';
    case 'C': return 'text-green-400';
    case 'D': return 'text-yellow-400';
    case 'E': return 'text-gray-400';
    default: return 'text-white';
  }
};

const Leaderboard = ({ currentUserId = null }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [timeframe, setTimeframe] = useState('weekly'); // 'daily', 'weekly', 'monthly', 'allTime'
  const [isLoading, setIsLoading] = useState(true);
  
  // Track position changes
  const [positionChanges, setPositionChanges] = useState({});
  
  useEffect(() => {
    // In a real app, you would fetch data from an API
    // For this example, we'll simulate loading with the mock data
    setIsLoading(true);
    
    setTimeout(() => {
      setLeaderboardData(mockLeaderboardData);
      
      // Simulate position changes
      const changes = {};
      mockLeaderboardData.forEach((player, index) => {
        // Random position change for demonstration
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        changes[player.id] = change;
      });
      
      setPositionChanges(changes);
      setIsLoading(false);
    }, 1000);
  }, [timeframe]);
  
  const getPositionChange = (playerId) => {
    const change = positionChanges[playerId] || 0;
    
    if (change > 0) {
      return <FaArrowUp className="text-green-500" />;
    } else if (change < 0) {
      return <FaArrowDown className="text-red-500" />;
    } else {
      return <FaMinus className="text-gray-500" />;
    }
  };
  
  const isCurrentUser = (playerId) => currentUserId === playerId;
  
  return (
    <div className="bg-gray-900 text-white rounded-lg border border-cyan-800 overflow-hidden">
      <div className="p-4 border-b border-cyan-800 bg-gray-800">
        <h2 className="text-2xl font-bold text-cyan-400">Hunter Rankings</h2>
        
        <div className="mt-4 flex justify-between">
          <div className="flex space-x-2">
            {['daily', 'weekly', 'monthly', 'allTime'].map((option) => (
              <button
                key={option}
                className={`px-3 py-1 rounded-md text-sm ${
                  timeframe === option 
                    ? 'bg-cyan-700 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setTimeframe(option)}
              >
                {option.charAt(0).toUpperCase() + option.slice(1).replace('T', ' T')}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 text-gray-300 text-sm">
                <th className="py-3 text-center w-16">#</th>
                <th className="py-3 text-left pl-4">Hunter</th>
                <th className="py-3 text-center">Rank</th>
                <th className="py-3 text-center">Level</th>
                <th className="py-3 text-center">XP</th>
                <th className="py-3 text-center w-16">Trend</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((player, index) => (
                <tr 
                  key={player.id} 
                  className={`border-t border-gray-800 ${
                    isCurrentUser(player.id) 
                      ? 'bg-blue-900/30' 
                      : index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-900'
                  } hover:bg-gray-700 transition-colors`}
                >
                  <td className="py-4 text-center">
                    {index < 3 ? (
                      <FaTrophy className={
                        index === 0 
                          ? "text-yellow-400 inline-block" 
                          : index === 1 
                            ? "text-gray-300 inline-block" 
                            : "text-yellow-700 inline-block"
                      } />
                    ) : (
                      <span className="text-gray-400">{index + 1}</span>
                    )}
                  </td>
                  <td className="py-3 pl-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                        <img 
                          src={player.avatarUrl} 
                          alt={player.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className={isCurrentUser(player.id) ? "font-bold text-cyan-300" : ""}>
                        {player.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 text-center">
                    <span className={`font-bold ${getRankColor(player.rank)}`}>
                      {player.rank}
                    </span>
                  </td>
                  <td className="py-3 text-center">{player.level}</td>
                  <td className="py-3 text-center">{player.xp.toLocaleString()}</td>
                  <td className="py-3 text-center">{getPositionChange(player.id)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="p-4 border-t border-cyan-800 bg-gray-800 text-center text-sm text-gray-400">
        Rankings reset every Monday at 00:00 UTC
      </div>
    </div>
  );
};

export default Leaderboard; 