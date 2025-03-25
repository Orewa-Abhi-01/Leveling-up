import { useState, useEffect } from 'react';
import { FaBookOpen, FaLock, FaScroll, FaHourglassHalf } from 'react-icons/fa';

// Example story chapters data
const storyChapters = [
  {
    id: 1,
    title: "Awakening",
    description: "Your journey begins as you awaken to your potential as a Hunter.",
    content: `The world changed on that fateful day, when the Gates first appeared.

Suddenly, ordinary people discovered they had the potential to grow stronger than humanly possible - to become Hunters. You were one of them.

As you look at the small blue notification hovering before you, you realize that this is the moment your life changes forever.

"You have acquired the qualifications to be a Player. Will you accept?"

With a deep breath, you reach out and press "Accept."

Welcome to your new reality.`,
    isUnlocked: true,
    thumbnail: "🌅",
    unlockRequirement: null
  },
  {
    id: 2,
    title: "First Steps",
    description: "Your initial training and assessment reveals your hidden potential.",
    content: `The assessment was more intense than you expected. Physical, mental, and spiritual challenges pushed you to your limits.

As the results materialize before you, you see your initial rank: E.

Not impressive, but it's just the beginning. The system seems to measure not just your current abilities, but your potential for growth.

"Your growth rate is... unusual," the examiner notes with raised eyebrows. "Keep training, and you might surprise us all."

You leave the assessment center with a new purpose and a burning question: how high can you climb?`,
    isUnlocked: false,
    thumbnail: "🏋️",
    unlockRequirement: "Complete your first assessment"
  },
  {
    id: 3,
    title: "Hunter's Calling",
    description: "Your first real challenge awaits as you discover your specialization.",
    content: `Three months of training have changed you. Your body feels different - stronger, more responsive. Your mind is sharper.

When the alert comes for your first real mission, your heart races with anticipation.

"A Gate has appeared in the city center. D-rank Hunters requested."

You've just barely reached D-rank, but something tells you this is important. As you approach the swirling portal, the strange energy emanating from it resonates with something inside you.

This is what you were born to do.`,
    isUnlocked: false,
    thumbnail: "🌀",
    unlockRequirement: "Reach D-rank"
  },
  {
    id: 4,
    title: "The Inner Power",
    description: "A discovery within yourself changes everything about your understanding of your abilities.",
    content: `It happened during your third Gate clearing.

Surrounded by shadow creatures, your weapons knocked away, something awakened inside you. A power you didn't know you possessed.

As the energy flowed through your body, you instinctively knew how to shape it, control it. The creatures didn't stand a chance.

"This Hunter has an affinity," the senior Hunter whispered in awe. "And a strong one at that."

Later, as you practice channeling this new power, you realize you've only scratched the surface of your potential.`,
    isUnlocked: false,
    thumbnail: "✨",
    unlockRequirement: "Complete 5 daily quests"
  },
  {
    id: 5,
    title: "Shadows and Secrets",
    description: "Not everything about the Hunter Association is as it seems.",
    content: `The document wasn't meant for your eyes, but now that you've seen it, you can't unsee it.

The Hunter Association has been experimenting with the Gates, not just responding to them. And some of the highest-ranking officials have abilities that don't match any known classification.

When a senior S-rank Hunter catches you with the file, you expect punishment. Instead, she says, "You've noticed it too, haven't you? That something doesn't add up."

She offers you a choice: continue as a regular Hunter, or join a secret division investigating the true nature of the Gates and the power they brought to this world.

Your decision will change everything.`,
    isUnlocked: false,
    thumbnail: "🔍",
    unlockRequirement: "Reach B-rank"
  }
];

