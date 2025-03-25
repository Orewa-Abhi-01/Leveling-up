import { useState, useEffect } from 'react';
import { FaLock, FaUnlock, FaCheckCircle } from 'react-icons/fa';

// Example skill tree data structure
const initialSkillTree = {
  fitness: {
    name: "Physical Training",
    description: "Enhance your physical capabilities",
    level: 0,
    maxLevel: 5,
    icon: "💪",
    children: [
      {
        id: "endurance",
        name: "Endurance",
        description: "Increase stamina and recovery",
        level: 0,
        maxLevel: 3,
        icon: "🏃",
        locked: true,
        requiresParentLevel: 2,
        children: []
      },
      {
        id: "strength",
        name: "Strength",
        description: "Increase raw power and carrying capacity",
        level: 0,
        maxLevel: 3,
        icon: "🏋️",
        locked: true,
        requiresParentLevel: 2,
        children: []
      }
    ]
  },
  mental: {
    name: "Mental Fortitude",
    description: "Strengthen your mind",
    level: 0,
    maxLevel: 5,
    icon: "🧠",
    children: [
      {
        id: "focus",
        name: "Focus",
        description: "Improve concentration and attention",
        level: 0,
        maxLevel: 3,
        icon: "🎯",
        locked: true,
        requiresParentLevel: 2,
        children: []
      },
      {
        id: "willpower",
        name: "Willpower",
        description: "Enhance mental resilience",
        level: 0,
        maxLevel: 3,
        icon: "⚡",
        locked: true,
        requiresParentLevel: 2,
        children: []
      }
    ]
  },
  spiritual: {
    name: "Spiritual Growth",
    description: "Develop your inner power",
    level: 0,
    maxLevel: 5,
    icon: "✨",
    children: [
      {
        id: "meditation",
        name: "Meditation",
        description: "Enhance spiritual awareness",
        level: 0,
        maxLevel: 3,
        icon: "🧘",
        locked: true,
        requiresParentLevel: 2,
        children: []
      },
      {
        id: "energy",
        name: "Energy Control",
        description: "Harness your inner energy",
        level: 0,
        maxLevel: 3,
        icon: "🔮",
        locked: true,
        requiresParentLevel: 2,
        children: []
      }
    ]
  }
};

const SkillNode = ({ skill, onUpgrade, skillPoints, path = "" }) => {
  const currentPath = path ? `${path}.${skill.id}` : skill.id;
  const canUpgrade = !skill.locked && skill.level < skill.maxLevel && skillPoints > 0;
  
  return (
    <div className="flex flex-col items-center mb-4">
      <div 
        className={`relative w-20 h-20 rounded-full flex items-center justify-center text-center p-2 cursor-pointer transition-all duration-200 ${
          skill.locked 
            ? "bg-gray-700 text-gray-500 border-2 border-gray-600" 
            : canUpgrade
              ? "bg-blue-900 text-cyan-300 border-2 border-cyan-400 hover:bg-blue-700 hover:scale-105"
              : "bg-gray-800 text-cyan-300 border-2 border-cyan-400"
        }`}
        onClick={() => canUpgrade && onUpgrade(currentPath)}
      >
        <div className="text-2xl mb-1">{skill.icon}</div>
        <div className="text-xs font-bold">{skill.name}</div>
        
        {skill.locked ? (
          <FaLock className="absolute -bottom-1 -right-1 text-lg text-gray-400 bg-gray-700 rounded-full p-1" />
        ) : skill.level === skill.maxLevel ? (
          <FaCheckCircle className="absolute -bottom-1 -right-1 text-lg text-green-400 bg-gray-800 rounded-full p-1" />
        ) : (
          <div className="absolute -bottom-1 -right-1 bg-blue-900 text-xs text-white rounded-full w-6 h-6 flex items-center justify-center border border-cyan-400">
            {skill.level}/{skill.maxLevel}
          </div>
        )}
      </div>
      
      {skill.children?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700 flex justify-center gap-8">
          {skill.children.map((childSkill) => (
            <SkillNode 
              key={childSkill.id} 
              skill={childSkill} 
              onUpgrade={onUpgrade}
              skillPoints={skillPoints}
              path={currentPath}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SkillTree = ({ playerStats, onSkillUpgrade }) => {
  const [skillTree, setSkillTree] = useState(() => {
    // Try to load from localStorage
    const savedTree = localStorage.getItem('skillTree');
    return savedTree ? JSON.parse(savedTree) : initialSkillTree;
  });
  
  const [skillPoints, setSkillPoints] = useState(5); // Example starting points
  
  // Save to localStorage whenever the skill tree changes
  useEffect(() => {
    localStorage.setItem('skillTree', JSON.stringify(skillTree));
  }, [skillTree]);
  
  // Update skill and child nodes recursively
  const updateSkillNode = (obj, path, upgradeFn) => {
    const [current, ...rest] = path.split('.');
    
    if (!rest.length) {
      // We're at the target node
      return upgradeFn(obj[current]);
    }
    
    // Clone the current level before recuring deeper
    const newObj = { ...obj };
    newObj[current] = { 
      ...newObj[current], 
      children: [...newObj[current].children] 
    };
    
    // Recurse into children
    newObj[current].children = updateSkillNode(
      newObj[current].children.reduce((acc, child) => {
        acc[child.id] = child;
        return acc;
      }, {}),
      rest.join('.'),
      upgradeFn
    );
    
    // Convert back to array
    newObj[current].children = Object.values(newObj[current].children);
    
    // Check if any children should be unlocked based on parent's level
    newObj[current].children = newObj[current].children.map(child => {
      if (child.locked && child.requiresParentLevel && newObj[current].level >= child.requiresParentLevel) {
        return { ...child, locked: false };
      }
      return child;
    });
    
    return newObj;
  };
  
  const handleUpgradeSkill = (skillPath) => {
    if (skillPoints <= 0) return;
    
    setSkillTree(prevTree => {
      const newTree = updateSkillNode(prevTree, skillPath, (skill) => {
        if (skill.level < skill.maxLevel) {
          return { ...skill, level: skill.level + 1 };
        }
        return skill;
      });
      
      return newTree;
    });
    
    setSkillPoints(prev => prev - 1);
    
    // Call parent component's handler if provided
    if (onSkillUpgrade) {
      onSkillUpgrade(skillPath);
    }
  };
  
  // Get all main skill categories
  const mainSkills = Object.keys(skillTree);
  
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg border border-cyan-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-cyan-400">Skills & Abilities</h2>
        <div className="px-4 py-2 bg-blue-900 rounded-lg border border-cyan-400">
          <span className="font-bold">Available Points:</span> 
          <span className="ml-2 text-xl text-cyan-300">{skillPoints}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {mainSkills.map(skillKey => (
          <div key={skillKey} className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
            <SkillNode 
              skill={{...skillTree[skillKey], id: skillKey}} 
              onUpgrade={handleUpgradeSkill}
              skillPoints={skillPoints}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillTree; 