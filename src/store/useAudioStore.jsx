import { create } from "zustand";
import { Howl } from "howler";
import clickSoundFile from "../assets/music/click-for-game-menu.mp3";
import bgMusicFile from "../assets/music/DARK-ARIA-LV2.mp3";
import arise from "../assets/music/arise_solo_leveling.mp3";

const useAudioStore = create((set, get) => ({
  isMuted: false,
  isMusicStarted: false,
  bgMusic: new Howl({
    src: [bgMusicFile],
    volume: 0.5,
    loop: true,
    autoplay: false,
  }),
  clickSound: new Howl({
    src: [clickSoundFile],
    volume: 1,
  }),
  ariseSound: new Howl({
    src: [arise],
    loop: false,
    volume: 0.5,
    duration: 5000,
  }),

  startMusic: ()=> {
    const { isMusicStarted, bgMusic } = get();

    if (!isMusicStarted) {
      bgMusic.play();
      set({ isMusicStarted: true });
    }
  },

  toggleSound: () => {
    const { isMuted, bgMusic } = get();

    if (isMuted) {
      bgMusic.play();
    } else {
      bgMusic.pause();
    }
    set({ isMuted: !isMuted });
  }
   
}));

export default useAudioStore;
