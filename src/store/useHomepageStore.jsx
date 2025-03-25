import { create } from "zustand";

const useHomepageStore = create((set) => ({
  // panel visibility states
  isQuestOpen: false,
  isShowingDashboard: true,
  isStoryPanelOpen: false,
  isSkillTreeShown: false,
  showPlayerHUD: false,

  // functions to update panel visibility states
  handleDailyQuest: () =>
    set((state) => ({
      isQuestOpen: !state.isQuestOpen,
      isShowingDashboard: state.isQuestOpen, // show dashboard when quest panel is open,
      isStoryPanelOpen: false,
      isSkillTreeShown: false,
      showPlayerHUD: false,
    })),

  handleShowSkillTree: () =>
    set((state) => ({
      isSkillTreeShown: !state.isSkillTreeShown,
      isShowingDashboard: state.isSkillTreeShown, // show dashboard when skill tree panel is open,
      isStoryPanelOpen: false,
      isQuestOpen: false,
      showPlayerHUD: false,
    })),

  handleStoryOpen: () =>
    set((state) => ({
      isStoryPanelOpen: !state.isStoryPanelOpen,
      isShowingDashboard: state.isStoryPanelOpen, // show dashboard when story panel is open,
      isSkillTreeShown: false,
      isQuestOpen: false,
      showPlayerHUD: false,
    })),

  handlePlayerHUD: () =>
    set((state) => ({
      showPlayerHUD: !state.showPlayerHUD,
      isStoryPanelOpen: false,
      isSkillTreeShown: false,
      isQuestOpen: false,
      isShowingDashboard: state.showPlayerHUD, // show dashboard when player HUD panel is open,
    })),
}));


export default useHomepageStore