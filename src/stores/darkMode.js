import { defineStore } from "pinia";
import { ref } from "vue";

export const useDarkModeStore = defineStore("darkMode", () => {
  const state = {
    isEnabled: ref(false),
  };

  function set(payload = null) {
    state.isEnabled.value = payload !== null ? payload : !state.isEnabled.value;

    if (typeof document !== "undefined") {
      document.body.classList[state.isEnabled.value ? "add" : "remove"](
        "dark-scrollbars"
      );

      document.documentElement.classList[
        state.isEnabled.value ? "add" : "remove"
      ]("dark", "dark-scrollbars-compat");
    }

    // You can persist dark mode setting
    // if (typeof localStorage !== "undefined") {
    //   localStorage.setItem("darkMode", this.darkMode ? "1" : "0")
    // }
  }

  return {
    ...state,
    set,
  };
});