const StoryPanel = ({ playerProgress = {}, onChapterRead = () => {} }) => {
  const [chapters, setChapters] = useState(storyChapters);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [readingMode, setReadingMode] = useState(false);
  
  // Check for unlocks based on player progress
  useEffect(() => {
    // This would use real logic based on your app's progression system
    // For example:
    setChapters(prev => {
      return prev.map(chapter => {
        // Example unlock conditions
        if (chapter.id === 2 && playerProgress.hasCompletedAssessment) {
          return { ...chapter, isUnlocked: true };
        }
        if (chapter.id === 3 && playerProgress.rank === 'D') {
          return { ...chapter, isUnlocked: true };
        }
        if (chapter.id === 4 && playerProgress.completedQuests >= 5) {
          return { ...chapter, isUnlocked: true };
        }
        if (chapter.id === 5 && playerProgress.rank === 'B') {
          return { ...chapter, isUnlocked: true };
        }
        return chapter;
      });
    });
  }, [playerProgress, setChapters]);
  
  const handleChapterSelect = (chapter) => {
    if (chapter.isUnlocked) {
      setSelectedChapter(chapter);
      setReadingMode(true);
      // Notify parent component
      onChapterRead(chapter.id);
    }
  };
  
  const handleCloseReading = () => {
    setReadingMode(false);
  };
  
  // Set the first unlocked chapter as the default selected chapter if none is selected
  useEffect(() => {
    if (!selectedChapter && chapters.length > 0) {
      const firstUnlocked = chapters.find(c => c.isUnlocked);
      if (firstUnlocked) {
        setSelectedChapter(firstUnlocked);
      }
    }
  }, [chapters, selectedChapter]);
  
  return (
    <div className="bg-gray-900 text-white rounded-lg border border-cyan-800 overflow-hidden">
      {readingMode ? (
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-cyan-400">
                Chapter {selectedChapter.id}: {selectedChapter.title}
              </h2>
              <p className="text-gray-400 mt-1">{selectedChapter.description}</p>
            </div>
            <button 
              onClick={handleCloseReading}
              className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded"
            >
              Back to Chapters
            </button>
          </div>
          
          <div className="prose prose-invert max-w-none">
            {selectedChapter.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="mt-8 pt-4 border-t border-gray-700 text-sm text-gray-400">
            <p>New chapters will unlock as you progress through your Hunter journey.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="p-6 border-b border-cyan-800 bg-gray-800">
            <h2 className="text-2xl font-bold text-cyan-400 flex items-center">
              <FaBookOpen className="mr-2" /> Your Story
            </h2>
            <p className="text-gray-300 mt-1">
              Your journey as a Hunter unfolds with each achievement.
            </p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chapters.map(chapter => (
                <div 
                  key={chapter.id}
                  onClick={() => handleChapterSelect(chapter)}
                  className={`
                    relative border rounded-lg p-4 transition-all duration-200 cursor-pointer
                    ${chapter.isUnlocked 
                      ? 'bg-gray-800 border-cyan-800/50 hover:border-cyan-400' 
                      : 'bg-gray-800/30 border-gray-700 cursor-not-allowed'}
                  `}
                >
                  {!chapter.isUnlocked && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-lg">
                      <div className="text-center">
                        <FaLock className="mx-auto text-2xl text-gray-500 mb-2" />
                        <p className="text-gray-400 text-sm">
                          {chapter.unlockRequirement}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex">
                    <div className="text-4xl mr-4">{chapter.thumbnail}</div>
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center">
                        {chapter.id}. {chapter.title}
                        {chapter === selectedChapter && (
                          <span className="ml-2 text-xs px-2 py-0.5 bg-cyan-800 text-cyan-200 rounded-full">
                            Current
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-300 mt-1">{chapter.description}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    {chapter.isUnlocked ? (
                      <span className="text-xs text-cyan-400 flex items-center">
                        <FaScroll className="mr-1" /> Unlocked
                      </span>
                    ) : (
                      <span className="text-xs text-gray-500 flex items-center">
                        <FaHourglassHalf className="mr-1" /> Locked
                      </span>
                    )}
                    
                    {chapter.isUnlocked && (
                      <button className="text-xs px-2 py-1 bg-cyan-900 text-cyan-300 rounded hover:bg-cyan-800 transition-colors">
                        Read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 border-t border-cyan-800 bg-gray-800 text-center text-sm text-gray-400">
            Complete quests and improve your rank to unlock more chapters
          </div>
        </>
      )}
    </div>
  );
};

export default StoryPanel; 