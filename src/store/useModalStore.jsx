import { create } from 'zustand';
import { INITIAL_PLAYER_STATS, RANK_VALUES } from "../constants/index.js";

const useModalStore = create((set, get) => ({

    isAccepted: false,
    isEntering: false,
    playerName: "",
    rank: "E",
    xp: 0,
    isSubmitted: false,
    showAssessment: false,
    showPortalVideo: false,
    playerStats: INITIAL_PLAYER_STATS,

    // Actions
    setIsAccepted: (value) => set({ isAccepted: value }),
    setIsEntering: (value) => set({ isEntering: value }),
    setPlayerName: (value) => set({ playerName: value }),
    setRank: (value) => set({ rank: value }),
    setXp: (value) => set({ xp: value }),
    setIsSubmitted: (value) => set({ isSubmitted: value }),
    setShowAssessment: (value) => set({ showAssessment: value }),
    setShowPortalVideo: (value) => set({ showPortalVideo: value }),
    setPlayerStats: (value) => set({ playerStats: value }),

    handleAccept: () => set({ isAccepted: true }),

    handleEnter: () => set({ isEntering: true }),

    handleNameSubmit: () => {
        const { playerName, rank, xp } = get();

        if(playerName.trim().length === 0) {
          alert("Please enter a valid name!")
          return;
        }
        localStorage.setItem("playerName", playerName);
        localStorage.setItem("playerRank", rank);
        localStorage.setItem("playerXP", xp);
        
        set((state) => ({
            isSubmitted: true,
            showAssessment: true,
            playerStats: {...state.playerStats, rank: RANK_VALUES[rank], xp: xp, level: 1, fitness: 0, mental: 0, spiritual: 0, skills: 0}
        }));
    },

    // Initialize stored data
    initializeFromStorage: () => {
        const storedName = localStorage.getItem("playerName");
        const storedRank = localStorage.getItem("rank");
        const storedXp = localStorage.getItem("xp");

        if (storedName) {
            set({ playerName: storedName, rank: storedRank || "E", xp: storedXp ? parseInt(storedXp) : 0 });
        }
    }
}));

export default useModalStore;