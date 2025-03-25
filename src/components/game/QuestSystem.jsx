import { useState, useEffect } from 'react';
import { FaClock, FaStar, FaTrophy, FaCheck, FaArrowRight, FaLock } from 'react-icons/fa';

// Quest status constants
const QUEST_STATUS = {
  AVAILABLE: 'available',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CLAIMED: 'claimed',
  LOCKED: 'locked'
};

// Quest difficulty levels
const QUEST_DIFFICULTY = {
  EASY: { name: 'Easy', color: 'text-green-400', xp: '20-50' },
  MEDIUM: { name: 'Medium', color: 'text-yellow-400', xp: '50-100' },
  HARD: { name: 'Hard', color: 'text-red-400', xp: '100-200' },
  EPIC: { name: 'Epic', color: 'text-purple-400', xp: '200-500' }
};

// Mock quest data - in a real app, this would come from a server
const mockQuests = {
  daily: [
    {
      id: 'd1',
      title: 'Morning Meditation',
      description: 'Complete a 5-minute meditation exercise',
      type: 'daily',
      status: QUEST_STATUS.AVAILABLE,
      difficulty: QUEST_DIFFICULTY.EASY,
      reward: { xp: 25, items: [] },
      progress: { current: 0, target: 1 },
      category: 'spiritual',
      icon: '🧘',
    },
    {
      id: 'd2',
      title: 'Quick Workout',
      description: 'Complete a 10-minute workout routine',
      type: 'daily',
      status: QUEST_STATUS.AVAILABLE,
      difficulty: QUEST_DIFFICULTY.MEDIUM,
      reward: { xp: 50, items: [] },
      progress: { current: 0, target: 1 },
      category: 'fitness',
      icon: '💪',
    },
    {
      id: 'd3',
      title: 'Knowledge Pursuit',
      description: 'Read an educational article or book chapter',
      type: 'daily',
      status: QUEST_STATUS.AVAILABLE,
      difficulty: QUEST_DIFFICULTY.EASY,
      reward: { xp: 30, items: [] },
      progress: { current: 0, target: 1 },
      category: 'mental',
      icon: '📚',
    }
  ],
  weekly: [
    {
      id: 'w1',
      title: 'Endurance Challenge',
      description: 'Complete a 30-minute cardio session',
      type: 'weekly',
      status: QUEST_STATUS.AVAILABLE,
      difficulty: QUEST_DIFFICULTY.MEDIUM,
      reward: { xp: 100, items: ['Endurance Badge'] },
      progress: { current: 0, target: 3 },
      category: 'fitness',
      icon: '🏃',
    },
    {
      id: 'w2',
      title: 'Mental Fortitude',
      description: 'Complete 3 challenging puzzles or brain teasers',
      type: 'weekly',
      status: QUEST_STATUS.AVAILABLE,
      difficulty: QUEST_DIFFICULTY.HARD,
      reward: { xp: 150, items: ['Mind Stone'] },
      progress: { current: 0, target: 3 },
      category: 'mental',
      icon: '🧠',
    }
  ],
  special: [
    {
      id: 's1',
      title: 'Hunter Ascension',
      description: 'Complete all daily quests for 7 consecutive days',
      type: 'special',
      status: QUEST_STATUS.LOCKED,
      difficulty: QUEST_DIFFICULTY.EPIC,
      reward: { xp: 500, items: ['Hunter Emblem', 'Rank Promotion'] },
      progress: { current: 0, target: 7 },
      category: 'achievement',
      icon: '✨',
      requirements: 'Reach Level 10',
    },
    {
      id: 's2',
      title: 'Mind-Body Balance',
      description: 'Achieve perfect scores in both physical and mental challenges',
      type: 'special',
      status: QUEST_STATUS.LOCKED,
      difficulty: QUEST_DIFFICULTY.HARD,
      reward: { xp: 300, items: ['Balance Aura'] },
      progress: { current: 0, target: 5 },
      category: 'achievement',
      icon: '☯️',
      requirements: 'Complete 10 daily quests',
    }
  ]
};

