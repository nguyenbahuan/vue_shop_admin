import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const useMainStore = defineStore("main", () => {
  const state = {
    userName: ref("John Doe"),
    userEmail: ref("doe.doe.doe@example.com"),
    isFieldFocusRegistered: ref(false),
    clients: ref([]),
    history: ref([]),
  };

  const getters = {
    userAvatar: computed(
      () =>
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${state.userEmail.value.replace(
          /[^a-z0-9]+/gi,
          "-"
        )}`
    ),
  };

  const actions = {
    setUser(payload) {
      if (payload.name) {
        state.userName.value = payload.name;
      }
      if (payload.email) {
        state.userEmail.value = payload.email;
      }
    },
    async fetchSampleClients() {
      try {
        const result = await axios.get(`data-sources/clients.json?v=3`);
        state.clients.value = result?.data?.data;
      } catch (error) {
        alert(error.message);
      }
    },
    async fetchSampleHistory() {
      try {
        const result = await axios.get(`data-sources/history.json`);
        state.history.value = result?.data?.data;
      } catch (error) {
        alert(error.message);
      }
    },
  };

  return {
    ...state,
    ...getters,
    ...actions,
  };
});
