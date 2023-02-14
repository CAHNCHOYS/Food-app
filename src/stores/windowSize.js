import { defineStore } from "pinia";


export const useWindowSizeStore = defineStore("windowSize", {
  state() {
    return {
      size: 0,
    };
  },
  getters: {
    getSize: (state) => state.size,
  },
  actions: {
    updateWindowSize(newSize) {
      this.size = newSize;
    },
  },
});