// Helper component for quest cards
const QuestCard = ({ quest, onAccept, onComplete, onClaim }) => {
  const isAvailable = quest.status === QUEST_STATUS.AVAILABLE;
  const isInProgress = quest.status === QUEST_STATUS.IN_PROGRESS;
  const isCompleted = quest.status === QUEST_STATUS.COMPLETED;
  const isClaimed = quest.status === QUEST_STATUS.CLAIMED;
  const isLocked = quest.status === QUEST_STATUS.LOCKED;
  
  // Calculate progress percentage
  const progressPercent = Math.round((quest.progress.current / quest.progress.target) * 100);
  
  return (
    <div 
      className={`
        relative border rounded-lg p-4 transition-all duration-200
        ${isLocked ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-800 border-cyan-800/50'}
        ${isInProgress ? 'border-blue-500/50' : ''}
        ${isCompleted ? 'border-green-500/50' : ''}
        ${isClaimed ? 'border-purple-500/50 opacity-75' : ''}
        ${isAvailable || isInProgress ? 'hover:border-cyan-400' : ''}
      `}
    >
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
          <div className="text-center p-4">
            <FaLock className="text-gray-400 text-3xl mx-auto mb-2" />
            <p className="text-gray-300 text-sm">{quest.requirements}</p>
          </div>
        </div>
      )}
      
      <div className="flex items-start mb-3">
        <div className="text-2xl mr-3">{quest.icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white flex items-center">
            {quest.title}
            {quest.type === 'special' && (
              <FaStar className="text-yellow-400 ml-2" />
            )}
          </h3>
          <p className="text-sm text-gray-300 mt-1">{quest.description}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
        <span className={quest.difficulty.color}>
          {quest.difficulty.name}
        </span>
        <span className="flex items-center gap-1">
          <FaClock className="text-gray-500" /> 
          {quest.type === 'daily' ? 'Resets daily' : quest.type === 'weekly' ? 'Resets weekly' : 'Limited Time'}
        </span>
      </div>
      
      {(isInProgress || isCompleted) && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-300 mb-1">
            <span>Progress</span>
            <span>{quest.progress.current}/{quest.progress.target}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-blue-500'}`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <FaTrophy className="text-yellow-400 mr-1" />
          <span className="text-sm font-medium text-white">{quest.reward.xp} XP</span>
          {quest.reward.items.length > 0 && (
            <span className="text-xs text-gray-300 ml-2">+ {quest.reward.items.length} item(s)</span>
          )}
        </div>
        
        <div>
          {isAvailable && (
            <button 
              onClick={() => onAccept(quest.id)}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-500 transition-colors flex items-center"
            >
              Accept <FaArrowRight className="ml-1" />
            </button>
          )}
          
          {isInProgress && (
            <button
              onClick={() => onComplete(quest.id)}
              className={`px-3 py-1 bg-gray-700 text-white text-sm rounded transition-colors flex items-center ${
                quest.progress.current >= quest.progress.target 
                  ? 'bg-green-600 hover:bg-green-500' 
                  : ''
              }`}
              disabled={quest.progress.current < quest.progress.target}
            >
              {quest.progress.current >= quest.progress.target ? (
                <>Complete <FaCheck className="ml-1" /></>
              ) : (
                'In Progress'
              )}
            </button>
          )}
          
          {isCompleted && (
            <button
              onClick={() => onClaim(quest.id)}
              className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-500 transition-colors flex items-center"
            >
              Claim Reward
            </button>
          )}
          
          {isClaimed && (
            <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded flex items-center">
              Claimed <FaCheck className="ml-1 text-green-500" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const QuestSystem = ({ playerLevel = 1, onQuestUpdate = () => {} }) => {
  const [activeTab, setActiveTab] = useState('daily');
  const [quests, setQuests] = useState(mockQuests);
  
  // Load quests from local storage or initialize with mock data
  useEffect(() => {
    const savedQuests = localStorage.getItem('quests');
    if (savedQuests) {
      setQuests(JSON.parse(savedQuests));
    } else {
      // Initialize with mock data
      setQuests(mockQuests);
    }
  }, []);
  
  // Save quests to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('quests', JSON.stringify(quests));
  }, [quests]);
  
  // Handle accepting a quest
  const handleAcceptQuest = (questId) => {
    setQuests(prev => {
      const newQuests = { ...prev };
      
      // Find the quest in any category
      Object.keys(newQuests).forEach(category => {
        const questIndex = newQuests[category].findIndex(q => q.id === questId);
        if (questIndex !== -1) {
          newQuests[category][questIndex] = {
            ...newQuests[category][questIndex],
            status: QUEST_STATUS.IN_PROGRESS
          };
        }
      });
      
      return newQuests;
    });
  };
  
  // Handle completing a quest
  const handleCompleteQuest = (questId) => {
    setQuests(prev => {
      const newQuests = { ...prev };
      
      // Find the quest in any category
      Object.keys(newQuests).forEach(category => {
        const questIndex = newQuests[category].findIndex(q => q.id === questId);
        if (questIndex !== -1) {
          newQuests[category][questIndex] = {
            ...newQuests[category][questIndex],
            status: QUEST_STATUS.COMPLETED
          };
        }
      });
      
      return newQuests;
    });
  };
  
  // Handle claiming a quest reward
  const handleClaimReward = (questId) => {
    setQuests(prev => {
      const newQuests = { ...prev };
      
      // Find the quest in any category
      Object.keys(newQuests).forEach(category => {
        const questIndex = newQuests[category].findIndex(q => q.id === questId);
        if (questIndex !== -1) {
          const quest = newQuests[category][questIndex];
          
          // Update quest status
          newQuests[category][questIndex] = {
            ...quest,
            status: QUEST_STATUS.CLAIMED
          };
          
          // Notify parent component about the reward
          onQuestUpdate({
            type: 'reward_claimed',
            questId,
            reward: quest.reward
          });
        }
      });
      
      return newQuests;
    });
  };
  
  // For demo purposes: update progress of an in-progress quest
  const updateQuestProgress = (questId) => {
    setQuests(prev => {
      const newQuests = { ...prev };
      
      // Find the quest in any category
      Object.keys(newQuests).forEach(category => {
        const questIndex = newQuests[category].findIndex(q => q.id === questId);
        if (questIndex !== -1 && newQuests[category][questIndex].status === QUEST_STATUS.IN_PROGRESS) {
          const quest = newQuests[category][questIndex];
          
          // Increment progress up to the target
          if (quest.progress.current < quest.progress.target) {
            newQuests[category][questIndex] = {
              ...quest,
              progress: {
                ...quest.progress,
                current: quest.progress.current + 1
              }
            };
          }
        }
      });
      
      return newQuests;
    });
  };
  
  return (
    <div className="bg-gray-900 text-white rounded-lg border border-cyan-800 p-6">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">Quest Board</h2>
      
      <div className="flex border-b border-gray-700 mb-6">
        {['daily', 'weekly', 'special'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab !== 'special' && (
              <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-gray-700">
                {quests[tab].length}
              </span>
            )}
          </button>
        ))}
      </div>
      
      <div className="space-y-4">
        {quests[activeTab].map(quest => (
          <QuestCard
            key={quest.id}
            quest={quest}
            onAccept={handleAcceptQuest}
            onComplete={handleCompleteQuest}
            onClaim={handleClaimReward}
          />
        ))}
      </div>
      
      {/* Demo controls - would be removed in a real app */}
      <div className="mt-8 pt-4 border-t border-gray-700">
        <h3 className="text-sm font-medium text-gray-400 mb-2">Demo Controls</h3>
        <div className="flex flex-wrap gap-2">
          {quests[activeTab]
            .filter(q => q.status === QUEST_STATUS.IN_PROGRESS)
            .map(quest => (
              <button
                key={quest.id}
                onClick={() => updateQuestProgress(quest.id)}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded"
              >
                Progress "{quest.title.substring(0, 15)}..."
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default QuestSystem; 