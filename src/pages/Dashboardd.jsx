import { useState, useEffect } from 'react';
import { FaUser, FaChartLine, FaBookOpen, FaTasks, FaTrophy, FaCog, FaBars, FaTimes } from 'react-icons/fa';

// Import components
import PlayerHUD from '../components/game/PlayerHUD';
import QuestSystem from '../components/game/QuestSystem';
import SkillTree from '../components/game/SkillTree';
import StoryPanel from '../components/game/StoryPanel';
import Leaderboard from '../components/Leaderboard';
// import audioManager from '../utils/AudioManager';

// Import sound effects and music
// import dashboardMusic from '../assets/music/Nagada.mp3';
// import notificationSound from '../assets/notification.mp3';
// import levelUpSound from '../assets/level-up.mp3';

const Dashboardd = () => {
  // Player state
  const [playerStats, setPlayerStats] = useState(() => {
    const savedStats = localStorage.getItem('playerStats');
    return savedStats ? JSON.parse(savedStats) : {
      name: localStorage.getItem('playerName') || 'Hunter',
      rank: localStorage.getItem('rank') || 'E',
      level: 1,
      xp: 0,
      maxXp: 100,
      skillPoints: 0,
      fitness: 10,
      mental: 10,
      spiritual: 10,
      skills: 10,
      completedQuests: 0,
      hasCompletedAssessment: true,
    };
  });
  
  // UI state
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);
  
  // Initialize audio manager
  // useEffect(() => {
  //   audioManager.init(
  //     // Sound effects
  //     // {
  //     //   notification: notificationSound,
  //     //   levelUp: levelUpSound,
  //     //   click: '../assets/click-for-game-menu.mp3',
  //     // },
  //     // Music tracks
  //     {
  //       dashboard: dashboardMusic,
  //       arena: '../assets/DARK-ARIA-LV2.mp3',
  //     }
  //   );
    
  //   // Start playing dashboard music
  //   audioManager.playMusic('dashboard');
    
  //   return () => {
  //     audioManager.stopMusic();
  //   };
  // }, []);
  
  // Save player stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('playerStats', JSON.stringify(playerStats));
  }, [playerStats]);
  
  // Handle quest rewards
  const handleQuestUpdate = (update) => {
    if (update.type === 'reward_claimed') {
      // Add XP
      addXP(update.reward.xp);
      
      // Add notification
      addNotification({
        title: 'Quest Completed',
        message: `You earned ${update.reward.xp} XP`,
        type: 'success',
      });
      
      // Update completed quests count
      setPlayerStats(prev => ({
        ...prev,
        completedQuests: prev.completedQuests + 1,
      }));
    }
  };
  
  // Handle skill upgrades
  const handleSkillUpgrade = (skillPath) => {
    // Update player stats based on skill path
    setPlayerStats(prev => {
      const newStats = { ...prev };
      
      // Update skill stat based on main category
      if (skillPath.startsWith('fitness')) {
        newStats.fitness += 5;
      } else if (skillPath.startsWith('mental')) {
        newStats.mental += 5;
      } else if (skillPath.startsWith('spiritual')) {
        newStats.spiritual += 5;
      } else if (skillPath.startsWith('skills')) {
        newStats.skills += 5;
      }
      
      return newStats;
    });
    
    // Add notification
    addNotification({
      title: 'Skill Upgraded',
      message: `You've improved a skill in your skill tree.`,
      type: 'info',
    });
  };
  
  // Add XP and handle level ups
  const addXP = (amount) => {
    setPlayerStats(prev => {
      const newXP = prev.xp + amount;
      const newLevel = prev.level;
      const newMaxXp = prev.maxXp;
      
      // Check for level up
      if (newXP >= newMaxXp) {
        // Play level up sound
        // audioManager.play('levelUp');
        
        // Add level up notification
        addNotification({
          title: 'Level Up!',
          message: `You've reached level ${newLevel + 1}! +1 Skill Point awarded.`,
          type: 'levelUp',
        });
        
        return {
          ...prev,
          level: newLevel + 1,
          xp: newXP - newMaxXp,
          maxXp: Math.round(newMaxXp * 1.2), // Increase max XP for next level
          skillPoints: prev.skillPoints + 1, // Award skill point on level up
        };
      }
      
      return {
        ...prev,
        xp: newXP,
      };
    });
  };
  
  // Add a notification to the queue
  const addNotification = (notification) => {
    // Play notification sound
    // audioManager.play('notification');
    
    const newNotification = {
      id: Date.now(),
      ...notification,
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show the notification
    setCurrentNotification(newNotification);
    setShowNotification(true);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };
  
  // Mark a notification as read
  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(note => note.id === id ? { ...note, read: true } : note)
    );
  };
  
  // Dismiss notification popup
  const dismissNotification = () => {
    setShowNotification(false);
    if (currentNotification) {
      markNotificationAsRead(currentNotification.id);
    }
  };
  
  // Get unread notifications count
  // const unreadCount = notifications.filter(n => !n.read).length;
  
  // Navigation items
  const navItems = [
    { id: 'overview', name: 'Overview', icon: <FaChartLine /> },
    { id: 'quests', name: 'Quests', icon: <FaTasks /> },
    { id: 'skills', name: 'Skills', icon: <FaUser /> },
    { id: 'story', name: 'Story', icon: <FaBookOpen /> },
    { id: 'rankings', name: 'Rankings', icon: <FaTrophy /> },
    { id: 'settings', name: 'Settings', icon: <FaCog /> },
  ];
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top navigation bar */}
      <header className="bg-gray-800 border-b border-cyan-800 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <button 
            className="md:hidden mr-4 text-cyan-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <h1 className="text-xl font-bold text-cyan-400">Solo Leveling</h1>
        </div>
        
        <PlayerHUD playerStats={playerStats} />
      </header>
      
      <div className="flex flex-col md:flex-row">
        {/* Sidebar navigation */}
        <aside 
          className={`
            bg-gray-900 border-r border-cyan-800 w-full md:w-64 md:min-h-[calc(100vh-64px)] md:block
            ${mobileMenuOpen ? 'block' : 'hidden'}
          `}
        >
          <nav className="p-4 flex nav">
            <ul className=" flex gap-4 ">
              {navItems.map(item => (
                <li key={item.id} className="mb-2 ">
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                      // audioManager.play('click');
                    }}
                    className={`
                      w-full px-4 py-3 rounded-lg flex items-center transition-colors
                      ${activeTab === item.id 
                        ? 'bg-cyan-900 text-cyan-300' 
                        : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}
                    `}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        
        {/* Main content area */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-cyan-800">
                <h2 className="text-xl font-bold text-cyan-400 mb-4">Hunter Profile</h2>
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Name:</span>
                    <span className="font-medium">{playerStats.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Rank:</span>
                    <span className="font-medium text-cyan-400">{playerStats.rank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Level:</span>
                    <span className="font-medium">{playerStats.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Quests Completed:</span>
                    <span className="font-medium">{playerStats.completedQuests}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-cyan-800">
                <h2 className="text-xl font-bold text-cyan-400 mb-4">Stats</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Fitness</span>
                      <span>{playerStats.fitness}/100</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${playerStats.fitness}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Mental</span>
                      <span>{playerStats.mental}/100</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${playerStats.mental}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Spiritual</span>
                      <span>{playerStats.spiritual}/100</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${playerStats.spiritual}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Skills</span>
                      <span>{playerStats.skills}/100</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${playerStats.skills}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2 lg:col-span-1 bg-gray-800 rounded-lg p-6 border border-cyan-800">
                <h2 className="text-xl font-bold text-cyan-400 mb-4">Recent Activity</h2>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div 
                        key={notification.id}
                        className={`p-3 rounded-lg ${
                          notification.read ? 'bg-gray-700/50' : 'bg-gray-700'
                        } ${
                          notification.type === 'success' ? 'border-l-4 border-green-500' :
                          notification.type === 'levelUp' ? 'border-l-4 border-yellow-500' :
                          'border-l-4 border-cyan-500'
                        }`}
                      >
                        <h3 className="font-bold text-sm">{notification.title}</h3>
                        <p className="text-sm text-gray-300">{notification.message}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-4">No recent activity</p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'quests' && (
            <QuestSystem 
              playerLevel={playerStats.level} 
              onQuestUpdate={handleQuestUpdate} 
            />
          )}
          
          {activeTab === 'skills' && (
            <SkillTree 
              playerStats={playerStats} 
              onSkillUpgrade={handleSkillUpgrade} 
            />
          )}
          
          {activeTab === 'story' && (
            <StoryPanel 
              playerProgress={playerStats}
              onChapterRead={() => {
                // Add XP for reading chapters
                addXP(10);
              }} 
            />
          )}
          
          {activeTab === 'rankings' && (
            <Leaderboard />
          )}
          
          {activeTab === 'settings' && (
            <div className="bg-gray-800 rounded-lg p-6 border border-cyan-800">
              <h2 className="text-xl font-bold text-cyan-400 mb-6">Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Audio Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Music Volume
                      </label>
                      <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.1" 
                        defaultValue="0.5"
                        // onChange={(e) => audioManager.setMusicVolume(parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Sound Effects Volume
                      </label>
                      <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.1" 
                        defaultValue="0.8"
                        // onChange={(e) => audioManager.setSfxVolume(parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <button 
                        onClick={() => {
                          // const isMuted = audioManager.toggleMute();
                          addNotification({
                            // title: isMuted ? 'Sound Muted' : 'Sound Unmuted',
                            // message: isMuted ? 'All audio has been muted.' : 'Audio has been unmuted.',
                            type: 'info',
                          });
                        }}
                        className="px-4 py-2 bg-cyan-700 hover:bg-cyan-600 text-white rounded"
                      >
                        Toggle Mute
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <h3 className="text-lg font-medium mb-4">Account</h3>
                  <button 
                    className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded"
                    onClick={() => {
                      if (confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
                        localStorage.removeItem('playerStats');
                        localStorage.removeItem('skillTree');
                        localStorage.removeItem('quests');
                        window.location.reload();
                      }
                    }}
                  >
                    Reset Progress
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      
      {/* Notification popups */}
      {showNotification && currentNotification && (
        <div 
          className={`
            fixed bottom-4 right-4 max-w-xs w-full p-4 rounded-lg shadow-lg
            ${currentNotification.type === 'success' ? 'bg-green-900' : 
             currentNotification.type === 'levelUp' ? 'bg-yellow-900' :
             'bg-cyan-900'}
            transform transition-transform duration-300 ease-out
            ${showNotification ? 'translate-y-0' : 'translate-y-20'}
          `}
        >
          <div className="flex justify-between items-start">
            <h3 className="font-bold">{currentNotification.title}</h3>
            <button onClick={dismissNotification} className="text-gray-300 hover:text-white">
              <FaTimes />
            </button>
          </div>
          <p className="mt-1 text-sm">{currentNotification.message}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboardd; 